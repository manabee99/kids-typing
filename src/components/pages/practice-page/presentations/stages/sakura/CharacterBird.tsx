import '../../../PracticePageForm.css';
import React from 'react';

// --------------------------------------------
// タイプ練習の文字（小鳥）Component
// --------------------------------------------
interface OwnProps {
  // コンポーネントID
  componentId: string;

  // 文字
  character: string;

  // 表示位置（top）
  top: number;

  // 表示位置（left）
  left: number;

  // 文字の状態（init: 初期表示中、disp: 表示中、terminate: 消去中）
  charcterState: string;

  // 先頭文字
  isHead: boolean;
}

type CharacterBirdProps = OwnProps;
export const CharacterBird: React.FC<CharacterBirdProps> = (props) => {
  return (
    <div
      className={
        'character-base character-bird ' +
        ('0123456789'.indexOf(props.character) !== -1 ? 'character-number' : '')
      }
      style={{ top: Math.round(props.top), left: Math.round(props.left) }}
    >
      {props.character}
    </div>
  );
};
