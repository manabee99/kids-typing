import '../../PracticePageForm.css';
import React from 'react';

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
  return (
    <div className='keycap-frame'>
      <div
        className={
          'keycap-body-base' +
          (props.enabledKey === false
            ? ' keycap-body-disabled'
            : props.keyDown
            ? ' keycap-body-down'
            : ' keycap-body') +
          ("1QAZ".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-left-forth-finger' : '') +
          ("2WSX".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-left-third-finger' : '') +
          ("3EDC".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-left-second-finger' : '') +
          ("45RTFGVB".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-left-first-finger' : '') +
          ("67YUHJNM".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-right-first-finger' : '') +
          ("8IK,)".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-right-second-finger' : '') +
          ("9OL.".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-right-third-finger' : '') +
          ("0P+/-@*_^[]\\".indexOf(props.keycapCharacter ) !== -1 ? ' keycap-right-forth-finger' : '')
        }
      >
        {props.keycapCharacter}
      </div>
    </div>
  );
};
