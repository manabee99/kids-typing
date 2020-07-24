import React from 'react';

import '../../../../common/KidsTypingCommon.css';
import '../../PracticePageForm.css';

// --------------------------------------------
// 残り時間Component
// --------------------------------------------
interface OwnProps {
  // 残り時間
  remainingTime: number;
}

type RemainingTimeProps = OwnProps;
export const RemainingTime: React.FC<RemainingTimeProps> = (props) => {
  const cls = {
    frame: 'remaining-time-frame',
    valueFadein: 'kt-font-bold-stroke remaining-time-base remaining-time-fadein',
    beforeValue: 'kt-font-bold-stroke remaining-time-base remaining-time-before',
  };

  return (
    <div className={cls.frame} key={'remaining-time' + props.remainingTime}>
      {/* カウンター値（現在の値） */}
      <div className={cls.valueFadein}>{props.remainingTime}</div>

      {/* 一つ前のカウンター値（値が変化したときのアニメーション用要素） */}
      {props.remainingTime < 60 ? <div className={cls.beforeValue}>{props.remainingTime + 1}</div> : <div></div>}
    </div>
  );
};
