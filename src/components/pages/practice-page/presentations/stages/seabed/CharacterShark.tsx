import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';
import { Character } from '../common/Character';

// --------------------------------------------
// タイプ練習の文字（サメ）Component
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

type CharacterSharkProps = OwnProps;
export const CharacterShark: React.FC<CharacterSharkProps> = (props) => {
  return (
    <div
      key={'shark' + props.componentId}
      className={'kt-flex-vertical-center kt-font-white character-base character-shark'}
      style={{ top: Math.round(props.top), left: Math.round(props.left) }}
    >
      <Character left={20} character={props.character}></Character>
    </div>
  );
};
