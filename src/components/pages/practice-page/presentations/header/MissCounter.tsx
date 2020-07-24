import React from 'react';

import '../../../../common/KidsTypingCommon.css';
import '../../PracticePageForm.css';

// --------------------------------------------
// 失敗カウンターComponent
// --------------------------------------------
interface OwnProps {
  // 失敗数
  missCount: number;
}

type MissCounterProps = OwnProps;
export const MissCounter: React.FC<MissCounterProps> = (props) => {
  // CSSを定義（クラスの定義が長くなってJSXの可読性が悪くなるので一旦変数に格納）
  const cls = {
    frame: 'miss-counter-frame',
    title: 'kt-font-bold-stroke miss-counter-title',
    valueFrame: 'miss-counter-value-frame',
    valueFadein: 'kt-font-bold-stroke miss-counter-value-base miss-counter-value-fadein',
    beforeValue: 'kt-font-bold-stroke miss-counter-value-base miss-counter-before-value',
  };

  return (
    <div className={cls.frame}>
      {/* タイトル */}
      <div className={cls.title}>まちがえ</div>

      {/* 値の枠（keyにカウンター値を設定することでCSSアニメーションを設定したエレメントの再描画を抑止している） */}
      <div className={cls.valueFrame} key={'miss-counter' + props.missCount}>
        {/* カウンター値（現在の値） */}
        <div className={cls.valueFadein}>{props.missCount}</div>

        {/* 一つ前のカウンター値（値が変化したときのアニメーション用要素） */}
        {props.missCount > 0 ? <div className={cls.beforeValue}>{props.missCount - 1}</div> : <div></div>}
      </div>
    </div>
  );
};
