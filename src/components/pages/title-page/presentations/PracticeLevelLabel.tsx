import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../TitlePageForm.css';

// --------------------------------------------
// 練習レベルラベル Component
// --------------------------------------------
interface OwnProps {
  // 練習レベル
  practiceLevel: number;
}

type PracticeLevelLabelProps = OwnProps;
export const PracticeLevelLabel: React.FC<PracticeLevelLabelProps> = (props) => {
  // CSSを定義
  const cls = {
    levelLabelFrame: 'kt-flex-vertical-left kt-floating-frame practice-level-label-frame',
    levelLabel: 'practice-level-label',
  };

  return (
    <div className={cls.levelLabelFrame}>
      <div className={cls.levelLabel}>れんしゅうのレベルは {props.practiceLevel} だよ</div>
    </div>
  );
};
