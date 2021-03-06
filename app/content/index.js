import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import { APP } from '../shares/constants';
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
  const elem = document.createElement('div');
  elem.id = 'quicknoteApp';
  document.body.appendChild(elem);
  //document.body.insertBefore(elem, document.body.childNodes[0]);
  render(
    <Provider store= { store }>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('quicknoteApp')
  );
}
