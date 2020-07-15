
import thunk from 'redux-thunk';
import { HeaderState, headerReducer } from './reducers/HeaderReducer';
import { TitleState, titleReducer } from './reducers/TitleReducer';
import { TypingEngineState, typingEngineReducer } from './reducers/TypingEngineReducer';
import { KeyboardState, keyboardReducer } from './reducers/KeyboardReducer';
import { SoundState, soundReducer } from './reducers/SoundReducer';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { endingReducer, EndingState } from './reducers/EndingReducer';

export type AppState = {
  titleState: TitleState;
  endingState: EndingState;
  typingEngineState: TypingEngineState;
  headerState: HeaderState;
  keyboardState: KeyboardState;
  soundState: SoundState;
};

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers<AppState>({
    titleState: titleReducer,
    endingState: endingReducer,
    typingEngineState: typingEngineReducer,
    headerState: headerReducer,
    keyboardState: keyboardReducer,
    soundState: soundReducer,
  }),
  storeEnhancers(applyMiddleware(thunk))
);

export default store;
