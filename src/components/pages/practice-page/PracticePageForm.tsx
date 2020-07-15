import React from 'react';

import '../../common/KidsTypingCommon.css';
import './PracticePageForm.css';

import { RemainingTime } from './presentations/header/RemainingTime';
import { SuccessCounter } from './presentations/header/SuccessCounter';
import { EffectLayer } from '../../effect-layer/EffectLayer';
import { PracticeStartAnimation } from './presentations/PracticeStartAnimation';
import { PracticeStageSakura } from './presentations/stages/sakura/StageSakura';
import { SoundEffect } from '../../common/SoundEffect';
import { BackgroundMusic } from '../../common/BackgroundMusic';
import { SoundResources } from '../../../SoundResources';
import { MissCounter } from './presentations/header/MissCounter';
import { PracticeEndAnimation } from './presentations/PracticeEndAnimation';
import { Keyboard } from './presentations/keyboard/Keyboard';
import { CharacterState, EffectorState } from '../../../store/reducers/TypingEngineReducer';
import { SoundStatus } from '../../../store/reducers/SoundReducer';
import { PracticeStageType } from '../../../store/actions/TypingEngineAction';
import { PracticeStageSunflower } from './presentations/stages/sunflower/StageSunflower';
import { PracticeStageGoldfish } from './presentations/stages/goldfish/StageGoldfish';
import { PracticeStageSeabed } from './presentations/stages/seabed/StageSeabed';
import { PracticeStageHalloween } from './presentations/stages/helloween/StageHalloween';

// --------------------------------------------
// 練習ページコンテナから受け取るパラメータの定義
// --------------------------------------------
interface OwnProps {
  // --------------------------------------------
  // 表示用のパラメータ
  // --------------------------------------------

  // 正解カウンター
  successCounter: number;

  // 失敗カウンター
  missCounter: number;

  // 残り時間
  remainingTime: number;

  // 有効キー
  enabledKeys: string[];

  // 押下中のキー
  downedKeys: string[];

  // 練習ステージ種別
  practiceStageType: PracticeStageType;

  // 練習レベル
  practiceLevel: number;

  // 練習完了フラグ
  practiceCompleted: boolean;

  // 発射された「文字」の状態
  characterStateList: CharacterState[];

  // 画面の効果（アニメーション）状態
  effectorStateList: EffectorState[];

  // 現在ステージのBGM
  currentBgmUrl: string;

  // BGMの状態
  bgmStatus: SoundStatus;

  // 効果音の状態リスト
  soundEffectList: SoundStatus[];

  // ミュート状態
  soundMuting: boolean;

  // --------------------------------------------
  // 状態更新関数
  // --------------------------------------------

  // ステージ初期化関数
  initilizeStage: Function;

  // 練習開始アニメーション終了イベントハンドラー
  startAnimationEnd: Function;

  // 練習終了アニメーション終了イベントハンドラー
  endAnimationEnd: Function;

  // BGM開始関数
  playingBgm: Function;

  // BGM停止関数
  stoppedBgm: Function;

  // 効果音鳴動関数
  playingSoundEffect: Function;

  // 効果音停止関数
  stoppedSoundEffect: Function;

  // キーダウンイベントハンドラー
  keyDown: Function;

  // キーアップイベントハンドラー
  keyUp: Function;
}

// パラメータの型定義
type Props = OwnProps;

// --------------------------------------------
// 練習ページのForm Component
// --------------------------------------------
export class PracticePageForm extends React.Component<Props> {
  // --------------------------------------------
  // 処理を一度だけ実施するためのフラグ
  // --------------------------------------------

  // 練習BGM開始フラグ
  playingStartBgm = false;

  // 練習終了カウントダウン効果音開始フラグ
  playingCountdownSe = false;

  // 練習結果効果音開始フラグ
  playingResultSe = false;

  // 練習終了BGM開始フラグ
  playingStageEndBgm = false;

