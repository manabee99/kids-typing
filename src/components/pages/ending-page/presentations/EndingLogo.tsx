import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../EndingPageForm.css';

// --------------------------------------------
// エンディングロゴComponent
// --------------------------------------------
interface OwnProps {}

type EndingLogoProps = OwnProps;
export const EndingLogo: React.FC<EndingLogoProps> = (props) => {
  // CSSを定義
  const cls = {
    endingLogo: 'kt-font-bold-stroke kt-text-shadow ending-logo',
  };

  return <div className={cls.endingLogo}>ぜんぶクリア<br></br>おめでとう！</div>;
};
