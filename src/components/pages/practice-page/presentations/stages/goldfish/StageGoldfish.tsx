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
    if (c.practiceCharacterType === 'goldfish') {
      // 入力文字の種別が「金魚」の場合
      const charCompo = (
        <CharacterGoldfish
          isHead={idx === 0}
          componentId={c.componentId}
          character={c.character}
          top={c.top}
          left={c.left}
          charcterState={c.characterState}
        ></CharacterGoldfish>
      );
      characters.push(charCompo);
    } else if (c.practiceCharacterType === 'blackfish') {
      // 入力文字の種別が「出目金」の場合
      const charCompo = (
        <CharacterBlackfish
          isHead={idx === 0}
          componentId={c.componentId}
          character={c.character}
          top={c.top}
          left={c.left}
          charcterState={c.characterState}
        ></CharacterBlackfish>
      );
      characters.push(charCompo);
    } else if (c.practiceCharacterType === 'catfish') {
      // 入力文字の種別が「なまず」の場合
      const charCompo = (
        <CharacterCatfish
          isHead={idx === 0}
          componentId={c.componentId}
          character={c.character}
          top={c.top}
          left={c.left}
          charcterState={c.characterState}
        ></CharacterCatfish>
      );
      characters.push(charCompo);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-goldfish-frame'>{characters}</div>;
};
