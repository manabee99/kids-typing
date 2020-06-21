import React from 'react';

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

interface OwnProps {
  successCounter: number;
  missCounter: number;
  remainingTime: number;
  enabledKeys: string[];
  downedKeys: string[];
  practiceLevel: number;
  characterStateList: CharacterState[];
  effectorStateList: EffectorState[];
  startAnimationEnd: Function;
  endAnimationEnd: Function;
  bgmStatus: SoundStatus;
  soundEffectList: SoundStatus[];
  soundMuting: boolean;
  playingBgm: Function;
  stoppedBgm: Function;
  playingSoundEffect: Function;
  stoppedSoundEffect: Function;
  keyDown: Function;
  keyUp: Function;
}

type Props = OwnProps;
export class PracticePageForm extends React.Component<Props> {
  playingStartBgm = false;
  playingPracticeBgm = false;
  playingCountdownSe = false;
  playingResultSe = false;
  playingStageEndBgm = false;
  beforeSuccessCount = 0;
  changeSuccessCount = true;

  render() {

    return (
      <React.Fragment>
        <div className='practice-page-background'></div>

        <div className='practice-page-outer-frame'>
          <div className='practice-page-inner-frame'>
            <div className='header-frame'>
              <SuccessCounter successCount={this.props.successCounter}></SuccessCounter>

              <RemainingTime
                remainingTime={this.props.remainingTime}
              ></RemainingTime>

              <MissCounter missCount={this.props.missCounter}></MissCounter>
            </div>

            <div style={{ position: 'relative' }}>
              <PracticeStageSakura
                characterStateList={this.props.characterStateList}
              ></PracticeStageSakura>
              <EffectLayer
                characterStateList={this.props.characterStateList}
                effectStateList={this.props.effectorStateList}
              ></EffectLayer>
              <PracticeStartAnimation
                animationEnd={this.onAnimationEnd.bind(this)}
              ></PracticeStartAnimation>
              {this.props.remainingTime === 0 ? (
                <PracticeEndAnimation
                  levelUp={this.props.missCounter < 3 ? true : false}
                  animationEnd={this.props.endAnimationEnd}
                ></PracticeEndAnimation>
              ) : (
                <div></div>
              )}
            </div>

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
        <div>
          <BackgroundMusic
            bgmStatus={this.props.bgmStatus}
            soundMuting={this.props.soundMuting}
          ></BackgroundMusic>
        </div>
        <div>
          <SoundEffect
            soundEffectList={this.props.soundEffectList}
            soundMuting={this.props.soundMuting}
          ></SoundEffect>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (!this.playingStartBgm) {
      this.props.playingBgm(SoundResources.bgmStageTetal);
      this.playingStartBgm = true;
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
  }

  componentDidUpdate() {
    if (this.props.remainingTime === 3 && !this.playingCountdownSe) {
      this.props.playingSoundEffect(SoundResources.seVoiceCountDown);
      this.playingCountdownSe = true;
    }


    if (this.props.remainingTime === 0 && !this.playingStageEndBgm) {
      this.props.playingBgm(SoundResources.bgmStageEnd);
      this.playingStageEndBgm = true;
    }

    if (this.props.remainingTime === 0 && !this.playingResultSe) {
      if (this.props.missCounter < 3) {
        setTimeout(
          () => this.props.playingSoundEffect(SoundResources.seVoiceGoodJob),
          9000,
          this
        );
      } else {
        setTimeout(
          () => this.props.playingSoundEffect(SoundResources.seVoicePity),
          9000,
          this
        );
      }
      this.playingResultSe = true;
    }

    this.beforeSuccessCount = this.props.successCounter - 1;
  }


  onAnimationEnd() {
    if (!this.playingPracticeBgm) {
      // this.props.playingSoundEffect(SoundResources.seStageTetalStart);
      // his.props.playingBgm(SoundResources.bgmStageTetal);
      this.playingPracticeBgm = true;
    }
    this.props.startAnimationEnd();
  }

}
