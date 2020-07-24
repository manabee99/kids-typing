import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';

import { CharacterState } from '../../../../../../store/reducers/TypingEngineReducer';
import { CharacterBat } from './CharacterBat';
import { CharacterBlackCat } from './CharacterBlackCat';
import { CharacterGhost } from './CharacterGhost';
import { CharacterPumpkin } from './CharacterPumpkin';
import { CharacterWitch } from './CharacterWitch';

// --------------------------------------------
// 練習ステージ（金魚）Component
// --------------------------------------------
interface OwnProps {
  // 入力文字ステータスリスト
  characterStateList: CharacterState[];
}

type PracticeStageHalloweenProps = OwnProps;
export const PracticeStageHalloween: React.FC<PracticeStageHalloweenProps> = (props) => {
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

    if (c.practiceCharacterType === 'bat') {
      characters.push(<CharacterBat {...componentAttr}></CharacterBat>);
    } else if (c.practiceCharacterType === 'blackcat') {
      characters.push(<CharacterBlackCat {...componentAttr}></CharacterBlackCat>);
    } else if (c.practiceCharacterType === 'ghost') {
      characters.push(<CharacterGhost {...componentAttr}></CharacterGhost>);
    } else if (c.practiceCharacterType === 'pumpkin') {
      characters.push(<CharacterPumpkin {...componentAttr}></CharacterPumpkin>);
    } else if (c.practiceCharacterType === 'witch') {
      characters.push(<CharacterWitch {...componentAttr}></CharacterWitch>);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-halloween-frame'>{characters}</div>;
};
