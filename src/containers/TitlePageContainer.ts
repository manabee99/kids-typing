import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SoundResources } from '../SoundResources';
import { TitlePageForm } from '../components/pages/title-page/TitlePageForm';
import { TitleActions } from '../store/actions/TitleAction';
import { SoundActions } from '../store/actions/SoundActions';
import store, { AppState } from '../store/KidsTypingStore';

const mapStateToProps = (appState: AppState) => {
  return {
    // 練習レベル
    practiceLevel: appState.titleState.practiceLevel,

    // ダイアログの開閉状態
    openedDialog: appState.titleState.openedDialog,

    // BGMの状態
    bgmStatus: appState.soundState.bgmStatus,

    // 効果音状態リスト
    soundEffectList: appState.soundState.soundEffectList,

    // ミュート状態
    soundMuting: appState.soundState.soundMuting,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // 練習レベルロード（web strageからのロード）
    loadPracticeLevel: () => dispatch(TitleActions.LOAD_PRACTICE_LEVEL()),

    // 練習レベルリセット（レベル１に戻す）
    resetPracticeLevel: () => resetPracticeLevel(),

    // 練習開始
    startPractice: () => startPractice(),

    // BGM開始
    playingBgm: (bgmUrl: string) => dispatch(SoundActions.PLAYING_BGM({ bgmUrl: bgmUrl })),

    // BGM停止
    stoppedBgm: () => dispatch(SoundActions.STOPPED_BGM()),

    // 効果音鳴動
    playingSoundEffect: (soundUrl: string) => dispatch(SoundActions.PLAYING_SOUND_EFFECT({ soundUrl: soundUrl })),

    // 効果音停止
    stoppedSoundEffect: () => dispatch(SoundActions.STOPPED_SOUND_EFFECT()),

    // ミュート
    soundMute: () => soundMute(),

    // ミュート（ON、OFFを繰り返す）
    toggleSoundMute: () => store.getState().soundState.soundMuting ? soundUnmute() : soundMute(),

    // ダイアログを開く
    openDialog: () => dispatch(TitleActions.OPEN_DIALOG()),

    // ダイアログを閉じる
    closeDialog: () => dispatch(TitleActions.CLOSE_DIALOG()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitlePageForm);

function startPractice() {
  // 練習画面に遷移する
  window.location.replace(process.env.PUBLIC_URL + '/practice/' + (store.getState().soundState.soundMuting ? 'true' : 'false'));
}

/**
 * 練習レベルリセット
 * 練習レベルを１に戻してweb stroageに保存する
 */
function resetPracticeLevel() {
  store.dispatch(TitleActions.RESET_PRACTICE_LEVEL());
  store.dispatch(TitleActions.UPDATE_PRACTICE_LEVEL());
  return true;
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
  store.dispatch(SoundActions.PLAYING_BGM({ bgmUrl: SoundResources.bgmTitle }));
}
