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
    // キャラクターコンポーネントに設定する属性を構築
    const componentAttr = {
      isHead: idx === 0,
      componentId: c.componentId,
      character: c.character,
      top: c.top,
      left: c.left,
      charcterState: c.characterState,
    };

    if (c.practiceCharacterType === 'bat') {
      // 入力文字の種別が「コウモリ」の場合
      characters.push(<CharacterBat {...componentAttr}></CharacterBat>);
    } else if (c.practiceCharacterType === 'blackcat') {
      // 入力文字の種別が「黒猫」の場合
      characters.push(<CharacterBlackCat {...componentAttr}></CharacterBlackCat>);
    } else if (c.practiceCharacterType === 'ghost') {
      // 入力文字の種別が「お化け」の場合
      characters.push(<CharacterGhost {...componentAttr}></CharacterGhost>);
    } else if (c.practiceCharacterType === 'pumpkin') {
      // 入力文字の種別が「かぼちゃ」の場合
      characters.push(<CharacterPumpkin {...componentAttr}></CharacterPumpkin>);
    } else if (c.practiceCharacterType === 'witch') {
      // 入力文字の種別が「魔女」の場合
      characters.push(<CharacterWitch {...componentAttr}></CharacterWitch>);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-halloween-frame'>{characters}</div>;
};
