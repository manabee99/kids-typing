import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TitleActions } from '../actions/TitleAction';

// --------------------------------------------
// タイトル画面の状態
// --------------------------------------------
export interface TitleState {
  // 練習レベル
  practiceLevel: number;

  // 練習完了フラグ（true: 完了、false: まだ完了していない）
  practiceCompleted: boolean;

  // ダイアログの表示有無（true: 表示中、false: 非表示）
  openedDialog: boolean;
}

// --------------------------------------------
// 初期状態
// --------------------------------------------
export const titleInitialState: TitleState = {
  practiceLevel: 1,
  practiceCompleted: false,
  openedDialog: false,
};

// --------------------------------------------
// 最大練習レベル
// --------------------------------------------
export const MAX_PRACTICE_LEVEL = 20;

// --------------------------------------------
// タイトル画面Reducer
// --------------------------------------------
export const titleReducer = reducerWithInitialState(titleInitialState)
  // 練習レベルロード（ローカルストレージからのロード）
  .case(TitleActions.LOAD_PRACTICE_LEVEL, (state) => {
    const practiceLevelStr = window.localStorage.getItem('__kids-typing__practice-level');
    var practiceLevel = 1;
    if (null !== practiceLevelStr) {
      practiceLevel = Number(practiceLevelStr);
    } else {
      window.localStorage.setItem('__kids-typing__practice-level', practiceLevel.toString());
    }

    return {
      ...state,
      practiceLevel: practiceLevel,
      practiceCompleted: practiceLevel === MAX_PRACTICE_LEVEL
    };
  })

  // 練習レベル更新（ローカルストレージの更新）
  .case(TitleActions.UPDATE_PRACTICE_LEVEL, (state) => {
    window.localStorage.setItem('__kids-typing__practice-level', state.practiceLevel.toString());
    return {
      ...state,
    };
  })

  // 練習レベルアップ
  .case(TitleActions.PRACTICE_LEVEL_UP, (state) => {
    return {
      ...state,
      practiceLevel: state.practiceLevel + (state.practiceLevel < MAX_PRACTICE_LEVEL ? 1 : 0),
      practiceCompleted: state.practiceLevel === (MAX_PRACTICE_LEVEL - 1)
    };
  })

  // 練習レベルリセット
  .case(TitleActions.RESET_PRACTICE_LEVEL, (state) => {
    return {
      ...state,
      practiceLevel: 1,
      practiceCompleted: false
    };
  })

  // ダイアログ表示
  .case(TitleActions.OPEN_DIALOG, (state) => {
    return {
      ...state,
      openedDialog: true,
    };
  })

  // ダイアログを閉じる
  .case(TitleActions.CLOSE_DIALOG, (state) => {
    return {
      ...state,
      openedDialog: false,
    };
  });
