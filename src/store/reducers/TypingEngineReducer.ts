import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TypingEngineActions } from '../actions/TypingEngineAction';

// --------------------------------------------
// キータイプエンジンの状態
// --------------------------------------------
export interface TypingEngineState {
  // タイプ練習の「文字」状態リスト
  characterStateList: CharacterState[];

  // エフェクト状態リスト
  effectorStateList: EffectorState[];

  // 練習開始時間
  practiceStartTime: number;

  // 練習時間
  practiceTime: number;

  // コンポーネントIDシーケンス
  componentIdSequence: number;

  // エフェクトIDシーケンス
  effectIdSequence: number;
}

// --------------------------------------------
// タイプ練習の「文字」の状態
// --------------------------------------------
export interface CharacterState {
  // コンポーネントID
  componentId: string;

  // 文字の種別
  practiceCharacterType: PracticeCharacterType;

  // 文字
  character: string;

  // 表示位置（top）
  top: number;

  // 表示位置（left）
  left: number;

  // 加速度（x方向）
  XAcceleration: number;

  // 加速度（y方向）
  YAcceleration: number;

  // 文字の状態（init: 初期表示中、disp: 表示中、terminate: 消去中）
  characterState: string;
}

// --------------------------------------------
// エフェクトの状態
// --------------------------------------------
export interface EffectorState {
  // コンポーネントID
  effectId: string;

  // エフェクト種別
  effectType: string;

  // 表示位置（top）
  top: number;

  // 表示位置（left）
  left: number;

  // 加速度（x方向）
  XAcceleration: number;

  // 加速度（y方向）
  YAcceleration: number;

  // エフェクト開始時間
  startTime: number;
}

// --------------------------------------------
// 「文字」の種別
// --------------------------------------------
const characterTypes = {
  bird: '1',
  sakura: '2',
} as const;
type PracticeCharacterType = keyof typeof characterTypes; 

// --------------------------------------------
// 初期状態
// --------------------------------------------
export const typingEngineInitialState: TypingEngineState = {
  characterStateList: [],
  effectorStateList: [],
  practiceStartTime: 0,
  practiceTime: 0,
  componentIdSequence: 0,
  effectIdSequence: 0,
};

