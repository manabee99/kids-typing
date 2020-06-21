import '../../PracticePageForm.css';
import React from 'react';
import { Keycap } from './Keycap';

// --------------------------------------------
// キーボードComponent
// --------------------------------------------
interface OwnProps {
  // キーDOWNイベントハンドラー
  onKeyDown: Function;

  // キーUPイベントハンドラー
  onKeyUp: Function;

  // 有効化キー
  enabledKeys: string[];

  // 押下中キー
  downKeys: string[];
}

type KeyboardProps = OwnProps;
export const Keyboard: React.FC<KeyboardProps> = (props) => {
  const keyOrderLine = [
    '1234567890-^\\',
    'QWERTYUIOP@[',
    'ASDFGHJKL+*]',
    'ZXCVBNM,./_',
  ];

  const allKeys: Array<any>[] = [];

  console.log(props.enabledKeys);
  Array.from(keyOrderLine).forEach((order) => {
    var keys: any = [];
    Array.from(order).forEach((c) => {
      keys.push(
        <Keycap
          keycapCharacter={c}
          enabledKey={props.enabledKeys.indexOf(c) !== -1}
          keyDown={props.downKeys.indexOf(c) !== -1}
        ></Keycap>
      );
    });
    allKeys.push(keys);
  });

  return (
    <div
      tabIndex={-1}
      className='keyboard-frame'
      onKeyDown={(e) => props.onKeyDown(props.onKeyDown)}
      onKeyUp={(e) => props.onKeyUp(props.onKeyUp)}
    >
      <div className='keyboard-line1-frame'>{allKeys[0]}</div>
      <div className='keyboard-line2-frame'>{allKeys[1]}</div>
      <div className='keyboard-line3-frame'>{allKeys[2]}</div>
      <div className='keyboard-line4-frame'>{allKeys[3]}</div>
    </div>
  );
};
