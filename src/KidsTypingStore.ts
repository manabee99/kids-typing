import { keyboardReducer, KeyboardState } from './store/reducers/KeyboardReducer';
import { soundReducer, SoundState } from './store/reducers/SoundReducer';
import { titleReducer, TitleState } from './store/reducers/TitleReducer';
import { TypingEngineState, typingEngineReducer } from './store/reducers/TypingEngineReducer';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { HeaderState, headerReducer } from './store/reducers/HeaderReducer';

export type AppState = {
  titleState: TitleState;
  typingEngineState: TypingEngineState;
  headerState: HeaderState;
  keyboardState: KeyboardState;
  soundState: SoundState;
};

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers<AppState>({
    titleState: titleReducer,
    typingEngineState: typingEngineReducer,
    headerState: headerReducer,
    keyboardState: keyboardReducer,
    soundState: soundReducer,
  }),
  storeEnhancers(applyMiddleware(thunk))
);

export default store;
