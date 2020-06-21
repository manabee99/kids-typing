import "../PracticePageForm.css";
import React from "react";

// --------------------------------------------
// 練習終了アニメーション Component
// --------------------------------------------
interface OwnProps {
  levelUp: boolean;
  animationEnd: Function;
}

type PracticeEndAnimationProps = OwnProps;
export const PracticeEndAnimation: React.FC<PracticeEndAnimationProps> = (props) => {
  return (
    <div className="practice-end-animation-layer-frame">
      <div className="practice-end-animation-base practice-end-animation-1">おしまい</div>
      <div className="practice-end-animation-base practice-end-animation-2">おつかれさま！</div>
      <div className="practice-end-animation-base practice-end-animation-3">れんしゅうの<br></br>けっかは！！</div>
      { props.levelUp
        ? <div className="practice-end-animation-base practice-end-animation-4" onAnimationEnd={() => props.animationEnd() }>レベルアップ</div>
        : <div className="practice-end-animation-base practice-end-animation-5" onAnimationEnd={() => props.animationEnd() }>もういっかい　がんばろう</div>
      }
    </div>
  )
};