  // --------------------------------------------
  // 練習ページrender
  // --------------------------------------------
  render() {
    // CSSを定義（クラスの定義が長くなってJSXの可読性が悪くなるので一旦変数に格納）
    const cls = {
      pageBackground: 'kt-box-fit practice-page-background',
      outerFrame: 'kt-box-fit practice-page-outer-frame',
      innerFrame: 'kt-floating-frame kt-flex-vertical-left practice-page-inner-frame',
      headerFrame: 'kt-floating-frame header-frame',
    };

    return (
      <React.Fragment>
        {/* 練習画面の背景画像 */}
        <div className={cls.pageBackground}></div>

        {/* 練習画面の背景（枠の外側・画面全体） */}
        <div className={cls.outerFrame}>
          {/* 練習画面（枠の中・練習画面） */}
          <div className={cls.innerFrame}>
            {/* 画面ヘッダー */}
            <div className={cls.headerFrame}>
              {/* 正解カウンター */}
              <SuccessCounter successCount={this.props.successCounter}></SuccessCounter>

              {/* 残り時間 */}
              <RemainingTime remainingTime={this.props.remainingTime}></RemainingTime>

              {/* 失敗カウンター */}
              <MissCounter missCount={this.props.missCounter}></MissCounter>
            </div>

            {/* 練習ステージ全体 */}
            <div style={{ position: 'relative' }}>
              {/* 練習ステージ */}
              {this.props.practiceStageType === 'sakura' ? (
                <PracticeStageSakura characterStateList={this.props.characterStateList}></PracticeStageSakura>
              ) : this.props.practiceStageType === 'sunflower' ? (
                <PracticeStageSunflower characterStateList={this.props.characterStateList}></PracticeStageSunflower>
              ) : this.props.practiceStageType === 'goldfish' ? (
                <PracticeStageGoldfish characterStateList={this.props.characterStateList}></PracticeStageGoldfish>
              ) : this.props.practiceStageType === 'seabed' ? (
                <PracticeStageSeabed characterStateList={this.props.characterStateList}></PracticeStageSeabed>
              ) : this.props.practiceStageType === 'halloween' ? (
                <PracticeStageHalloween characterStateList={this.props.characterStateList}></PracticeStageHalloween>
              ) : (
                <div></div>
              )}

              {/* 練習開始アニメーション*/}
              <PracticeStartAnimation animationEnd={this.onAnimationEnd.bind(this)}></PracticeStartAnimation>

              {/* 練習終了アニメーション*/}
              {this.props.remainingTime === 0? (
                <PracticeEndAnimation
                  levelUp={this.props.missCounter < 3 ? true : false}
                  animationEnd={this.props.endAnimationEnd}
                  practiceCompleted={this.props.practiceCompleted}
                ></PracticeEndAnimation>
              ) : (
                <div></div>
              )}

              {/* 練習ステージに重ねて表示するアニメーションレイヤー */}
              <EffectLayer characterStateList={this.props.characterStateList} effectStateList={this.props.effectorStateList}></EffectLayer>
            </div>

            {/* キーボード */}
            <div>
              <Keyboard
                onKeyDown={(e: KeyboardEvent) => this.props.keyDown(e.key)}
                onKeyUp={(e: KeyboardEvent) => this.props.keyUp(e.key)}
                enabledKeys={this.props.enabledKeys}
                downKeys={this.props.downedKeys}
              ></Keyboard>
            </div>
          </div>
        </div>
        {/* BGM */}
        <div>
          <BackgroundMusic bgmStatus={this.props.bgmStatus} soundMuting={this.props.soundMuting}></BackgroundMusic>
        </div>
        {/* 効果音 */}
        <div>
          <SoundEffect soundEffectList={this.props.soundEffectList} soundMuting={this.props.soundMuting}></SoundEffect>
        </div>
      </React.Fragment>
    );
  }

  /**
   * コンポーネントがDOMツリーに追加された後一度だけ呼ばれるメソッド
   * ステージの初期化を実施する
   */
  componentDidMount() {
    this.props.initilizeStage();
  }

  /**
   * コンポーネントの状態が更新される毎に呼ばれるメソッド
   */
  componentDidUpdate() {
    // 練習開始時にBGMを開始して、練習開始効果音を鳴らす
    if (!this.playingStartBgm) {
      this.playingStartBgm = true;

      // BGM開始
      this.props.playingBgm(this.props.currentBgmUrl);

      // 練習開始から３秒後に「レディー」を再生して、更に２秒後に「ゴー」を再生する（画面は５秒からカウントダウンしている）
      setTimeout(
        () => {
          this.props.playingSoundEffect(SoundResources.seVoiceReady);
          setTimeout(
            () => {
              this.props.playingSoundEffect(SoundResources.seVoiceGo);
            },
            2000,
            this
          );
        },
        3000,
        this
      );
    }

    // 練習終了３秒前に「カウントダウン」効果音を再生
    if (this.props.remainingTime === 3 && !this.playingCountdownSe) {
      this.props.playingSoundEffect(SoundResources.seVoiceCountDown);
      this.playingCountdownSe = true;
    }

    // 練習終了時に「終了」効果音を再生
    if (this.props.remainingTime === 0 && !this.playingStageEndBgm) {
      this.props.playingBgm(SoundResources.bgmStageEnd);
      this.playingStageEndBgm = true;
    }

    // 練習終了時に「レベルアップ」または「残念」効果音を再生
    if (this.props.remainingTime === 0 && !this.playingResultSe) {
      // 失敗回数が２回以下ならレベルアップ、３回以上ならレベル保留
      if (this.props.missCounter < 3) {
        setTimeout(() => this.props.playingSoundEffect(SoundResources.seVoiceGoodJob), 9000, this);
      } else {
        setTimeout(() => this.props.playingSoundEffect(SoundResources.seVoicePity), 9000, this);
      }
      this.playingResultSe = true;
    }
  }

  /**
   * 練習開始アニメーションの終了イベントハンドラー
   */
  onAnimationEnd() {
    // 練習開始アニメーションの終了を親に通知
    this.props.startAnimationEnd();
  }
}
