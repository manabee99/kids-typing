import { actionCreatorFactory } from 'typescript-fsa';

// --------------------------------------------
// エンディング画面 Action
// --------------------------------------------
const actionCreator = actionCreatorFactory();
export const EndingActions = {
  // エンディングフェードアウト
  FADE_OUT_ENDING: actionCreator('FADE_OUT_ENDING'),
};
