import '../../PracticePageForm.css'
import React from 'react'

// --------------------------------------------
// 失敗カウンターComponent
// --------------------------------------------
interface OwnProps {
    // 失敗数
    missCount: number
}

type MissCounterProps = OwnProps
export const MissCounter: React.FC<MissCounterProps> = props => {
    return (
        <div className='miss-counter-frame'>
          <div className='miss-counter-title'>まちがえ</div>
    
          <div className='miss-counter-value-frame' key={'ms'+ props.missCount}>
            <div className='miss-counter-value-base miss-counter-value-fadein'>{props.missCount}</div>
            { props.missCount > 0
                ? <div className='miss-counter-value-base miss-counter-before-value'>{props.missCount - 1}</div>
                : <div></div>
            }   
          </div>
    
        </div>
      );
    }
