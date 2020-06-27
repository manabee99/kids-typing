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
    if (c.componentType === 'sakura') {
      // 入力文字の種別が「桜」の場合
      const charCompo = (
        <CharacterSakura
          isHead={idx === 0}
          componentId={c.componentId}
          character={c.character}
          top={c.top}
          left={c.left}
          charcterState={c.characterState}
        ></CharacterSakura>
      );
      characters.push(charCompo);
    } else if (c.componentType === 'bird') {
      // 入力文字の種別が「小鳥」の場合
      const charCompo = (
        <CharacterBird
          isHead={idx === 0}
          componentId={c.componentId}
          character={c.character}
          top={c.top}
          left={c.left}
          charcterState={c.characterState}
        ></CharacterBird>
      );
      characters.push(charCompo);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-sakura-frame'>{characters}</div>;
};
