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
    // キャラクターコンポーネントに設定する属性を構築
    const componentAttr = {
      isHead: idx === 0,
      componentId: c.componentId,
      character: c.character,
      top: c.top,
      left: c.left,
      charcterState: c.characterState,
    };

    if (c.practiceCharacterType === 'goldfish') {
      // 入力文字の種別が「金魚」の場合
      characters.push(<CharacterGoldfish {...componentAttr}></CharacterGoldfish>);
    } else if (c.practiceCharacterType === 'blackfish') {
      // 入力文字の種別が「出目金」の場合
      characters.push(<CharacterBlackfish {...componentAttr}></CharacterBlackfish>);
    } else if (c.practiceCharacterType === 'catfish') {
      // 入力文字の種別が「なまず」の場合
      characters.push(<CharacterCatfish {...componentAttr}></CharacterCatfish>);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-goldfish-frame'>{characters}</div>;
};
