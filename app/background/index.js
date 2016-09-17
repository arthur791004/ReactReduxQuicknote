import { alias, wrapStore } from 'react-chrome-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import aliases from './aliases';
import { APP } from '../shares/constants';
import reducers from '../shares/reducers';

const logger = createLogger();

chrome.storage.local.get('config', (config) => {
  const initialState = Object.assign({}, config);
  const store = createStore(reducers, initialState, applyMiddleware(alias(aliases), logger, thunk));

  console.log(store.getState());
  wrapStore(store, { portName: APP.NAME });
});

