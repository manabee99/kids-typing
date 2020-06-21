import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { KeyboardActions } from '../actions/KeyboardActions';

// --------------------------------------------
// キーボード の状態
// --------------------------------------------
export interface KeyboardState {
  // 有効化キー
  enabledKeys: string[];

  // 押下中キー
  downedKeys: string[];
}

// --------------------------------------------
// 初期状態
// --------------------------------------------
export const keyboardInitialState: KeyboardState = {
  enabledKeys: [],
  downedKeys: [],
};

// --------------------------------------------
// キーボード Reducer
// --------------------------------------------
export const keyboardReducer = reducerWithInitialState(keyboardInitialState)
  // キー有効化
  .case(KeyboardActions.ENABLED_KEYS, (state, payload) => {
    return {
      ...state,
      enabledKeys: payload.keys,
    };
  })
  // キーダウン
  .case(KeyboardActions.KEY_DOWN, (state, payload) => {
    return {
      ...state,
      downedKeys: Array.from(state.downedKeys).concat(payload.key),
    };
  })
  // キーアップ
  .case(KeyboardActions.KEY_UP, (state, payload) => {
    return {
      ...state,
      downedKeys: Array.from(state.downedKeys).filter((key) => key !== payload.key),
    };
  });
