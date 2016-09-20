import superAgent from 'superagent';
import { APP, CONFIG, QUICKNOTE, USER } from '../../shares/constants';
import { getOpengraph } from '../../shares/utils';
import User from '../../shares/models/User';

export default {
  [QUICKNOTE.REQUEST_ADD_QUICKNOTE]: requestAddQuicknote,
  [QUICKNOTE.REQUEST_OPENGRAPH]: requestOpengraph,
};

function requestAddQuicknote({ title, content }) {
  return (dispatch, getState) => {
    const store = getState();
    const { config } = store;
    const protocols = config.enableSSL ? 'https://' : 'http://';
    const origin = protocols + config.hostname + ':' + config.port;

    dispatch({
      type: QUICKNOTE.REQUEST_ADD_QUICKNOTE_PENDING,
      isLoading: true,
      title,
      content,
    });

    if (!config.hostname) {
      dispatch({
        type: QUICKNOTE.REQUEST_ADD_QUICKNOTE_FAIL,
        isLoading: false,
        snackbar: {
          open: true,
          msg: '尚未設定隨手記伺服器',
          action: '設定',
        },
      });
      return;
    }

    new User()
      .checkAuth(config)
      .then(({ crumb, cookie }) => {
        const payload = [
          'cmd=qadd',
          `title1=${title}`,
          `note=${encodeURIComponent(content)}`,
          `crumb=${crumb}`,
          'utf8=1',
          `HTTP_COOKIE=${cookie}`
        ].join('&');

        superAgent
          .get(`${origin}/cgi-bin/notepad?${payload}`)
          .end((err, res) => {
            if (err || !res.ok || 'Success.' !== res.text) {
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
      })
      .catch((error) => {
        dispatch({
          type: QUICKNOTE.REQUEST_ADD_QUICKNOTE_FAIL,
          isLoading: false,
          snackbar: {
            open: true,
            msg: '尚未登入',
            action: '登入',
          },
        });
      });
  };
}

function requestOpengraph({ url }) {
  return (dispatch, getState) => {
    const store = getState();
    const { title, content } = store.quicknote;

    dispatch({
      type: QUICKNOTE.REQUEST_OPENGRAPH_PENDING,
      isLoading: true,
      title,
      content,
    });

    getOpengraph(url)
      .then(({ hybridGraph }) => {
        console.log('request opengraph success', hybridGraph);
        const content = hybridGraph.description ?
          `${hybridGraph.description}\n\nsource url: ${hybridGraph.url}` :
          `source url: ${hybridGraph.url}`;

        dispatch({
          type: QUICKNOTE.REQUEST_OPENGRAPH_SUCCESS,
          title: hybridGraph.title,
          content: content,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log('request opengraph failed', error);
        dispatch({
          type: QUICKNOTE.REQUEST_OPENGRAPH_FAIL,
          isLoading: false,
        });
      });
  };
}
