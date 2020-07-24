import React from 'react';
import Sound from 'react-sound';
import { SoundStatus } from '../../store/reducers/SoundReducer';


// --------------------------------------------
// BGM Component
// --------------------------------------------
interface OwnProps {
  bgmStatus: SoundStatus;
  soundMuting: boolean;
}

type BackgroundMusicProps = OwnProps;
export const BackgroundMusic: React.FC<BackgroundMusicProps> = (props) => {
  return (
    <div key={'bgm'}>
      {props.soundMuting === false ? (
        <Sound
          url={props.bgmStatus.url}
          playStatus={props.bgmStatus.soundStatus}
          autoLoad={true}
          loop={true}
        ></Sound>
      ) : (
        ''
      )}
    </div>
  );
};
