import React from "react";

import '../common/KidsTypingCommon.css';
import "./EffectLayer.css";

import { CharacterState } from '../../store/reducers/TypingEngineReducer';

// --------------------------------------------
// 「文字」のカーソル用のエフェクトComponent
// --------------------------------------------
interface OwnProps {
  characterStateList: CharacterState[];
}

type EFInputCursorProps = OwnProps;
export const EfInputCursor: React.FC<EFInputCursorProps> = (props) => {

  if (props.characterStateList.length === 0) {
    return <div></div>;
  }

  return (
    <div
      className="ef-input-cursor"
      // 文字種別が「黒猫」である場合のみ、カーソルの表示位置を少し上にする
      style={{
        top: props.characterStateList[0].top - (props.characterStateList[0].practiceCharacterType === 'blackcat' ?  30 : 12),
        left: props.characterStateList[0].left - 12,
        opacity: 0.5,
      }}
    ></div>
  );
};
