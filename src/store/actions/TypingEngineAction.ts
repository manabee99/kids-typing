
// --------------------------------------------
// キータイプエンジン Action
// --------------------------------------------
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
export const TypingEngineActions = {
  // ステージ選択
  SELECTED_PRACTICE_STAGE: actionCreator<{ stageType: PracticeStageType }> ('SET_PRACTICE_STAGE'),

  // ステージで利用する文字種別を設定
  SELECTED_CHARACTER_TYPE: actionCreator<{ characterTypes: PracticeCharacterType[] }> ('SELECTED_CHARACTER_TYPE'),

  // エンジンリセット
  RESET_ENGINE: actionCreator('RESET_ENGINE'),

  // 練習開始
  START_PRACTICE: actionCreator<{ startTime: number }>('START_PRACTICE'),

  // 文字発射
  FIRE_CHARACTER: actionCreator<{ character: string }>('FIRE_CHARACTER'),

  // キー入力
  INPUT_CHARACTER: actionCreator<{ character: string }>('INPUT_CHARACTER'),

  // 時間経過
  TICK: actionCreator('TICK'),
};

// --------------------------------------------
// 練習ステージの種別
// --------------------------------------------
const practiceStageTypes = {
  sakura: '1',
  sunflower: '2',
  goldfish: '3',
  seabed: '4',
  halloween: '5',
} as const;
export type PracticeStageType = keyof typeof practiceStageTypes;

// --------------------------------------------
// 「文字」の種別
// --------------------------------------------
const characterTypes = {
  bird: '1',
  sakura: '2',
  dragonfly: '3',
  ladybird: '4',
  goldfish: '5',
  blackfish: '6',
  catfish: '7',
  turtle: '8',
  octopus: '9',
  blowfish: '10',
  shark: '11',
  bat: '12',
  blackcat: '13',
  ghost: '14',
  pumpkin: '15',
  witch: '16',
} as const;
export type PracticeCharacterType = keyof typeof characterTypes;

