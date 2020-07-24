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
    // キャラクターコンポーネントに設定する属性を構築
    const componentAttr = {
      isHead: idx === 0,
      componentId: c.componentId,
      character: c.character,
      top: c.top,
      left: c.left,
      charcterState: c.characterState,
    };

    if (c.practiceCharacterType === 'sakura') {
      // 入力文字の種別が「桜」の場合
      characters.push(<CharacterSakura {...componentAttr}></CharacterSakura>);
    } else if (c.practiceCharacterType === 'bird') {
      // 入力文字の種別が「小鳥」の場合
      characters.push(<CharacterBird {...componentAttr}></CharacterBird>);
    }
  });

  return <div className='kt-floating-frame kt-flex-horizontal-left practice-stage-sakura-frame'>{characters}</div>;
};
