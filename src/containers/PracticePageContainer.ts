import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PracticePageForm } from '../components/pages/practice-page/PracticePageForm';
import { TypingEngineActions } from '../store/actions/TypingEngineAction';
import { TitleActions } from '../store/actions/TitleAction';
import store, { AppState } from '../KidsTypingStore';
import { KeyboardActions } from '../store/actions/KeyboardActions';
import { SoundActions } from '../store/actions/SoundActions';
import { HeaderActions } from '../store/actions/HeaderActions';
import { SoundResources } from '../SoundResources';
import { withRouter } from 'react-router';

const mapStateToProps = (appState: AppState) => {
  return {
    // 正解カウンター
    successCounter: appState.headerState.successCounter,

    // 失敗カウンター
    missCounter: appState.headerState.missCounter,

    // 残り時間
    remainingTime: appState.headerState.remainingTime,

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
  const practiceCharacters = createPracticeCaracters(60, stageConfig.enabledKeys);

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
  // レベルアップ判定
  if (store.getState().headerState.missCounter <= 3) {
    // レベルアップ
    store.dispatch(TitleActions.PRACTICE_LEVEL_UP());

    // レベルアップ効果音鳴動
    store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seVoiceGoodJob }));
  } else {
    // レベル保留残念効果音鳴動
    store.dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: SoundResources.seVoicePity }));
  }

  // 練習レベルをweb storageに保存する
  store.dispatch(TitleActions.UPDATE_PRACTICE_LEVEL());

  // キータイプエンジンの練習終了
  store.dispatch(TypingEngineActions.END_PRACTICE());

  // 練習メインループ用のインターバルをクリア
  clearInterval(intervalHandle);

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
  store.dispatch(TypingEngineActions.TICK_NOT_ENTERED());
  store.dispatch(TypingEngineActions.TICK());

  // 「文字」出力間隔に達した場合は「文字」を出力する
  if (cnt * (1000 / fps) > fireInterval) {
    store.dispatch(
      TypingEngineActions.FIRE_CHARACTER({
        character: practiceCharacter[fireCharaIndex],
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
 */
function createPracticeCaracters(characterCount: number, sourceCharacter: string): string[] {
  // 総数に合わせて元「文字」を増やす
  var characters = '';
  for (var i = 0; i < characterCount / sourceCharacter.length; i++) {
    characters = characters + sourceCharacter;
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
  stageType: string;

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
    {
      stageType: 'sakura',
      backgroundMusic: SoundResources.bgmStagesakura,
      enabledKeys: 'DFJK',
      importantKeys: '',
      fireInterval: 1000,
    },
    {
      stageType: 'sakura',
      backgroundMusic: SoundResources.bgmStagesakura,
      enabledKeys: 'SDFJKL',
      importantKeys: 'SL',
      fireInterval: 2000,
    },
    {
      stageType: 'sakura',
      backgroundMusic: SoundResources.bgmStagesakura,
      enabledKeys: 'ASDFGHJKL',
      importantKeys: 'GH',
      fireInterval: 2000,
    },
    {
      stageType: 'sakura',
      backgroundMusic: SoundResources.bgmStagesakura,
      enabledKeys: 'RUASDFGHJKL',
      importantKeys: 'RU',
      fireInterval: 2000,
    },
    {
      stageType: 'himawari',
      backgroundMusic: '',
      enabledKeys: 'ERUIASDFGHJKL',
      importantKeys: 'EI',
      fireInterval: 1000,
    },
    {
      stageType: 'himawari',
      backgroundMusic: '',
      enabledKeys: 'WERUIOASDFGHJKL',
      importantKeys: 'WO',
      fireInterval: 1000,
    },
    {
      stageType: 'himawari',
      backgroundMusic: '',
      enabledKeys: 'QWERUIOPASDFGHJKL',
      importantKeys: 'QP',
      fireInterval: 1000,
    },
    {
      stageType: 'himawari',
      backgroundMusic: '',
      enabledKeys: 'QWERTYUIOPASDFGHJKL',
      importantKeys: 'TY',
      fireInterval: 1000,
    },
    {
      stageType: 'kingyo',
      backgroundMusic: '',
      enabledKeys: 'QWERTYUIOPASDFGHJKLVN',
      importantKeys: 'VN',
      fireInterval: 1000,
    },
    {
      stageType: 'kingyo',
      backgroundMusic: '',
      enabledKeys: 'QWERTYUIOPASDFGHJKLCVNM',
      importantKeys: 'CM',
      fireInterval: 1000,
    },
    {
      stageType: 'kingyo',
      backgroundMusic: '',
      enabledKeys: 'QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: 'ZX',
      fireInterval: 1000,
    },
    {
      stageType: 'kingyo',
      backgroundMusic: '',
      enabledKeys: '57QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: '57',
      fireInterval: 1000,
    },
    {
      stageType: 'hanabi',
      backgroundMusic: '',
      enabledKeys: '4578QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: '48',
      fireInterval: 1000,
    },
    {
      stageType: 'hanabi',
      backgroundMusic: '',
      enabledKeys: '345789QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: '39',
      fireInterval: 1000,
    },
    {
      stageType: 'hanabi',
      backgroundMusic: '',
      enabledKeys: '23457890QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: '20',
      fireInterval: 1000,
    },
    {
      stageType: 'hanabi',
      backgroundMusic: '',
      enabledKeys: '123457890QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: '1',
      fireInterval: 1000,
    },
    {
      stageType: 'halloween',
      backgroundMusic: '',
      enabledKeys: '123457890QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: '1',
      fireInterval: 1000,
    },
    {
      stageType: 'halloween',
      backgroundMusic: '',
      enabledKeys: '123457890QWERTYUIOPASDFGHJKLZXCVNM',
      importantKeys: '1',
      fireInterval: 1000,
    },
  ];
  return stateConfig[practiceLevel - 1];
}
