import '../../PracticePageForm.css';
import React from 'react';

// --------------------------------------------
// 残り時間Component
// --------------------------------------------
interface OwnProps {
  // 残り時間
  remainingTime: number;
}

type RemainingTimeProps = OwnProps;
export const RemainingTime: React.FC<RemainingTimeProps> = (props) => {
  return (
    <div
      className='remaining-time-frame'
      key={'remaining-time' + props.remainingTime}
    >
      <div className='remaining-time-base remaining-time-fadein'>
        {props.remainingTime}
      </div>
      {props.remainingTime < 60 ? (
        <div className='remaining-time-base remaining-time-before'>
          {props.remainingTime + 1}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
