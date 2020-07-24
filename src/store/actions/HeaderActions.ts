// --------------------------------------------
// 画面ヘッダー Action
// --------------------------------------------
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
export const HeaderActions = {
  // 正解カウンターリセット
  RESET_SUCCESS_COUNTER: actionCreator('RESET_SUCCESS_COUNTER'),

  // 正解カウンター加算
  ADD_SUCCESS_COUNTER: actionCreator('ADD_SUCCESS_COUNTER'),

  // 失敗カウンターリセット
  RESET_MISS_COUNTER: actionCreator('RESET_MISS_COUNTER'),

  // 失敗カウンター加算
  ADD_MISS_COUNTER: actionCreator('ADD_MISS_COUNTER'),

  // 残り時間更新
  UPDATE_REMAINING_TIME: actionCreator<{ remainingTime: number }>('UPDATE_REMAINING_TIME'),
};
