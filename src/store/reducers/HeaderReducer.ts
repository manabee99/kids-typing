import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { HeaderActions } from '../actions/HeaderActions';

// --------------------------------------------
// Practiceヘッダーの状態
// --------------------------------------------
export interface HeaderState {
  // 正解カウンター
  successCounter: number;

  // 失敗カウンター
  missCounter: number;

  // 残り時間
  remainingTime: number;
}

// --------------------------------------------
// 初期状態
// --------------------------------------------
export const headerInitialState: HeaderState = {
  successCounter: 0,
  missCounter: 0,
  remainingTime: 60,
};

// --------------------------------------------
// Practiceヘッダー Reducer
// --------------------------------------------
export const headerReducer = reducerWithInitialState(headerInitialState)
  // 正解カウンターリセット
  .case(HeaderActions.RESET_SUCCESS_COUNTER, (state) => {
    return {
      ...state,
      successCounter: 0,
    };
  })
  // 正解カウンター加算
  .case(HeaderActions.ADD_SUCCESS_COUNTER, (state) => {
    return {
      ...state,
      successCounter: state.successCounter + 1,
    };
  })
  // 失敗カウンターリセット
  .case(HeaderActions.RESET_MISS_COUNTER, (state) => {
    return {
      ...state,
      missCounter: 0,
    };
  })
  // 失敗カウンター加算
  .case(HeaderActions.ADD_MISS_COUNTER, (state) => {
    return {
      ...state,
      missCounter: state.missCounter + 1,
    };
  })
  // 残り時間更新
  .case(HeaderActions.UPDATE_REMAINING_TIME, (state, payload) => {
    return {
      ...state,
      remainingTime: payload.remainingTime,
    };
  });
