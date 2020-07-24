import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../PracticePageForm.css';

// --------------------------------------------
// 練習開始アニメーション Component
// --------------------------------------------
interface OwnProps {
  animationEnd: Function;
}

type PracticeStartAnimationProps = OwnProps;
export const PracticeStartAnimation: React.FC<PracticeStartAnimationProps> = (props) => {
  const cls = {
    frame: 'kt-box-fit parctice-start-animation-layer-frame',
    animation01: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-start-animation-base practice-start-animation-1',
    animation02: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-start-animation-base practice-start-animation-2',
    animation03: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-start-animation-base practice-start-animation-3',
    animation04: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-start-animation-base practice-start-animation-4',
    animation05: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-start-animation-base practice-start-animation-5',
    animation06: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-start-animation-base practice-start-animation-6',
  };

  return (
    <div className={cls.frame}>
      {/* 各アニメーションクラスのアニメーション開始時間を設定することで、順番にアニメーションが動作するようになっている */}
      <div className={cls.animation01}>5</div>
      <div className={cls.animation02}>4</div>
      <div className={cls.animation03}>3</div>
      <div className={cls.animation04}>2</div>
      <div className={cls.animation05}>1</div>
      <div className={cls.animation06} onAnimationEnd={() => props.animationEnd()}>
        Start!!
      </div>
    </div>
  );
};
