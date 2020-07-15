import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import '../../common/KidsTypingCommon.css';
import './EndingPageForm.css';

import { EndingLogo } from './presentations/EndingLogo';
import { BackgroundMusic } from '../../common/BackgroundMusic';
import { SoundEffect } from '../../common/SoundEffect';
import { SoundResources } from '../../../SoundResources';
import { SoundStatus } from '../../../store/reducers/SoundReducer';
import { CharacterState, EffectorState } from '../../../store/reducers/TypingEngineReducer';
import { CharacterSakura } from '../practice-page/presentations/stages/sakura/CharacterSakura';
import { CharacterBird } from '../practice-page/presentations/stages/sakura/CharacterBird';
import { CharacterGoldfish } from '../practice-page/presentations/stages/goldfish/CharacterGoldfish';
import { CharacterBlackfish } from '../practice-page/presentations/stages/goldfish/CharacterBlackfish';
import { CharacterDragonfly } from '../practice-page/presentations/stages/sunflower/CharacterDragonfly';
import { CharacterLadybird } from '../practice-page/presentations/stages/sunflower/CharacterLadybird';
import { CharacterTurtle } from '../practice-page/presentations/stages/seabed/CharacterTurtle';
import { CharacterOctopus } from '../practice-page/presentations/stages/seabed/CharacterOctopus';
import { CharacterBlowfish } from '../practice-page/presentations/stages/seabed/CharacterBlowfish';
import { CharacterShark } from '../practice-page/presentations/stages/seabed/CharacterShark';
import { CharacterBat } from '../practice-page/presentations/stages/helloween/CharacterBat';
import { CharacterBlackCat } from '../practice-page/presentations/stages/helloween/CharacterBlackCat';
import { CharacterGhost } from '../practice-page/presentations/stages/helloween/CharacterGhost';
import { CharacterPumpkin } from '../practice-page/presentations/stages/helloween/CharacterPumpkin';
import { CharacterWitch } from '../practice-page/presentations/stages/helloween/CharacterWitch';

// --------------------------------------------
// タイトルページコンテナから受け取るパラメータの定義
// --------------------------------------------
interface OwnProps {
  // --------------------------------------------
  // 表示用のパラメータ
  // --------------------------------------------

  // 発射された「文字」の状態
  characterStateList: CharacterState[];

  // 画面の効果（アニメーション）状態
  effectorStateList: EffectorState[];

  // BGMの状態
  bgmStatus: SoundStatus;

  // 効果音の状態配列
  soundEffectList: SoundStatus[];

  // ミュート状態（true: ミュート中、false: ミュート解除中）
  soundMuting: boolean;

  // ダイアログの表示状態（true: 表示中、false: 非表示）
  openedDialog: boolean;

  // フェードアウトフラグ
  fadeOut: boolean;

  // --------------------------------------------
  // 状態更新関数
  // --------------------------------------------

  // エンディングアニメーション開始
  startEnding: Function;

  // 画面フェードアウト
  fadeOutEnding: Function;

  // エンディング終了
  endEnding: Function;

  // ダイアログを開く
  openDialog: Function;

