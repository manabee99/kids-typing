// --------------------------------------------
// キータイプエンジン Action
// --------------------------------------------
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
export const TypingEngineActions = {
  // エンジンリセット
  RESET_ENGINE: actionCreator('RESET_ENGINE'),

  // 練習開始
  START_PRACTICE: actionCreator<{ startTime: number }>('START_PRACTICE'),

  // 文字発射
  FIRE_CHARACTER: actionCreator<{ character: string }>('FIRE_CHARACTER'),

  // キー入力
  INPUT_CHARACTER: actionCreator<{ character: string }>('INPUT_CHARACTER'),

  // 時間経過
  TICK: actionCreator('TICK'),
};
