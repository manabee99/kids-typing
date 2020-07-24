import React from 'react';

import '../../../../common/KidsTypingCommon.css';
import '../../PracticePageForm.css';

// --------------------------------------------
// 正解カウンターComponent
// --------------------------------------------
interface OwnProps {
  // 正解数
  successCount: number;
}

type SuccessCounterProps = OwnProps;
export const SuccessCounter: React.FC<SuccessCounterProps> = (props) => {
  const cls = {
    frame: 'success-counter-frame',
    title: 'kt-font-bold-stroke success-counter-title',
    valueFrame: 'success-counter-value-frame',
    valueFadein: 'kt-font-bold-stroke success-counter-value-base success-counter-value-fadein',
    beforeValue: 'kt-font-bold-stroke success-counter-value-base success-counter-before-value',
  };

  return (
    <div className={cls.frame}>
      {/* タイトル */}
      <div className={cls.title}>せいかい</div>

      {/* 値の枠（keyにカウンター値を設定することでCSSアニメーションを設定したエレメントの再描画を抑止している） */}
      <div className={cls.valueFrame} key={'success-counter' + props.successCount}>
        {/* カウンター値（現在の値） */}
        <div className={cls.valueFadein}>{props.successCount}</div>

        {/* 一つ前のカウンター値（値が変化したときのアニメーション用要素） */}
        {props.successCount > 0 ? <div className={cls.beforeValue}>{props.successCount - 1}</div> : <div></div>}
      </div>
    </div>
  );
};
