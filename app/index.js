import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import App from './components/App';
import User from './models/User';

const logger = createLogger();
const user = new User();
let initialState = {};

user
  .checkAuth()
  .then((authedUser) => {
    initialState = Object.assign({}, { user: authedUser });
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    const store = createStore(reducers, initialState, applyMiddleware(logger, thunk));
    console.log(store.getState());
    renderApp(store);
  });

function renderApp(store) {
  injectTapEventPlugin();
  render(
    <Provider store= { store }>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
}
