import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SoundActions } from '../store/actions/SoundActions';
import store, { AppState } from '../store/KidsTypingStore';
import { EndingPageForm } from '../components/pages/ending-page/EndingPageForm';
import { SoundState } from '../store/reducers/SoundReducer';
import { SoundResources } from '../SoundResources';
import { TypingEngineActions, PracticeCharacterType } from '../store/actions/TypingEngineAction';
import { EndingActions } from '../store/actions/EndingAction';

const mapStateToProps = (appState: AppState) => {
  return {
    // タイプ練習の「文字」状態リスト
    characterStateList: appState.typingEngineState.characterStateList,

    // エフェクト状態リスト
    effectorStateList: appState.typingEngineState.effectorStateList,

    // BGMの状態
    bgmStatus: appState.soundState.bgmStatus,

    // 効果音状態リスト
    soundEffectList: appState.soundState.soundEffectList,

    // ミュート状態
    soundMuting: appState.soundState.soundMuting,

    // フェードアウトフラグ
    fadeOut: appState.endingState.fadeOut,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // エンディングアニメーション開始
    startEnding: () => startEnding(),

    // エンディングフェードアウト
    fadeOutEnding: () => dispatch(EndingActions.FADE_OUT_ENDING()),

    // エンディング終了
    endEnding: () => endEnding(),

    // BGM開始
    playingBgm: (bgmUrl: string) => dispatch(SoundActions.PLAYING_BGM({ bgmUrl: bgmUrl })),

    // BGM停止
    stoppedBgm: () => dispatch(SoundActions.STOPPED_BGM()),

    // 効果音鳴動
    playingSoundEffect: (soundUrl: string) => dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: soundUrl })),

    // 効果音停止
    stoppedSoundEffect: () => dispatch(SoundActions.STOPPED_SOUND_EFFECT()),

    // ミュート（ON、OFFを繰り返す）
    soundMute: () => ((store.getState().soundState as SoundState).soundMuting ? soundUnmute() : soundMute()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EndingPageForm);

/**
 * エンディング開始
 */
var intervalHandle: any = null;
function startEnding(): void {
  // エンディングに登場するキャラクター
  const characters: PracticeCharacterType[] = [
    'sakura',
    'goldfish',
    'bird',
    'dragonfly',
    'ladybird',
    'blackfish',
    'catfish',
    'turtle',
    'octopus',
    'blowfish',
    'shark',
    'bat',
    'blackcat',
    'ghost',
    'pumpkin',
    'witch'
  ];

  // ステージで利用する文字種別を選択する
  store.dispatch(TypingEngineActions.SELECTED_CHARACTER_TYPE({ characterTypes: characters }));

  // ステージ毎のBGMを設定する
  store.dispatch(SoundActions.CHANGED_BGM({ bgmUrl: SoundResources.bgmEnding }));

  // エンディングメインループを開始する（FPS60）
  const fps = 60;
  intervalHandle = setInterval(main, 1000 / fps, fps, 2000);
}

/**
 * エンディング終了
 */
function endEnding(): void {

  // エンディングメインループ用のインターバルをクリア
  clearInterval(intervalHandle);

  // タイトル画面に遷移する
  window.location.replace(process.env.PUBLIC_URL + '/title/' + (store.getState().soundState.soundMuting ? 'true' : 'false'));
}

/**
 * エンディング画面のメインループ
 * 定期的に「文字」を発射して「文字」を移動させるために時間経過アクションをディスパッチする。
 * cntとfireCharaIndexを何とかしたい・・・
 */
var cnt = 0;
function main(fps: number, fireInterval: number) {
  // 時間を進める
  store.dispatch(TypingEngineActions.TICK());

  // 「文字」出力間隔に達した場合は「文字」を出力する
  if (cnt * (1000 / fps) > fireInterval) {
    store.dispatch(
      TypingEngineActions.FIRE_CHARACTER({
        character: '',
      })
    );
    cnt = 0;
  }
  cnt++;
}

/**
 * ミュート
 * BGMと全効果音を停止してミュート状態を設定する
 */
function soundMute() {
  store.dispatch(SoundActions.MUTE());
  store.dispatch(SoundActions.STOPPED_BGM());
  store.dispatch(SoundActions.STOPPED_SOUND_EFFECT());
}

/**
 * ミュート解除
 * ミュート状態を解除してタイトル画面用BGMを開始する
 */
function soundUnmute() {
  store.dispatch(SoundActions.UNMUTE());
  store.dispatch(SoundActions.PLAYING_BGM({ bgmUrl: SoundResources.bgmEnding }));
}
