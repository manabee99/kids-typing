import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';

import { CharacterState } from '../../../../../../store/reducers/TypingEngineReducer';
import { CharacterGoldfish } from './CharacterGoldfish';
import { CharacterBlackfish } from './CharacterBlackfish';
import { CharacterCatfish } from './CharacterCatfish';

// --------------------------------------------
// 練習ステージ（金魚）Component
// --------------------------------------------
interface OwnProps {
  // 入力文字ステータスリスト
  characterStateList: CharacterState[];
}

type PracticeStageGoldfishProps = OwnProps;
export const PracticeStageGoldfish: React.FC<PracticeStageGoldfishProps> = (props) => {
  const characters: any = [];
  props.characterStateList.forEach((c, idx) => {
    const componentAttr = {
      isHead: idx === 0,
      componentId: c.componentId,
      character: c.character,
      top: c.top,
      left: c.left,
      charcterState: c.characterState,
    };

    if (c.practiceCharacterType === 'goldfish') {
      characters.push(<CharacterGoldfish {...componentAttr}></CharacterGoldfish>);
    } else if (c.practiceCharacterType === 'blackfish') {
      characters.push(<CharacterBlackfish {...componentAttr}></CharacterBlackfish>);
    } else if (c.practiceCharacterType === 'catfish') {
      characters.push(<CharacterCatfish {...componentAttr}></CharacterCatfish>);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-goldfish-frame'>{characters}</div>;
};
