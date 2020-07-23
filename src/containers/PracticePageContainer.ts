import { PracticeStageType, PracticeCharacterType } from './../store/actions/TypingEngineAction';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PracticePageForm } from '../components/pages/practice-page/PracticePageForm';
import { TypingEngineActions } from '../store/actions/TypingEngineAction';
import { TitleActions } from '../store/actions/TitleAction';
import { KeyboardActions } from '../store/actions/KeyboardActions';
import { SoundActions } from '../store/actions/SoundActions';
import { HeaderActions } from '../store/actions/HeaderActions';
import { SoundResources } from '../SoundResources';
import { withRouter } from 'react-router';
import store, { AppState } from '../store/KidsTypingStore';
import { MAX_PRACTICE_LEVEL } from '../store/reducers/TitleReducer';

const mapStateToProps = (appState: AppState) => {
  return {
    // 正解カウンター
    successCounter: appState.headerState.successCounter,

    // 失敗カウンター
    missCounter: appState.headerState.missCounter,

    // 残り時間
    remainingTime: appState.headerState.remainingTime,

    // 練習ステージの種別
    practiceStageType: appState.typingEngineState.practiceStageType,

    // タイプ練習の「文字」状態リスト
    characterStateList: appState.typingEngineState.characterStateList,

    // エフェクト状態リスト
    effectorStateList: appState.typingEngineState.effectorStateList,

    // 有効化キー
    enabledKeys: appState.keyboardState.enabledKeys,

    // 押下中キー
    downedKeys: appState.keyboardState.downedKeys,

    // 現在のBGM
    currentBgmUrl: appState.soundState.currentBgmUrl,

    // BGM再生ステータス
    bgmStatus: appState.soundState.bgmStatus,

    // 効果音リスト
    soundEffectList: appState.soundState.soundEffectList,

    // ミュート
    soundMuting: appState.soundState.soundMuting,

    // 練習レベル
    practiceLevel: appState.titleState.practiceLevel,

    // 練習完了フラグ
    practiceCompleted: appState.titleState.practiceCompleted,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // 正解カウンターリセット
    resetSuccessCounter: () => dispatch(HeaderActions.RESET_SUCCESS_COUNTER()),

    // 正解カウンター加算
    addSuccessCounter: () => dispatch(HeaderActions.ADD_SUCCESS_COUNTER()),

    // 失敗カウンターリセット
    resetMissCounter: () => dispatch(HeaderActions.RESET_MISS_COUNTER()),

    // 失敗カウンター加算
    addMissCounter: () => dispatch(HeaderActions.ADD_MISS_COUNTER()),

    // キーボードリセット
    resetKeyboard: () => dispatch(KeyboardActions.RESET_KEYBOARD()),

    // キーダウン
    keyDown: (key: string) => dispatch(KeyboardActions.KEY_DOWN({ key: key })),

    // キーアップ
    keyUp: (key: string) => dispatch(KeyboardActions.KEY_UP({ key: key })),

    // ステージ設定
    selectStage: (practiceStageType: PracticeStageType) => dispatch(TypingEngineActions.SELECTED_PRACTICE_STAGE({ stageType: practiceStageType })),

    // ステージ初期化
    initilizeStage: () => initializeStage(),

    // 練習開始アニメーション終了時の処理
    startAnimationEnd: () => startPractice(),

    // 練習終了アニメーション終了時の処理
    endAnimationEnd: () => endPractice(),

    // BGM開始
    playingBgm: (bgmUrl: string) => dispatch(SoundActions.PLAYING_BGM({ bgmUrl: bgmUrl })),

    // BGM停止
    stoppedBgm: () => dispatch(SoundActions.STOPPED_BGM()),

    // 効果音鳴動
    playingSoundEffect: (soundUrl: string) => dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: soundUrl })),

    // 効果音停止
    stoppedSoundEffect: () => dispatch(SoundActions.STOPPED_SOUND_EFFECT()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PracticePageForm));

/**
 * ステージ初期化
 */
