import superAgent from 'superagent';
import { APP, CONFIG, QUICKNOTE, USER } from '../constants';

export {
  addQuickNote,
  requestAddQuicknote,
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
          console.log('addQuickNote success', res.body);
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
    user: authUser,
  };
}

function setConfig(config) {
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
