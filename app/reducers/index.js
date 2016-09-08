import { combineReducers } from 'redux';
import app from './app';
import config from './config';
import quicknote from './quicknote';
import user from './user';

const quicknoteReducers = combineReducers({
  app,
  config,
  quicknote,
  user
});

export default quicknoteReducers;
