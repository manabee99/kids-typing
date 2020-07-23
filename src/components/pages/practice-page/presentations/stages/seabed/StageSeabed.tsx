import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';

import { CharacterState } from '../../../../../../store/reducers/TypingEngineReducer';
import { CharacterTurtle } from './CharacterTurtle';
import { CharacterOctopus } from './CharacterOctopus';
import { CharacterBlowfish } from './CharacterBlowfish';
import { CharacterShark } from './CharacterShark';

// --------------------------------------------
// 練習ステージ（海底）Component
// --------------------------------------------
interface OwnProps {
  // 入力文字ステータスリスト
  characterStateList: CharacterState[];
}

type PracticeStageSeabedProps = OwnProps;
export const PracticeStageSeabed: React.FC<PracticeStageSeabedProps> = (props) => {
  const characters: any = [];
  props.characterStateList.forEach((c, idx) => {
    // キャラクターコンポーネントに設定する属性を構築
    const componentAttr = {
      isHead: idx === 0,
      componentId: c.componentId,
      character: c.character,
      top: c.top,
      left: c.left,
      charcterState: c.characterState,
    };

    if (c.practiceCharacterType === 'turtle') {
      // 入力文字の種別が「亀」の場合
      characters.push(<CharacterTurtle {...componentAttr}></CharacterTurtle>);
    } else if (c.practiceCharacterType === 'octopus') {
      // 入力文字の種別が「タコ」の場合
      characters.push(<CharacterOctopus {...componentAttr}></CharacterOctopus>);
    } else if (c.practiceCharacterType === 'blowfish') {
      // 入力文字の種別が「フグ」の場合
      characters.push(<CharacterBlowfish {...componentAttr}></CharacterBlowfish>);
    } else if (c.practiceCharacterType === 'shark') {
      // 入力文字の種別が「サメ」の場合
      characters.push(<CharacterShark {...componentAttr}></CharacterShark>);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-seabed-frame'>{characters}</div>;
};
