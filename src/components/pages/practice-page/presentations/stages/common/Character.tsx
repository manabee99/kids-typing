import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';

// --------------------------------------------
// タイプ練習の文字（画像の上に乗せる文字のみ）Component
// --------------------------------------------
interface OwnProps {
  // 表示位置（top）
  top?: number;

  // 表示位置（left）
  left?: number;

  // 表示する文字
  character: string;
}

type CharacterProps = OwnProps;
export const Character: React.FC<CharacterProps> = (props) => {
  return (
    // ゼロとＯを区別するために数字は文字色を変更するクラスを追加する
    <div
      className={'kt-flex-vertical-center character-base ' + ('0123456789'.indexOf(props.character) !== -1 ? 'character-number' : '')}
      style={{ top: props.top ? props.top : 0, left: props.left ? props.left : 0 }}
    >
      {props.character}
    </div>
  );
};
