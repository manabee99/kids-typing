import React from 'react';

import '../common/KidsTypingCommon.css';
import './EffectLayer.css';

import { EfCorrect } from './EFCorrect';
import { EfMiss } from './EFMiss';
import { EfInputCursor } from './EFInputCursor';
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
      {/* エフェクトレイヤーの外枠（練習ステージに重ねて表示） */}
      <div className='effect-layer-frame'>
        {props.effectStateList.flatMap((effectState) => {
          if (effectState.effectType === 'InputSuccess') {
            // 正解エフェクト
            return (
              <div key={effectState.effectId}>
                <EfCorrect componentId={effectState.effectId} top={effectState.top} left={effectState.left} width={150} height={150}></EfCorrect>
              </div>
            );
          } else if (effectState.effectType === 'InputMiss') {
            // 失敗エフェクト
            return (
              <div key={effectState.effectId}>
                <EfMiss componentId={effectState.effectId} top={effectState.top} left={effectState.left} width={150} height={150}></EfMiss>
              </div>
            );
          } else {
            return <div key={effectState.effectId}></div>;
          }
        })}
      </div>

      {/* 「文字」のカーソル */}
      <div className='effect-layer-frame' key='ef-input-cursor'>
        <EfInputCursor characterStateList={props.characterStateList}></EfInputCursor>
      </div>
    </React.Fragment>
  );
};
