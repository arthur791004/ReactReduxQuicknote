import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import app from './app';
import config from './config';
import quicknote from './quicknote';
import user from './user';

const quicknoteReducers = combineReducers({
  app,
  config,
  form: reduxFormReducer,
  quicknote,
  user
});

export default quicknoteReducers;
