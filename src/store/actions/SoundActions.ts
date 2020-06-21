// --------------------------------------------
// サウンド Action
// --------------------------------------------
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
export const SoundActions = {
  // BGM再生
  PLAYING_BGM: actionCreator<{ bgmUrl: string }>('PLAY_BGM'),

  // BGM停止
  STOPPED_BGM: actionCreator('STOPPED_BGM'),

  // 効果音再生
  PLAYING_SOUND_EFFECT: actionCreator<{ soundUrl: string }>('PLAYING_SOUND_EFFECT'),

  // 効果音停止
  STOPPED_SOUND_EFFECT: actionCreator('STOPPED_SOUND_EFFECT'),

  // ミュート
  MUTE: actionCreator('MUTE'),

  // ミュート解除
  UNMUTE: actionCreator('UNMUTE'),
};
