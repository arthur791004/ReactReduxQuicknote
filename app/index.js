import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import { APP } from './constants';
import App from './components/App';

const store = new Store({
  portName: APP.NAME
});

const unsubscribe = store.subscribe(() => {
  unsubscribe();
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
