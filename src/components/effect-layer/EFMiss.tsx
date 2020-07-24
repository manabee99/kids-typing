import React from "react";

import '../common/KidsTypingCommon.css';
import "./EffectLayer.css";

// --------------------------------------------
// ミス用のエフェクトComponent
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

type EFMissProps = OwnProps;
export const EfMiss: React.FC<EFMissProps> = (props) => {
  return (
    <div
      className="kt-flex-vertical-center ef-miss"
      style={{
        top: props.top - 12,
        left: props.left - 12,
        width: props.width,
        height: props.height,
      }}
    ></div>
  );
};
