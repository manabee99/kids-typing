import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../PracticePageForm.css';

// --------------------------------------------
// 練習終了アニメーション Component
// --------------------------------------------
interface OwnProps {
  levelUp: boolean;
  animationEnd: Function;
}

type PracticeEndAnimationProps = OwnProps;
export const PracticeEndAnimation: React.FC<PracticeEndAnimationProps> = (props) => {
  // CSSを定義（クラスの定義が長くなってJSXの可読性が悪くなるので一旦変数に格納）
  const cls = {
    frame: 'kt-box-fit practice-end-animation-layer-frame',
    animation01: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-end-animation-base practice-end-animation-1',
    animation02: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-end-animation-base practice-end-animation-2',
    animation03: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-end-animation-base practice-end-animation-3',
    animation04: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-end-animation-base practice-end-animation-4',
    animation05: 'kt-box-fit kt-flex-vertical-center kt-font-bold-stroke practice-end-animation-base practice-end-animation-5',
  };
  return (
    <div className={cls.frame}>
      {/* 各アニメーションクラスのアニメーション開始時間を設定することで、順番にアニメーションが動作するようになっている */}
      <div className={cls.animation01}>おしまい</div>
      <div className={cls.animation02}>おつかれさま！</div>
      <div className={cls.animation03}>
        れんしゅうの<br></br>けっかは！！
      </div>
      {props.levelUp ? (
        <div className={cls.animation04} onAnimationEnd={() => props.animationEnd()}>
          ★　★　★<br></br>
          レベル<br></br>
          アップ！！<br></br>
          　★　★　
        </div>
      ) : (
        <div className={cls.animation05} onAnimationEnd={() => props.animationEnd()}>
          もういっかい<br></br>がんばろう
        </div>
      )}
    </div>
  );
};
