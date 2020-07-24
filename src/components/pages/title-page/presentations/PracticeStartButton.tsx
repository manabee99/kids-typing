import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../TitlePageForm.css';

// --------------------------------------------
// 練習開始ボタン Component
// --------------------------------------------
interface OwnProps {
  // 練習開始関数
  startPractice: Function;
}

type PracticeStartButtonProps = OwnProps;
export const PracticeStartButton: React.FC<PracticeStartButtonProps> = (props) => {
  // CSSを定義
  const cls = {
    startButtonFrame: 'kt-flex-vertical-center kt-box-shadow practice-start-button-frame',
    startButton: 'kt-font practice-start-button',
  };

  return (
    <div className={cls.startButtonFrame} onClick={() => props.startPractice()}>
      <div className={cls.startButton}>START</div>
    </div>
  );
};
