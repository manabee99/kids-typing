import { actionCreatorFactory } from 'typescript-fsa';

// --------------------------------------------
// タイトル画面 Action
// --------------------------------------------
const actionCreator = actionCreatorFactory();
export const TitleActions = {
  // 練習レベルロード
  LOAD_PRACTICE_LEVEL: actionCreator('LOAD_PRACTICE_LEVEL'),

  // 練習レベル更新
  UPDATE_PRACTICE_LEVEL: actionCreator('UPDATE_PRACTICE_LEVEL'),

  // 練習レベル選択
  SELECT_PRACTICE_LEVEL: actionCreator<{ level: number }>('SELECT_PRACTICE_LEVEL'),

  // 練習レベルアップ（レベルを１加算する）
  PRACTICE_LEVEL_UP: actionCreator('PRACTICE_LEVEL_UP'),

  // 練習レベルリセット
  RESET_PRACTICE_LEVEL: actionCreator('RESET_PRACTICE_LEVEL'),

  // ダイアログを表示
  OPEN_DIALOG: actionCreator('OPEN_DIALOG'),

  // ダイアログを閉じる
  CLOSE_DIALOG: actionCreator('CLOSE_DIALOG'),
};