export const typingEngineReducer = reducerWithInitialState(typingEngineInitialState)
  // エンジンリセット
  .case(TypingEngineActions.RESET_ENGINE, (state) => {
    return {
      ...state,
      characterStateList: [],
      effectorStateList: [],
      practiceStartTime: 0,
      practiceTime: 0,
    };
  })
  // 練習開始
  .case(TypingEngineActions.START_PRACTICE, (state, payload) => {
    return {
      ...state,
      practiceStartTime: new Date().getTime(),
      practiceTime: payload.startTime,
    };
  })
  // 文字発射
  .case(TypingEngineActions.FIRE_CHARACTER, (state, payload) => {
    const characterTypeList: PracticeCharacterType[] = ['sakura', 'bird'];
    return {
      ...state,
      characterStateList: Array.from(state.characterStateList).concat({
        componentId: (state.componentIdSequence + 1).toString(),
        practiceCharacterType: characterTypeList[Math.floor(Math.random() * 2)],
        character: payload.character,
        top: 100 + Math.round(Math.random() * 100),
        left: 900,
        XAcceleration: -2,
        YAcceleration: 0,
        characterState: 'init',
      }),
      componentIdSequence: state.componentIdSequence + 1,
    };
  })
  // キー入力
  // 入力された文字が「入力する文字」の先頭文字と同じであれば、「入力する文字」の先頭を削除する
  .case(TypingEngineActions.INPUT_CHARACTER, (state, payload) => {
    return {
      ...state,
      characterStateList:
        state.characterStateList.length > 0 && state.characterStateList[0].character === payload.character
          ? state.characterStateList.slice(1)
          : state.characterStateList,

      effectorStateList:
        state.characterStateList.length > 0
          ? state.characterStateList[0].character === payload.character
            ? Array.from(state.effectorStateList).concat([
                {
                  effectId: (state.effectIdSequence + 1).toString(),
                  effectType: 'InputSuccess',
                  top: state.characterStateList[0].top,
                  left: state.characterStateList[0].left,
                  XAcceleration: state.characterStateList[0].XAcceleration,
                  YAcceleration: state.characterStateList[0].YAcceleration,
                  startTime: new Date().getTime(),
                },
              ])
            : Array.from(state.effectorStateList).concat([
                {
                  effectId: (state.effectIdSequence + 1).toString(),
                  effectType: 'InputMiss',
                  top: state.characterStateList[0].top,
                  left: state.characterStateList[0].left,
                  XAcceleration: state.characterStateList[0].XAcceleration,
                  YAcceleration: state.characterStateList[0].YAcceleration,
                  startTime: new Date().getTime(),
                },
              ])
          : state.effectorStateList,

      effectIdSequence: state.characterStateList.length > 0 ? state.effectIdSequence + 1 : state.effectIdSequence,
    };
  })

  // 時間を進める
  .case(TypingEngineActions.TICK, (state) => {
    const nowTime = new Date().getTime();
    return {
      ...state,
      characterStateList: Array.from(state.characterStateList)
        .filter((c) => c.characterState !== 'terminate')
        .filter((c) => c.left >= -100)
        .map((c) => ({
          ...c,
          // 文字の位置を算出する（縦方向）
          top: tickCharacterTop(c.practiceCharacterType, c.top, c.YAcceleration),
          // 文字の位置を算出する（横方向）
          left: tickCharacterLeft(c.practiceCharacterType, c.left, c.XAcceleration),
          // 文字の速度を算出する（縦方向）
          YAcceleration: tickCharacterYAcceleration(c.practiceCharacterType, c.top, c.YAcceleration),
          // 文字の速度を算出する（横方向）
          XAcceleration: tickCharacterXAcceleration(c.practiceCharacterType, c.left, c.XAcceleration),
        })),

      effectorStateList:
        state.effectorStateList.findIndex((ef) => nowTime - ef.startTime >= 5000) !== -1
          ? Array.from(state.effectorStateList).filter((ef) => nowTime - ef.startTime < 5000)
          : state.effectorStateList,
    };
  })

// --------------------------------------------
// 文字の位置算出関数
// --------------------------------------------

/**
 * 文字の位置を算出する（横方向に移動する）
 * @param characterType 文字の種別
 * @param top 現在の位置
 * @param yAcceleration 縦方向の移動速度
 */
function tickCharacterTop(characterType: PracticeCharacterType, top: number, yAcceleration: number): number {
  switch (characterType) {
    case 'sakura':
    case 'bird':
      return Math.round(top + yAcceleration);
  }
}

/**
 * 文字の位置を算出する（縦方向に移動する）
 * @param characterType 文字の種別
 * @param left 現在の位置
 * @param xAcceleration 横方向の移動速度
 */
function tickCharacterLeft(characterType: PracticeCharacterType, left: number, xAcceleration: number): number {
  switch (characterType) {
    case 'sakura':
      return Math.round(left + xAcceleration / 1.3);

    case 'bird':
      return Math.round(left + xAcceleration);
  }
  return Math.round(left + xAcceleration);
}

/**
 * 文字の縦方向の移動速度を算出する
 * @param characterType 文字の種別
 * @param characterState 文字の状態
 * @param top 現在の位置
 * @param yAcceleration 現在の移動速度
 */
function tickCharacterYAcceleration(characterType: PracticeCharacterType, top: number, yAcceleration: number): number {
  switch (characterType) {
    case 'sakura':
      // ランダム上下するが突然向きが逆転しないように制御する
      var acc = yAcceleration + (0.5 - Math.random() * 1);
      if (acc > 1.0) {
        acc = 1.0;
      }
      if (acc < -0.5) {
        acc = -0.5;
      }
      return acc;

    case 'bird':
      // ランダム上下する
      return 2 - Math.random() * 4;
  }
  return 1;
}

/**
 * 文字の横方向の移動速度を算出する
 * @param characterType 文字の種別
 * @param characterState 文字の状態
 * @param left 現在の位置
 * @param xAcceleration 現在の移動速度
 */
function tickCharacterXAcceleration(characterType: PracticeCharacterType, left: number, xAcceleration: number): number {
  return -2;
}
