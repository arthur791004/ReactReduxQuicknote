import superAgent from 'superagent';
import { APP, CONFIG, QUICKNOTE, USER } from '../constants';

export {
  addQuickNote,
  requestAddQuicknote,
  requestOpengraph,
  closeSnackbar,
  authUser,
  setConfig,
  setRoutePath,
  toggleDrawer,
};

function addQuickNote({ title, content }) {
  return {
    type: QUICKNOTE.ADD,
    title,
    content,
  };
}

function requestAddQuicknote({ title, content }) {
  return (dispatch, getState) => {
    const store = getState();
    const { config, user } = store;
    const protocols = config.enableSSL ? 'https://' : 'http://';
    const origin = protocols + config.hostname + ':' + config.port;
    const payload = [
      'cmd=qadd',
      `title1=${title}`,
      `note=${encodeURIComponent(content)}`,
      `crumb=${user.crumb}`,
      'utf8=1',
      `HTTP_COOKIE=${user.cookie}`
    ].join('&');

    dispatch({
      type: QUICKNOTE.REQUEST_ADD_QUICKNOTE,
      isLoading: true,
      title,
      content,
    });
    superAgent
      .get(`${origin}/cgi-bin/notepad?${payload}`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('addQuickNote failed', err);
          dispatch({
            type: QUICKNOTE.REQUEST_ADD_QUICKNOTE_FAIL,
            isLoading: false,
            snackbar: {
              open: true,
              msg: '新增隨手記失敗',
            },
          });
        } else {
          console.log('addQuickNote success', res.text);
          dispatch({
            type: QUICKNOTE.REQUEST_ADD_QUICKNOTE_SUCCESS,
            title: '',
            content: '',
            isLoading: false,
            snackbar: {
              open: true,
              msg: '新增隨手記成功',
            },
          });
        }
      });
  };
}

function requestOpengraph(url) {
  return (dispatch, getState) => {
    const urlEncoded = encodeURIComponent(url);
    const requestUrl = 'http://opengraph.io/api/1.0/site/' + urlEncoded;
    const store = getState();
    const { title, content } = store.quicknote;

    dispatch({
      type: QUICKNOTE.REQUEST_OPENGRAPH,
      isLoading: true,
      title,
      content,
    });
    superAgent
      .get(requestUrl)
      .end((err, res) => {
        if (err || res.error) {
          console.log('request opengraph failed', err || res.error);
          dispatch({
            type: QUICKNOTE.REQUEST_OPENGRAPH_FAIL,
            isLoading: false,
          });
        } else {
          console.log('request opengraph success', res.body);
          const { hybridGraph } = res.body;
          const content = hybridGraph.description ?
            `${hybridGraph.description}\n\nsource url: ${hybridGraph.url}` :
            `source url: ${hybridGraph.url}`;
          dispatch({
            type: QUICKNOTE.REQUEST_OPENGRAPH_SUCCESS,
            title: hybridGraph.title,
            content: content,
            isLoading: false,
          });
        }
      });
  };

}

function closeSnackbar() {
  return {
    type: QUICKNOTE.CLOSE_SNACKBAR,
    snackbar: {
      open: false,
      msg: '',
    },
  };
}

function authUser(authedUser) {
  return {
    type: USER.AUTH_SUCCESS,
    user: authedUser,
  };
}

function setConfig(config) {
  chrome.storage.local.set({ config });
  return {
    type: CONFIG.SET,
    config
  };
}

function setRoutePath(routePath) {
  return {
    type: APP.SET_ROUTE_PATH,
    routePath
  };
}

function toggleDrawer(drawer) {
  return {
    type: APP.TOGGLE_DRAWER,
    drawer
  };
}
