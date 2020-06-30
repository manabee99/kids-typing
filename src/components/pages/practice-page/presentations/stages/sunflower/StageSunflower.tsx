import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';

import { CharacterState } from '../../../../../../store/reducers/TypingEngineReducer';
import { CharacterDragonfly } from './CharacterDragonfly';
import { CharacterLadybird } from './CharacterLadybird';

// --------------------------------------------
// 練習ステージ（ひまわり）Component
// --------------------------------------------
interface OwnProps {
  // 入力文字ステータスリスト
  characterStateList: CharacterState[];
}

type PracticeStageSunflowerProps = OwnProps;
export const PracticeStageSunflower: React.FC<PracticeStageSunflowerProps> = (props) => {
  const characters: any = [];
  props.characterStateList.forEach((c, idx) => {
    if (c.practiceCharacterType === 'dragonfly') {
      // 入力文字の種別が「とんぼ」の場合
      const charCompo = (
        <CharacterDragonfly
          isHead={idx === 0}
          componentId={c.componentId}
          character={c.character}
          top={c.top}
          left={c.left}
          charcterState={c.characterState}
        ></CharacterDragonfly>
      );
      characters.push(charCompo);
    } else if (c.practiceCharacterType === 'ladybird') {
      // 入力文字の種別が「てんとうむし」の場合
      const charCompo = (
        <CharacterLadybird
          isHead={idx === 0}
          componentId={c.componentId}
          character={c.character}
          top={c.top}
          left={c.left}
          charcterState={c.characterState}
        ></CharacterLadybird>
      );
      characters.push(charCompo);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-sunflower-frame'>{characters}</div>;
};
