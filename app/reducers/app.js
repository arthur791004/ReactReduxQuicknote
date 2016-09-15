import { APP } from '../constants';

const TITLE = {
  '/': '新增隨手記',
  '/config': '隨手記設定',
  '/login': '登入 Mail2000',
};

const initialState = {
  drawer: false,
  title: TITLE['/'],
  routePath: '/',
};

export default function app(state = initialState, action) {
  switch(action.type) {
    case APP.SET_ROUTE_PATH:
      return Object.assign({}, state, { routePath: action.routePath, title: TITLE[action.routePath] });
    case APP.TOGGLE_DRAWER:
      return Object.assign({}, state, { drawer: !action.drawer });
    default:
      return state;
  }
}