function initializeStage(): void {
  // 現在のレベルをもとにステージ定義を取得する
  const stageConfig = getStageConfig(store.getState().titleState.practiceLevel);

  // ステージ種別を選択する
  store.dispatch(TypingEngineActions.SELECTED_PRACTICE_STAGE({stageType: stageConfig.stageType }));

  // ステージで利用する文字種別を選択する
  store.dispatch(TypingEngineActions.SELECTED_CHARACTER_TYPE({characterTypes: stageConfig.useCharacterTypes }));

  // ステージ毎のBGMを設定する
  store.dispatch(SoundActions.CHANGED_BGM({ bgmUrl: stageConfig.backgroundMusic }));

  // キーボードに有効キーを設定する
  store.dispatch(KeyboardActions.ENABLED_KEYS({ keys: Array.from(stageConfig.enabledKeys) }));

  // キーダウンイベントハンドラーを登録
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    store.dispatch(KeyboardActions.KEY_DOWN({ key: e.key.toLocaleUpperCase() }));
  });

  // キーアップイベントハンドラーを登録
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    // 「文字」が画面に表示されていないときはミスカウンターを加算する
    if (store.getState().typingEngineState.characterStateList.length === 0) {
      store.dispatch(HeaderActions.ADD_MISS_COUNTER());
      store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seMiss }));
      return;
    }

    // 先頭の文字と押下されたキーが一致するか判定
    if (store.getState().typingEngineState.characterStateList[0].character === e.key.toLocaleUpperCase()) {
      // 一致した場合は正解カウンターを加算して成功効果音を鳴動する
      store.dispatch(TypingEngineActions.INPUT_CHARACTER({ character: e.key.toLocaleUpperCase() }));
      store.dispatch(HeaderActions.ADD_SUCCESS_COUNTER());
      store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seSuccess }));
    } else {
      // 一致しない場合は失敗カウンターを加算して失敗効果音を鳴動する
      store.dispatch(TypingEngineActions.INPUT_CHARACTER({ character: e.key.toLocaleUpperCase() }));
      store.dispatch(HeaderActions.ADD_MISS_COUNTER());
      store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seMiss }));
    }

    // 100ミリ秒後にキーボードのキーアップアクションをディスパッチする（キーを一定時間押下してからアップさせるための処理）
    setTimeout(() => store.dispatch(KeyboardActions.KEY_UP({ key: e.key.toLocaleUpperCase() })), 100);
  });
}

/**
 * 練習開始
 */
var intervalHandle: any = null;
function startPractice(): void {
  // 現在のレベルをもとにステージ定義を取得する
  const stageConfig = getStageConfig(store.getState().titleState.practiceLevel);

  // 現在のレベルの有効キーをもとに練習中に排出する「文字」の配列を作成する
  const practiceCharacters = createPracticeCaracters(60, stageConfig.enabledKeys, stageConfig.importantKeys);

  // 練習時間に60秒を設定して練習を開始する
  store.dispatch(TypingEngineActions.START_PRACTICE({ startTime: 60 }));

  // 練習メインループを開始する（FPS60）
  const fps = 60;
  intervalHandle = setInterval(main, 1000 / fps, fps, stageConfig.fireInterval, practiceCharacters);
}

/**
 * 練習終了
 */
function endPractice(): void {

  // レベル更新前のレベルを取得
  const previousLevel = store.getState().titleState.practiceLevel;

  // レベルアップ判定
  if (!store.getState().titleState.practiceCompleted) {
    if (store.getState().headerState.missCounter <= 3) {
      // レベルアップ
      store.dispatch(TitleActions.PRACTICE_LEVEL_UP());

      // レベルアップ効果音鳴動
      store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seVoiceGoodJob }));
    } else {
      // レベル保留残念効果音鳴動
      store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seVoicePity }));
    }
  }

  // 練習レベルをweb storageに保存する
  store.dispatch(TitleActions.UPDATE_PRACTICE_LEVEL());

  // 練習メインループ用のインターバルをクリア
  clearInterval(intervalHandle);

  // レベル２１になった場合はエンディングページに遷移する
  if (store.getState().titleState.practiceCompleted && previousLevel === (MAX_PRACTICE_LEVEL - 1)) {
    window.location.replace('/kids-typing/ending/' + (store.getState().soundState.soundMuting ? 'true' : 'false'));
    return;
  }

  // タイトル画面に遷移する
  window.location.replace('/kids-typing/title/' + (store.getState().soundState.soundMuting ? 'true' : 'false'));
}

/**
 * 練習画面のメインループ
 * 定期的に「文字」を発射して「文字」を移動させるために時間経過アクションをディスパッチする。
 * cntとfireCharaIndexを何とかしたい・・・
 */
