import '../../PracticePageForm.css';
import React from 'react';

// --------------------------------------------
// 正解カウンターComponent
// --------------------------------------------
interface OwnProps {
  // 正解数
  successCount: number;
}

type SuccessCounterProps = OwnProps;
export const SuccessCounter: React.FC<SuccessCounterProps> = (props) => {
  return (
    <div className='success-counter-frame'>
      <div className='success-counter-title'>せいかい</div>

      <div className='success-counter-value-frame' key={'sc'+ props.successCount}>
        <div className='success-counter-value-base success-counter-value-fadein'>{props.successCount}</div>
        { props.successCount > 0
            ? <div className='success-counter-value-base success-counter-before-value'>{props.successCount - 1}</div>
            : <div></div>
        }   
      </div>

    </div>
  )
}
