import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../TitlePageForm.css';

// --------------------------------------------
// タイトルロゴComponent
// --------------------------------------------
interface OwnProps {}

type TitleLogoProps = OwnProps;
export const TitleLogo: React.FC<TitleLogoProps> = (props) => {
  // CSSを定義
  const cls = {
    titleLogo: 'kt-font-bold-stroke kt-text-shadow title-logo',
  };

  return <div className={cls.titleLogo}>Kids-Typing</div>;
};