var cnt = 0;
var fireCharaIndex = 0;
function main(fps: number, fireInterval: number, practiceCharacter: string[]) {
  // 残り時間が０になったときは何もしない
  if (store.getState().headerState.remainingTime <= 0) {
    return;
  }

  // 残り時間を算出する
  const remainingTime =
    store.getState().typingEngineState.practiceTime -
    Math.round((new Date().getTime() - store.getState().typingEngineState.practiceStartTime) / 1000);

  // ヘッダの残り時間を更新する
  store.dispatch(HeaderActions.UPDATE_REMAINING_TIME({ remainingTime: remainingTime }));

  // 時間を進める
  store.dispatch(TypingEngineActions.TICK());

  // 入力が間に合わなかった「文字」に対して入力失敗を発生させる
  if (store.getState().typingEngineState.characterStateList.length > 0 && store.getState().typingEngineState.characterStateList[0].left <= -100) {
    console.log(store.getState().typingEngineState.characterStateList[0].left);
    store.dispatch(TypingEngineActions.INPUT_CHARACTER({ character: '' }));
    store.dispatch(HeaderActions.ADD_MISS_COUNTER());
    store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seMiss }));
  }

  // 「文字」出力間隔に達した場合は「文字」を出力する
  if (cnt * (1000 / fps) > fireInterval) {
    store.dispatch(
      TypingEngineActions.FIRE_CHARACTER({
        // 練習終了アニメーションなどにより練習が長くなる可能性があるので最後の文字を表示した後は最初に戻るようにする
        character: practiceCharacter[fireCharaIndex % practiceCharacter.length],
      })
    );
    cnt = 0;
    fireCharaIndex++;
  }
  cnt++;
}

/**
 * 発射する「文字」の配列を作成する。
 * @param characterCount 作り出す配列の総数
 * @param sourceCharacter 配列に組み込む「文字」
 * @param importantCharacter 重点文字
 */
function createPracticeCaracters(characterCount: number, sourceCharacter: string, importantCharacter: string): string[] {
  // 総数に合わせて元「文字」を増やす（重点文字は出現回数を多くする）
  var characters = '';
  for (var i = 0; i < characterCount / sourceCharacter.length; i++) {
    characters = characters + sourceCharacter + importantCharacter;
  }

  // 総数を超えた部分を削除する
  const charactersArray = Array.from(characters.substr(0, characterCount));

  // 文字配列をシャッフルする
  for (var i = 0; i < 100; i++) {
    const idx1 = Math.round(Math.random() * (characterCount - 1));
    const idx2 = Math.round(Math.random() * (characterCount - 1));
    const chara1 = charactersArray[idx1];
    const chara2 = charactersArray[idx2];
    charactersArray[idx1] = chara2;
    charactersArray[idx2] = chara1;
  }

  return charactersArray;
}

// ステージ設定
export interface StageConfig {
  // ステージ種別
  stageType: PracticeStageType;

  // 利用する文字種別
  useCharacterTypes: PracticeCharacterType[];

  // BGM
  backgroundMusic: string;

  // 有効なキー
  enabledKeys: string;

  // 重点キー
  importantKeys: string;

  // 入力する「文字」の発射間隔
  fireInterval: number;
}

/**
 * ステージ設定を取得する
 * @param practiceLevel 練習レベル
 */
