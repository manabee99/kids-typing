import React from 'react';

import '../../../../common/KidsTypingCommon.css';
import '../../PracticePageForm.css';

// --------------------------------------------
// キーボードのキーComponent
// --------------------------------------------
interface OwnProps {
  // キーの文字
  keycapCharacter: string;

  // 無効化
  enabledKey: boolean;

  // 押下中
  keyDown: boolean;
}

type KeycapProps = OwnProps;
export const Keycap: React.FC<KeycapProps> = (props) => {
  // CSSを定義（クラスの定義が長くなってJSXの可読性が悪くなるので一旦変数に格納）
  const cls = {
    frame: 'keycap-frame',
  };

  // キーに対応するcssを決定する
  const keyClassMap = [
    { keys: '1QAZ', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-left-first-finger' },
    { keys: '2WSX', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-left-second-finger' },
    { keys: '3EDC', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-left-third-finger' },
    { keys: '45RTFGVB', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-left-forth-finger' },
    { keys: '67YUHJNM', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-right-first-finger' },
    { keys: '8IK,', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-right-second-finger' },
    { keys: '9OL.', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-right-third-finger' },
    { keys: '0P+/-@*_^[]\\', className: 'kt-floating-frame kt-flex-vertical-center kt-box-shadow kt-font keycap-body-base keycap-right-forth-finger' },
  ];
  var keyClassName = keyClassMap.filter((m) => m.keys.indexOf(props.keycapCharacter) !== -1)[0].className;

  // 有効・無効、キーダウン状態を表現するclassを追加
  keyClassName += props.enabledKey === false ? ' keycap-body-disabled' : props.keyDown ? ' keycap-body-down' : ' keycap-body';

  return (
    <div className={cls.frame}>
      {/* キー */}
      <div className={keyClassName}>{props.keycapCharacter}</div>
    </div>
  );
};
