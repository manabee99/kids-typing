import React from 'react';
import { SoundStatus } from '../../store/reducers/SoundReducer';


// --------------------------------------------
// 効果音 Component
// --------------------------------------------
interface OwnProps {
  soundEffectList: SoundStatus[];
  soundMuting: boolean;
}

type SoundEffectProps = OwnProps;
export const SoundEffect: React.FC<SoundEffectProps> = (props) => {
  if (props.soundMuting) {
    return <div></div>;
  }

  const soundEffects: any = [];
  props.soundEffectList
    .filter((soundStatus) => soundStatus.url !== '' && soundStatus.soundStatus === 'PLAYING')
    .flatMap((soundStatus) => {
      soundEffects.push(
        <div key={'se-' + soundStatus.soundEffectId}>
          <audio src={soundStatus.url} autoPlay></audio>
        </div>
      );
    });

  return <div>{soundEffects}</div>;
};
