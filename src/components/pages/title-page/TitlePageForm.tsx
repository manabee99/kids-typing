import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import '../../common/KidsTypingCommon.css';
import './TitlePageForm.css';

import { TitleLogo } from './presentations/TitleLogo';
import { PracticeLevelLabel } from './presentations/PracticeLevelLabel';
import { PracticeStartButton } from './presentations/PracticeStartButton';
import { PracticeLevelResetButton } from './presentations/PracticeLevelResetButton';
import { MuteButton } from './presentations/MuteButton';
import { BackgroundMusic } from '../../common/BackgroundMusic';
import { SoundEffect } from '../../common/SoundEffect';
import { SoundResources } from '../../../SoundResources';
import { SoundStatus } from '../../../store/reducers/SoundReducer';

// --------------------------------------------
// タイトルページコンテナから受け取るパラメータの定義
// --------------------------------------------
interface OwnProps {
  // --------------------------------------------
  // 表示用のパラメータ
  // --------------------------------------------

  // 練習レベル
  practiceLevel: number;

  // BGMの状態
  bgmStatus: SoundStatus;

  // 効果音の状態配列
  soundEffectList: SoundStatus[];

  // ミュート状態（true: ミュート中、false: ミュート解除中）
  soundMuting: boolean;

  // ダイアログの表示状態（true: 表示中、false: 非表示）
  openedDialog: boolean;

  // --------------------------------------------
  // 状態更新関数
  // --------------------------------------------

  // ダイアログを開く
  openDialog: Function;

  // ダイアログを閉じる
  closeDialog: Function;

  // WebStrageに保存している練習レベルをロード
  loadPracticeLevel: Function;

  // 練習レベルのリセット（レベル１に戻す）
  resetPracticeLevel: Function;

  // 効果音を鳴らす
  playingSoundEffect: Function;

  // BGMを停止する
  stoppedBgm: Function;

  // 効果音を一括停止する
  stoppedSoundEffect: Function;

  // ミュート(BGM、効果音の)
  soundMute: Function;
}

// パラメータの型定義
type Props = OwnProps & RouteComponentProps<{soundMuting: string}>;

// --------------------------------------------
// タイトルページのForm Component
// --------------------------------------------
export class TitlePageForm extends React.Component<Props> {
  render() {

    // CSSを定義（クラスの定義が長くなってJSXの可読性が悪くなるので一旦変数に格納）
    const cls = {
      pageBackground: 'kt-box-fit title-page-background',
      outerFrame: 'kt-box-fit title-page-outer-frame',
      innerFrame: 'kt-floating-frame kt-flex-vertical-left title-page-inner-frame',
    };

    return (
      <React.Fragment>
        {/* タイトル画面の背景画像 */}
        <div className={cls.pageBackground}></div>

        {/* タイトル画面の背景（枠の外側・画面全体） */}
        <div className={cls.outerFrame}>
          {/* タイトル画面（枠の中・タイトル画面） */}
          <div className={cls.innerFrame}>
            {/* タイトルロゴ */}
            <TitleLogo></TitleLogo>

            {/* 練習レベル */}
            <PracticeLevelLabel practiceLevel={this.props.practiceLevel}></PracticeLevelLabel>

            {/* 練習開始ボタン */}
            <PracticeStartButton startPractice={() => this.onPracticeStart()}></PracticeStartButton>

            {/* 練習レベルリセットボタン */}
            <PracticeLevelResetButton
              resetPracticeLevel={this.props.resetPracticeLevel}
              openDialog={this.props.openDialog}
              closeDialog={this.props.closeDialog}
              openedDialog={this.props.openedDialog}
            ></PracticeLevelResetButton>

            {/* ミュートボタン */}
            <MuteButton soundMute={this.props.soundMute} soundMuting={this.props.soundMuting}></MuteButton>
          </div>
        </div>

        {/* BGM */}
        <BackgroundMusic bgmStatus={this.props.bgmStatus} soundMuting={this.props.soundMuting}></BackgroundMusic>

        {/* 効果音 */}
        <SoundEffect soundEffectList={this.props.soundEffectList} soundMuting={this.props.soundMuting}></SoundEffect>
      </React.Fragment>
    );
  }

  /**
   * コンポーネントがDOMに追加された直後に呼び出されるライフサイクルメソッド
   * 練習レベルをロードする
   */
  componentDidMount() {
    // 練習レベルをロードする
    this.props.loadPracticeLevel();
    // ミュート状態を設定する
    if (this.props.match.params.soundMuting === "false") {
      this.props.soundMute();
    }
  }

  /**
   * 練習開始ボタンのイベントハンドラー
   * BGMを停止して、ボタン押下用の効果音を鳴動して、練習ページに画面遷移する
   * 本当はタイトルページコンテナに実装したいが、履歴がここでしか利用できないのでここに実装している
   */
  onPracticeStart(): void {
    // BGMを停止
    this.props.stoppedBgm();

    // ボタン押下用の効果音を鳴らす
    this.props.playingSoundEffect(SoundResources.seTitleStart);

    // 即画面遷移すると効果音がならないので、１秒後に画面遷移する
    setTimeout(
      () => {
        this.props.stoppedSoundEffect();
        this.props.history.replace('/kids-typing/practice');
      },
      1000,
      this
    );
  }
}

export default withRouter(TitlePageForm);
