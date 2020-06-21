import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../TitlePageForm.css';

// --------------------------------------------
// ミュートボタン Component
// ミュート状態に応じてミュートボタンとミュート解除ボタンを切り替えて表示する
// --------------------------------------------
interface OwnProps {
  // ミュート関数
  soundMute: Function;
  // ミュート状態（true: ミュート中、false: ミュートではない）
  soundMuting: boolean;
}

type MuteButtonProps = OwnProps;
export const MuteButton: React.FC<MuteButtonProps> = (props) => {
  // CSSを定義
  const cls = {
    muteButton: 'kt-box-shadow mute-button-base mute-button',
    unmuteButton: 'kt-box-shadow mute-button-base unmute-button',
  };

  return <div className={props.soundMuting ? cls.muteButton : cls.unmuteButton} onClick={() => props.soundMute()}></div>;
};
