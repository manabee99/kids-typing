import "./EffectLayer.css";
import React from "react";
import { EfCorrect } from "./EFCorrect";
import { EfMiss } from "./EFMiss";
import { EfInputCursor } from "./EFInputCursor";
import { EffectorState, CharacterState } from '../../store/reducers/TypingEngineReducer';

// --------------------------------------------
// 画面全体に重るエフェクトレイヤーComponent
// --------------------------------------------
interface OwnProps {
  // エフェクトリスト
  effectStateList: EffectorState[];

  // エフェクトリスト
  characterStateList: CharacterState[];
}

type EffectLayerProps = OwnProps;
export const EffectLayer: React.FC<EffectLayerProps> = (props) => {

  return (
    <React.Fragment>
      <div className="effect-layer-frame">
        {props.effectStateList.flatMap((effectState) => {
          if (effectState.effectType === "InputSuccess") {
            return (
              <div key={effectState.effectId}>
                <EfCorrect
                  componentId={effectState.effectId}
                  top={effectState.top}
                  left={effectState.left}
                  width={150}
                  height={150}
                ></EfCorrect>
              </div>
            );
          } else if (effectState.effectType === "InputMiss") {
            return (
              <div key={effectState.effectId}>
                <EfMiss
                  componentId={effectState.effectId}
                  top={effectState.top}
                  left={effectState.left}
                  width={150}
                  height={150}
                ></EfMiss>
              </div>
            );
          } else {
            return <div key={effectState.effectId}></div>;
          }
        })}
      </div>
      <div className="effect-layer-frame" key="ef-input-cursor">
        <EfInputCursor characterStateList={props.characterStateList}></EfInputCursor>
      </div>
    </React.Fragment>
  );
};