function getStageConfig(practiceLevel: number): StageConfig {
  const stateConfig: StageConfig[] = [
    // LEVEL 1
    {
      stageType: 'sakura',
      useCharacterTypes: ['bird', 'sakura'],
      backgroundMusic: SoundResources.bgmStageSakura,
      enabledKeys: 'DFJK',
      importantKeys: '',
      fireInterval: 2000,
    },
    // LEVEL 2
    {
      stageType: 'sakura',
      useCharacterTypes: ['bird', 'sakura'],
      backgroundMusic: SoundResources.bgmStageSakura,
      enabledKeys: 'SDFJKL',
      importantKeys: 'SL',
      fireInterval: 2000,
    },
    // LEVEL 3
    {
      stageType: 'sakura',
      useCharacterTypes: ['bird', 'sakura'],
      backgroundMusic: SoundResources.bgmStageSakura,
      enabledKeys: 'ASDFGHJKL',
      importantKeys: 'GH',
      fireInterval: 2000,
    },
    // LEVEL 4
    {
      stageType: 'sakura',
      useCharacterTypes: ['bird', 'sakura'],
      backgroundMusic: SoundResources.bgmStageSakura,
      enabledKeys: 'RUASDFGHJKL',
      importantKeys: 'RU',
      fireInterval: 2000,
    },
    // LEVEL 5
    {
      stageType: 'goldfish',
      useCharacterTypes: ['goldfish', 'blackfish', 'catfish'],
      backgroundMusic: SoundResources.bgmStageGoldfish,
      enabledKeys: 'ERUIASDFGHJKL',
      importantKeys: 'EI',
      fireInterval: 2000,
    },
    // LEVEL 6
    {
      stageType: 'goldfish',
      useCharacterTypes: ['goldfish', 'blackfish', 'catfish'],
      backgroundMusic: SoundResources.bgmStageGoldfish,
      enabledKeys: 'WERUIOASDFGHJKL',
      importantKeys: 'WO',
      fireInterval: 2000,
    },
    // LEVEL 7
    {
      stageType: 'goldfish',
      useCharacterTypes: ['goldfish', 'blackfish', 'catfish'],
      backgroundMusic: SoundResources.bgmStageGoldfish,
      enabledKeys: 'QWERUIOPASDFGHJKL',
      importantKeys: 'QP',
      fireInterval: 2000,
    },
    // LEVEL 8
    {
      stageType: 'goldfish',
      useCharacterTypes: ['goldfish', 'blackfish', 'catfish'],
      backgroundMusic: SoundResources.bgmStageGoldfish,
      enabledKeys: 'QWERTYUIOPASDFGHJKL',
      importantKeys: 'TY',
      fireInterval: 2000,
    },
    // LEVEL 9
    {
      stageType: 'sunflower',
      useCharacterTypes: ['dragonfly', 'ladybird'],
      backgroundMusic: SoundResources.bgmStageSunflower,
      enabledKeys: 'QWERTYUIOPASDFGHJKLVN',
      importantKeys: 'VN',
      fireInterval: 2000,
    },
    // LEVEL 10
    {
      stageType: 'sunflower',
      useCharacterTypes: ['dragonfly', 'ladybird'],
      backgroundMusic: SoundResources.bgmStageSunflower,
      enabledKeys: 'QWERTYUIOPASDFGHJKLCVNM',
      importantKeys: 'CM',
      fireInterval: 2000,
    },
    // LEVEL 11
    {
      stageType: 'sunflower',
      useCharacterTypes: ['dragonfly', 'ladybird'],
      backgroundMusic: SoundResources.bgmStageSunflower,
      enabledKeys: 'QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: 'ZXB',
      fireInterval: 2000,
    },
    // LEVEL 12
    {
      stageType: 'sunflower',
      useCharacterTypes: ['dragonfly', 'ladybird'],
      backgroundMusic: SoundResources.bgmStageSunflower,
      enabledKeys: '57QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '57',
      fireInterval: 2000,
    },
    // LEVEL 13
    {
      stageType: 'seabed',
      useCharacterTypes: ['turtle', 'octopus', 'blowfish', 'shark'],
      backgroundMusic: SoundResources.bgmStageSeabed,
      enabledKeys: '4578QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '48',
      fireInterval: 2000,
    },
    // LEVEL 14
    {
      stageType: 'seabed',
      useCharacterTypes: ['turtle', 'octopus', 'blowfish', 'shark'],
      backgroundMusic: SoundResources.bgmStageSeabed,
      enabledKeys: '345789QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '39',
      fireInterval: 2000,
    },
    // LEVEL 15
    {
      stageType: 'seabed',
      useCharacterTypes: ['turtle', 'octopus', 'blowfish', 'shark'],
      backgroundMusic: SoundResources.bgmStageSeabed,
      enabledKeys: '23457890QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '20',
      fireInterval: 2000,
    },
    // LEVEL 16
    {
      stageType: 'seabed',
      useCharacterTypes: ['turtle', 'octopus', 'blowfish', 'shark'],
      backgroundMusic: SoundResources.bgmStageSeabed,
      enabledKeys: '1234567890QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '16',
      fireInterval: 2000,
    },
    // LEVEL 17
    {
      stageType: 'halloween',
      useCharacterTypes: ['bat', 'blackcat', 'ghost', 'pumpkin', 'witch'],
      backgroundMusic: SoundResources.bgmStageHalloween,
      enabledKeys: '1234567890QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '',
      fireInterval: 1800,
    },
    // LEVEL 18
    {
      stageType: 'halloween',
      useCharacterTypes: ['bat', 'blackcat', 'ghost', 'pumpkin', 'witch'],
      backgroundMusic: SoundResources.bgmStageHalloween,
      enabledKeys: '1234567890QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '',
      fireInterval: 1600,
    },
    // LEVEL 19
    {
      stageType: 'halloween',
      useCharacterTypes: ['bat', 'blackcat', 'ghost', 'pumpkin', 'witch'],
      backgroundMusic: SoundResources.bgmStageHalloween,
      enabledKeys: '1234567890QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '',
      fireInterval: 1400,
    },
    // LEVEL 20
    {
      stageType: 'halloween',
      useCharacterTypes: ['bat', 'blackcat', 'ghost', 'pumpkin', 'witch'],
      backgroundMusic: SoundResources.bgmStageHalloween,
      enabledKeys: '1234567890QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '',
      fireInterval: 1200,
    },
    // LEVEL 21（全）レベルクリアの後
    {
      stageType: 'halloween',
      useCharacterTypes: ['bat', 'blackcat', 'ghost', 'pumpkin', 'witch'],
      backgroundMusic: SoundResources.bgmStageHalloween,
      enabledKeys: '1234567890QWERTYUIOPASDFGHJKLZXCVBNM',
      importantKeys: '',
      fireInterval: 1000,
    },
  ];
  return stateConfig[practiceLevel - 1];
}
