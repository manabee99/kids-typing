import "./EffectLayer.css";
import React from "react";
import { CharacterState } from '../../store/reducers/TypingEngineReducer';

// --------------------------------------------
// ミス用のエフェクトComponent
// --------------------------------------------
interface OwnProps {
  characterStateList: CharacterState[];
}

type EFInputCursorProps = OwnProps;
export const EfInputCursor: React.FC<EFInputCursorProps> = (props) => {
  if (props.characterStateList.length === 0) {
    return <div key="ef-input-cursor"></div>;
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
