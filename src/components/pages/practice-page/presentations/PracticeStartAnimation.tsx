import "../PracticePageForm.css";
import React from "react";

// --------------------------------------------
// 練習開始アニメーション Component
// --------------------------------------------
interface OwnProps {
  animationEnd: Function;
}

type PracticeStartAnimationProps = OwnProps;
export const PracticeStartAnimation: React.FC<PracticeStartAnimationProps> = (props) => {
  return (
    <div className="parctice-start-animation-layer-frame">
      <div className="practice-start-animation-base practice-start-animation-1">5</div>
      <div className="practice-start-animation-base practice-start-animation-2">4</div>
      <div className="practice-start-animation-base practice-start-animation-3">3</div>
      <div className="practice-start-animation-base practice-start-animation-4">2</div>
      <div className="practice-start-animation-base practice-start-animation-5">1</div>
      <div className="practice-start-animation-base practice-start-animation-6" onAnimationEnd={() => props.animationEnd() }>Start!!</div>
    </div>
  )
};
