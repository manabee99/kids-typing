import React from 'react';

import '../../../../../common/KidsTypingCommon.css';
import '../../../PracticePageForm.css';
import { Character } from '../common/Character';

// --------------------------------------------
// タイプ練習の文字（とんぼ）Component
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

type CharacterDragonflyProps = OwnProps;
export const CharacterDragonfly: React.FC<CharacterDragonflyProps> = (props) => {
  return (
    <div
      key={'dragonfly' + props.componentId}
      className={'kt-flex-vertical-center kt-font-white character-base character-dragonfly'}
      style={{ top: Math.round(props.top), left: Math.round(props.left) }}
    >
      <Character left={20} character={props.character}></Character>
    </div>
  );
};
