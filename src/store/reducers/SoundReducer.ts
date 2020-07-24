import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { SoundActions } from '../actions/SoundActions';

// --------------------------------------------
// サウンドの状態
// --------------------------------------------
export interface SoundState {
  // 現在のBGM
  currentBgmUrl: string;

  // BGM再生ステータス
  bgmStatus: SoundStatus;

  // 効果音リスト
  soundEffectList: SoundStatus[];

  // サウンドエフェクトIDシーケンス
  soundEffectIdSequence: number;

  // ミュート（true: ミュート中、false: ミュート解除中）
  soundMuting: boolean;
}

// --------------------------------------------
// 効果音の状態
// --------------------------------------------
export interface SoundStatus {
  // サウンドエフェクトID
  soundEffectId: string;

  // 再生状態
  soundStatus: 'PLAYING' | 'STOPPED' | 'PAUSED';

  // 再生サウンドURL
  url: string;

  // 再生開始時間
  playStartTime: number;
}

// --------------------------------------------
// 初期状態
// --------------------------------------------
export const soundInitialState: SoundState = {
  currentBgmUrl: '',
  bgmStatus: {
    soundEffectId: '',
    soundStatus: 'STOPPED',
    url: '',
    playStartTime: 0,
  },
  soundEffectList: [],
  soundEffectIdSequence: 0,
  soundMuting: true,
};

// --------------------------------------------
// サウンド Reducer
// --------------------------------------------
export const soundReducer = reducerWithInitialState(soundInitialState)
  // BGN変更
  .case(SoundActions.CHANGED_BGM, (state, payload) => {
    return {
      ...state,
      currentBgmUrl: payload.bgmUrl,
    };
  })

  // BGN再生
  .case(SoundActions.PLAYING_BGM, (state, payload) => {
    return {
      ...state,
      bgmStatus: {
        soundEffectId: 'bgm',
        soundStatus: 'PLAYING',
        url: payload.bgmUrl,
        playStartTime: new Date().getTime(),
      },
    };
  })

  // BGN停止
  .case(SoundActions.STOPPED_BGM, (state) => {
    return {
      ...state,
      bgmStatus: {
        ...state.bgmStatus,
        soundStatus: 'STOPPED',
      },
    };
  })

  // 効果音再生
  .case(SoundActions.PLAYING_SOUND_EFFECT, (state, payload) => {
    return {
      ...state,
      soundEffectList: Array.from(state.soundEffectList).concat({
        soundEffectId: (state.soundEffectIdSequence + 1).toString(),
        soundStatus: 'PLAYING',
        url: payload.soundUrl,
        playStartTime: new Date().getTime(),
      }),
      soundEffectIdSequence: state.soundEffectIdSequence + 1,
    };
  })

  // 効果音停止
  .case(SoundActions.STOPPED_SOUND_EFFECT, (state, payload) => {
    return {
      ...state,
      soundEffectList: [],
    };
  })

  // ミュート
  .case(SoundActions.MUTE, (state) => {
    return {
      ...state,
      soundMuting: true,
    };
  })

  // ミュート解除
  .case(SoundActions.UNMUTE, (state) => {
    return {
      ...state,
      soundMuting: false,
    };
  });
