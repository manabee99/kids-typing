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
      style={{
        top: props.characterStateList[0].top - 12,
        left: props.characterStateList[0].left - 12,
        opacity: 0.5,
      }}
    ></div>
  );
};
