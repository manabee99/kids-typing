// --------------------------------------------
// キータイプエンジン Action
// --------------------------------------------
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
export const TypingEngineActions = {
  // エンジンリセット
  RESET_ENGINE: actionCreator('RESET_ENGINE'),

  // カウントダウン
  COUNT_DOWN: actionCreator('COUNT_DOWN'),

  // 練習開始
  START_PRACTICE: actionCreator<{ startTime: number }>('START_PRACTICE'),

  // 練習終了
  END_PRACTICE: actionCreator('END_PRACTICE'),

  // 文字発射
  FIRE_CHARACTER: actionCreator<{ character: string }>('FIRE_CHARACTER'),

  // キー入力
  INPUT_CHARACTER: actionCreator<{ character: string }>('INPUT_CHARACTER'),

  // 時間経過
  TICK: actionCreator('TICK'),

  // 時間経過（入力失敗の判定)
  TICK_NOT_ENTERED: actionCreator('TICK_NOT_ENTERED'),
};
