import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';

import { CharacterSakura } from './CharacterSakura';
import { CharacterBird } from './CharacterBird';
import { CharacterState } from '../../../../../../store/reducers/TypingEngineReducer';

// --------------------------------------------
// 練習ステージ（桜）Component
// --------------------------------------------
interface OwnProps {
  // 入力文字ステータスリスト
  characterStateList: CharacterState[];
}

type PracticeStageSakuraProps = OwnProps;
export const PracticeStageSakura: React.FC<PracticeStageSakuraProps> = (props) => {
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

    if (c.practiceCharacterType === 'sakura') {
      characters.push(<CharacterSakura {...componentAttr}></CharacterSakura>);
    } else if (c.practiceCharacterType === 'bird') {
      characters.push(<CharacterBird {...componentAttr}></CharacterBird>);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-sakura-frame'>{characters}</div>;
};
