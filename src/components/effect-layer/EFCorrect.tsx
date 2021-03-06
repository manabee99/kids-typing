import React from "react";

import '../common/KidsTypingCommon.css';
import "./EffectLayer.css";

// --------------------------------------------
// 正解用のエフェクトComponent
// --------------------------------------------
interface OwnProps {
  // コンポーネントID
  componentId: string;

  // 表示位置（top）
  top: number;

  // 表示位置（left）
  left: number;

  // サイズ（幅）
  width: number;

  // サイズ（高さ）
  height: number;
}

type EFCorrectProps = OwnProps;
export const EfCorrect: React.FC<EFCorrectProps> = (props) => {
  return (
    <div
      className="kt-flex-vertical-center ef-correct"
      style={{
        top: props.top,
        left: props.left,
        width: props.width,
        height: props.height,
      }}
    ></div>
  );
};