  // ダイアログを閉じる
  closeDialog: Function;

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
type Props = OwnProps & RouteComponentProps<{ soundMuting: string }>;

// --------------------------------------------
// タイトルページのForm Component
// --------------------------------------------
export class EndingPageForm extends React.Component<Props> {
  render() {
    // CSSを定義（クラスの定義が長くなってJSXの可読性が悪くなるので一旦変数に格納）
    const cls = {
      pageBackground: 'kt-box-fit ending-page-background',
      outerFrame: 'kt-box-fit ending-page-outer-frame',
      innerFrame: 'kt-floating-frame kt-flex-vertical-left ending-page-inner-frame',
    };

    const characters: any = [];
    this.props.characterStateList.forEach((c, idx) => {
      if (c.practiceCharacterType === 'sakura') {
        // 入力文字の種別が「桜」の場合
        const charCompo = (
          <CharacterSakura
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterSakura>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'bird') {
        // 入力文字の種別が「小鳥」の場合
        const charCompo = (
          <CharacterBird
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterBird>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'goldfish') {
        // 入力文字の種別が「金魚」の場合
        const charCompo = (
          <CharacterGoldfish
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterGoldfish>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'blackfish') {
        // 入力文字の種別が「出目金」の場合
        const charCompo = (
          <CharacterBlackfish
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterBlackfish>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'dragonfly') {
        // 入力文字の種別が「とんぼ」の場合
        const charCompo = (
          <CharacterDragonfly
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterDragonfly>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'ladybird') {
        // 入力文字の種別が「てんとうむし」の場合
        const charCompo = (
          <CharacterLadybird
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterLadybird>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'turtle') {
        // 入力文字の種別が「亀」の場合
        const charCompo = (
          <CharacterTurtle
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterTurtle>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'octopus') {
        // 入力文字の種別が「タコ」の場合
        const charCompo = (
          <CharacterOctopus
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterOctopus>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'blowfish') {
        // 入力文字の種別が「フグ」の場合
        const charCompo = (
          <CharacterBlowfish
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterBlowfish>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'shark') {
        // 入力文字の種別が「サメ」の場合
        const charCompo = (
          <CharacterShark
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterShark>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'bat') {
        // 入力文字の種別が「コウモリ」の場合
        const charCompo = (
          <CharacterBat
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterBat>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'blackcat') {
        // 入力文字の種別が「黒猫」の場合
        const charCompo = (
          <CharacterBlackCat
            isHead={idx === 0}
            componentId={c.componentId}
            character={``}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterBlackCat>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'ghost') {
        // 入力文字の種別が「お化け」の場合
        const charCompo = (
          <CharacterGhost
            isHead={idx === 0}
            componentId={c.componentId}
            character={``}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterGhost>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'pumpkin') {
        // 入力文字の種別が「かぼちゃ」の場合
        const charCompo = (
          <CharacterPumpkin
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterPumpkin>
        );
        characters.push(charCompo);
      } else if (c.practiceCharacterType === 'witch') {
        // 入力文字の種別が「魔女」の場合
        const charCompo = (
          <CharacterWitch
            isHead={idx === 0}
            componentId={c.componentId}
            character={''}
            top={c.top}
            left={c.left}
            charcterState={c.characterState}
          ></CharacterWitch>
        );
        characters.push(charCompo);
      }
    });

    return (
      <React.Fragment>
        {/* タイトル画面の背景画像 */}
        <div className={cls.pageBackground}></div>

        {/* タイトル画面の背景（枠の外側・画面全体） */}
        <div className={cls.outerFrame}>
          {/* タイトル画面（枠の中・タイトル画面） */}
          <div className={cls.innerFrame + (this.props.fadeOut ? ' ending-fade-out' : '')}>
            {/* タイトルロゴ（zindex23はロゴを最前面にするための設定） */}
            <div className='kt-box-fit kt-flex-vertical-top-center' style={{ zIndex: 23 }}>
              <EndingLogo></EndingLogo>
            </div>

            {/* キャラクター（zindex22は背景とロゴの間にキャラクターを表示するための設定） */}
            <div className='kt-box-fit' style={{ zIndex: 22 }}>
              <div className='kt-flex-horizontal-left ending-animation-frame'>{characters}</div>
            </div>
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
   * ミュート中である場合はミュートを設定する
   */
  componentDidMount() {
    // ミュート状態を設定する
    if (this.props.match.params.soundMuting === 'false') {
      this.props.soundMute();
    }

    // １０秒後にキャラクターを登場させる
    setTimeout(
      () => {
        this.props.startEnding();
      },
      10 * 1000,
      this
    );

    // １１０秒後にタイトル画面をフェードアウト
    setTimeout(
      () => {
        this.props.fadeOutEnding();
      },
      110 * 1000,
      this
    );

    // １２０秒後にタイトル画面に戻る
    setTimeout(
      () => {
        this.props.endEnding();
      },
      120 * 1000,
      this
    );
  }
}

export default withRouter(EndingPageForm);
