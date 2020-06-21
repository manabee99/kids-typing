import '../../../PracticePageForm.css';
import React from 'react'
import { CharacterSakura } from './CharacterSakura';
import { CharacterBird } from './CharacterBird';
import { CharacterState } from '../../../../../../store/reducers/TypingEngineReducer';


// --------------------------------------------
// 練習ステージ（桜）Component
// --------------------------------------------
interface OwnProps {
  // 入力文字ステータスリスト
  characterStateList: CharacterState[];
}

type PracticeStageSakuraProps = OwnProps
export const PracticeStageSakura: React.FC<PracticeStageSakuraProps> = props => {

  const characters: any = [];
  props.characterStateList.forEach( (c, idx) => {
      if (c.componentType === 'tetal') {
        const charCompo = <CharacterSakura isHead={idx === 0} componentId={c.componentId} character={c.character} top={c.top} left={c.left} charcterState={c.characterState}></CharacterSakura>
        characters.push(charCompo);
      } else
      if (c.componentType === 'bird') {
        const charCompo = <CharacterBird isHead={idx === 0} componentId={c.componentId} character={c.character} top={c.top} left={c.left} charcterState={c.characterState}></CharacterBird>
        characters.push(charCompo);
      }
      else {
        const charCompo = <CharacterBird isHead={idx === 0} componentId={c.componentId} character={'×'} top={c.top} left={c.left} charcterState={c.characterState}></CharacterBird>
        characters.push(charCompo);
      }
  });

  return (
    <div className="practice-stage-sakura-frame" >
      { characters }
    </div>
  );
}

