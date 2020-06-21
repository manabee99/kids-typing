import React from 'react';

import '../../../common/KidsTypingCommon.css';
import '../TitlePageForm.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// --------------------------------------------
// 練習レベルリセットボタン Component
// ボタンが押下されると確認メッセージを表示して「はい」が選択された場合は練習レベルを１に戻す
// --------------------------------------------
interface OwnProps {
  // 練習レベルリセット関数
  resetPracticeLevel: Function;
  // ダイアログ表示関数
  openDialog: Function;
  // ダイアログ消去関数
  closeDialog: Function;
  // ダイアログの表示状態（true:表示中、false:非表示）
  openedDialog: boolean;
}

type PracticeLevelResetButtonProps = OwnProps;
export const PracticeLevelResetButton: React.FC<PracticeLevelResetButtonProps> = (props) => {
  // CSSを定義
  const cls = {
    resetButtonFrame: 'kt-flex-vertical-center kt-box-shadow practice-level-reset-button-frame',
    resetButton: 'kt-font practice-level-reset-button',
  };

  return (
    <React.Fragment>
      {/* リセットボタン */}
      <div className={cls.resetButtonFrame} onClick={() => props.openDialog()}>
        <div className={cls.resetButton}>リセット</div>
      </div>

      {/* 練習レベルリセット確認ダイアログ */}
      <Dialog
        open={props.openedDialog}
        onClose={() => props.closeDialog()}
        aria-labelledby='practice-level-reset-dialog-title'
        aria-describedby='practice-level-reset-dialog-description'
      >
        <DialogTitle id='practice-level-reset-dialog-title'>かくにん</DialogTitle>
        <DialogContent>
          <DialogContentText id='practice-level-reset-dialog-description'>
            れんしゅうのレベルをリセットするよ。<br></br>
            レベルが１にもどるけど　だいじょうぶ？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.closeDialog()} color='primary'>
            やだよ～
          </Button>
          <Button onClick={() => props.resetPracticeLevel() && props.closeDialog()} color='primary'>
            いいよ
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
