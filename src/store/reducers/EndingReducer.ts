import { EndingActions } from './../actions/EndingAction';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

// --------------------------------------------
// エンディング画面の状態
// --------------------------------------------
export interface EndingState {
  // フェードアウトフラグ
  fadeOut: boolean;
}

// --------------------------------------------
// 初期状態
// --------------------------------------------
export const endingInitialState: EndingState = {
  fadeOut: false,
};

// --------------------------------------------
// エンディング画面Reducer
// --------------------------------------------
export const endingReducer = reducerWithInitialState(endingInitialState)
  // フェードアウト
  .case(EndingActions.FADE_OUT_ENDING, (state) => {
    return {
      ...state,
      fadeOut: true,
    };
  });
