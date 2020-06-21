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

  // コンポーネント種別
  componentType: string;

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

const characterTypeList: string[] = ['tetal', 'bird'];
export const typingEngineReducer = reducerWithInitialState(typingEngineInitialState)
  // エンジンリセット
  .case(TypingEngineActions.RESET_ENGINE, (state) => {
    return {
      ...state,
      enabledKeys: [],
      downedKeys: [],
      countDownCounter: 5,
      characterStateList: [],
      previouscharacterStateList: [],
      practiceStartTime: 0,
      practiceTime: 0,
      openedDialog: false,
    };
  })
  // カウントダウン
  .case(TypingEngineActions.COUNT_DOWN, (state) => {
    return {
      ...state,
      // remainingTime: state.remainingTime > 0 ? state.remainingTime - 1 : 0,
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
  // 練習終了
  .case(TypingEngineActions.END_PRACTICE, (state) => {
    if (true) {
      return { ...state };
    }
    // ステージクリア判定（４回以上間違えるともう一度）
    // if (state.missCounter > 3) {
    //   // もう一度
    // } else {
    //   // レベルアップ
    // }
    return {
      ...state,
      practiceStartTime: 0,
      practiceTime: 0,
      // practiceLevel: state.missCounter <= 3 ? state.practiceLevel + 1 : state.practiceLevel,
      // soundEffectList:
      //   state.missCounter <= 3
      //     ? Array.from(state.soundEffectList).concat([
      //         {
      //           soundEffectId: (state.soundEffectIdSequence + 1).toString(),
      //           soundStatus: 'PLAYING',
      //           url: SoundResources.seVoiceGoodJob,
      //           playStartTime: new Date().getTime(),
      //         },
      //       ])
      //     : Array.from(state.soundEffectList).concat([
      //         {
      //           soundEffectId: (state.soundEffectIdSequence + 1).toString(),
      //           soundStatus: 'PLAYING',
      //           url: SoundResources.seVoicePity,
      //           playStartTime: new Date().getTime(),
      //         },
      //       ]),
      // soundEffectIdSequence: state.soundEffectIdSequence + 1,
    };
  })
  // 文字発射
  .case(TypingEngineActions.FIRE_CHARACTER, (state, payload) => {
    return {
      ...state,
      characterStateList: Array.from(state.characterStateList).concat({
        componentId: (state.componentIdSequence + 1).toString(),
        componentType: characterTypeList[Math.floor(Math.random() * 2)],
        character: payload.character,
        top: 100 + Math.round(Math.random() * 100),
        left: 900,
        XAcceleration: -2,
        YAcceleration: 0,
        characterState: 'init',
      }),
      componentIdSequence: state.componentIdSequence + 1,
      // soundEffectList: Array.from(state.soundEffectList).concat([
      //   {
      //     soundEffectId: (state.soundEffectIdSequence + 1).toString(),
      //     soundStatus: 'PLAYING',
      //     url: SoundResources.seFireCharacter,
      //     playStartTime: new Date().getTime(),
      //   },
      // ]),
      // soundEffectIdSequence: state.soundEffectIdSequence + 1,
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

      // missCounter: state.missCounter + (state.characterStateList.length > 0 && state.characterStateList[0].character !== payload.character ? 1 : 0),
      // successCounter:
      //   state.successCounter + (state.characterStateList.length > 0 && state.characterStateList[0].character === payload.character ? 1 : 0),
      // soundEffectList:
      //   state.characterStateList.length > 0
      //     ? state.characterStateList[0].character === payload.character
      //       ? Array.from(state.soundEffectList).concat([
      //           {
      //             soundEffectId: (state.soundEffectIdSequence + 1).toString(),
      //             soundStatus: 'PLAYING',
      //             url: SoundResources.seSuccess,
      //             playStartTime: new Date().getTime(),
      //           },
      //         ])
      //       : Array.from(state.soundEffectList).concat([
      //           {
      //             soundEffectId: (state.soundEffectIdSequence + 1).toString(),
      //             soundStatus: 'PLAYING',
      //             url: SoundResources.seMiss,
      //             playStartTime: new Date().getTime(),
      //           },
      //         ])
      //     : state.soundEffectList,
      // soundEffectIdSequence: state.soundEffectIdSequence + 1,
    };
  })

  // 時間を進める
  .case(TypingEngineActions.TICK, (state) => {
    const nowTime = new Date().getTime();
    return {
      ...state,
      // remainingTime: state.practiceTime - Math.round((nowTime - state.practiceStartTime) / 1000),

      characterStateList: Array.from(state.characterStateList)
        .filter((c) => c.characterState !== 'terminate')
        .filter((c) => c.left >= -100)
        .map((c) => ({
          ...c,
          // characterState: 'disp',
          top: tickCharacterTop(c.componentType, c.top, c.YAcceleration),
          left: tickCharacterLeft(c.componentType, c.left, c.XAcceleration),
          YAcceleration: tickCharacterYAcceleration(c.componentType, c.characterState, c.top, c.YAcceleration),
          XAcceleration: tickCharacterXAcceleration(c.componentType, c.characterState, c.top, c.YAcceleration),
        })),

      effectorStateList:
        state.effectorStateList.findIndex((ef) => nowTime - ef.startTime >= 5000) !== -1
          ? Array.from(state.effectorStateList).filter((ef) => nowTime - ef.startTime < 5000)
          : state.effectorStateList,

      // soundEffectList:
      //   state.soundEffectList.findIndex((se) => nowTime - se.playStartTime >= 3000) !== -1
      //     ? Array.from(state.soundEffectList).filter((se) => nowTime - se.playStartTime < 3000)
      //     : state.soundEffectList,
    };
  })

  // 入力失敗の判定
  .case(TypingEngineActions.TICK_NOT_ENTERED, (state) => {
    const nowTime = new Date().getTime();
    return {
      ...state,

      // missCounter: state.characterStateList.length > 0 && state.characterStateList[0].left <= -100 ? state.missCounter + 1 : state.missCounter,

      effectorStateList:
        state.characterStateList.length > 0 && state.characterStateList[0].left <= -100
          ? Array.from(state.effectorStateList).concat([
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

      effectIdSequence:
        state.characterStateList.length > 0 && state.characterStateList[0].left <= -100 ? state.effectIdSequence + 1 : state.effectIdSequence,

      // soundEffectList:
      //   state.characterStateList.length > 0 && state.characterStateList[0].left <= -100
      //     ? Array.from(state.soundEffectList).concat([
      //         {
      //           soundEffectId: (state.soundEffectIdSequence + 1).toString(),
      //           soundStatus: 'PLAYING',
      //           url: SoundResources.seMiss,
      //           playStartTime: new Date().getTime(),
      //         },
      //       ])
      //     : state.soundEffectList,

      // soundEffectIdSequence:
      //   state.characterStateList.length > 0 && state.characterStateList[0].left <= -100
      //     ? state.soundEffectIdSequence + 1
      //     : state.soundEffectIdSequence,
    };
  });

// --------------------------------------------
// 文字の位置算出関数
// --------------------------------------------

function tickCharacterTop(characterType: string, top: number, yAcceleration: number): number {
  switch (characterType) {
    case 'tetal':
      return Math.round(top + yAcceleration);

    case 'bird':
      return Math.round(top + yAcceleration);
  }
  return top;
}

function tickCharacterLeft(characterType: string, left: number, xAcceleration: number): number {
  switch (characterType) {
    case 'tetal':
      return Math.round(left + xAcceleration / 1.3);

    case 'bird':
      return Math.round(left + xAcceleration);
  }
  return Math.round(left + xAcceleration);
}

function tickCharacterYAcceleration(characterType: string, characterState: string, top: number, yAcceleration: number): number {
  if (characterState === 'correct') {
    return 10;
  }

  switch (characterType) {
    case 'tetal':
      var acc = yAcceleration + (0.5 - Math.random() * 1);
      if (acc > 1.0) {
        acc = 1.0;
      }
      if (acc < -0.5) {
        acc = -0.5;
      }
      return acc;

    case 'bird':
      return 2 - Math.random() * 4;
  }
  return 1;
}

function tickCharacterXAcceleration(characterType: string, characterState: string, left: number, xAcceleration: number): number {
  if (characterState === 'correct') {
    return -10;
  }

  return -2;
}
