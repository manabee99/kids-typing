import React from 'react';

import '../../../../common/KidsTypingCommon.css';
import '../../PracticePageForm.css';

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
  // キー配列
  const keyOrderLine = ['1234567890-^\\', 'QWERTYUIOP@[', 'ASDFGHJKL+*]', 'ZXCVBNM,./_'];

  // キー配列に合わせてキーコンポーネントを生成する
  const allKeys: Array<any>[] = [];
  Array.from(keyOrderLine).forEach((order) => {
    var keys: any = [];
    Array.from(order).forEach((c) => {
      keys.push(
      <Keycap 
        keycapCharacter={c}
        enabledKey={props.enabledKeys.indexOf(c) !== -1}
        keyDown={props.downKeys.indexOf(c) !== -1}>
      </Keycap>);
    });
    allKeys.push(keys);
  });

  // CSSを定義（クラスの定義が長くなってJSXの可読性が悪くなるので一旦変数に格納）
  const cls = {
    frame: 'kt-flex-vertical-center keyboard-frame',
    firstRow: 'kt-flex-horizontal-left keyboard-first-row-frame',
    secondRow: 'kt-flex-horizontal-left keyboard-second-row-frame',
    theardRow: 'kt-flex-horizontal-left keyboard-theard-row-frame',
    lastRow: 'kt-flex-horizontal-left fkkeyboard-last-row-frame',
  };

  return (
    <div className={cls.frame}>
      <div className={cls.firstRow}>{allKeys[0]}</div>
      <div className={cls.secondRow}>{allKeys[1]}</div>
      <div className={cls.theardRow}>{allKeys[2]}</div>
      <div className={cls.lastRow}>{allKeys[3]}</div>
    </div>
  );
};
