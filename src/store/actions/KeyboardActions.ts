import { actionCreatorFactory } from 'typescript-fsa';

// --------------------------------------------
// キーボード Action
// --------------------------------------------
const actionCreator = actionCreatorFactory();
export const KeyboardActions = {
  // リセットキーボード
  RESET_KEYBOARD: actionCreator('RESET_KEYBOARD'),

  // キー有効化
  ENABLED_KEYS: actionCreator<{ keys: string[] }>('ENABLED_KEYS'),

  // キーダウン
  KEY_DOWN: actionCreator<{ key: string }>('KEY_DOWN'),

  // キーアップ
  KEY_UP: actionCreator<{ key: string }>('KEY_UP'),
};
