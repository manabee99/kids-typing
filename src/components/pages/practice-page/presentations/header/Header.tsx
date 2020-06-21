import React from 'react';

// --------------------------------------------
// 画面ヘッダーComponent
// --------------------------------------------
interface OwnProps {
  // 正解カウンター
  successCounter: number;

  // 失敗カウンター
  missCounter: number;

  // 残り時間
  remainingTime: number;
}

type HeaderProps = OwnProps;
export const RadioInput: React.FC<HeaderProps> = (props) => {
  return (
    <div>
      <span>SUCCESS: {props.successCounter}</span>
      <span>残り時間: {props.remainingTime}</span>
      <span>MISS: {props.missCounter}</span>
    </div>
  );
};
