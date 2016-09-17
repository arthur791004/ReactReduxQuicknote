import { QUICKNOTE } from '../constants';

const initialState = {
  title: '',
  content: '',
  isLoading: false,
  snackbar: {
    open: false,
    msg: '',
  },
};

export default function quicknote(state = initialState, action) {
  let nextState;
  switch(action.type) {
    case QUICKNOTE.ADD:
      nextState = {
        title: action.title,
        content: action.content,
      };

      return Object.assign({}, state, initialState, nextState);
    case QUICKNOTE.REQUEST_ADD_QUICKNOTE_PENDING:
      nextState = {
        title: action.title,
        content: action.content,
        isLoading: action.isLoading,
      };

      return Object.assign({}, state, nextState);
    case QUICKNOTE.REQUEST_ADD_QUICKNOTE_SUCCESS:
      nextState = {
        title: action.title,
        content: action.content,
        isLoading: action.isLoading,
        snackbar: action.snackbar,
      };

      return Object.assign({}, state, nextState);
    case QUICKNOTE.REQUEST_ADD_QUICKNOTE_FAIL:
      nextState = {
        isLoading: action.isLoading,
        snackbar: action.snackbar,
      };

      return Object.assign({}, state, nextState);
    case QUICKNOTE.REQUEST_OPENGRAPH_PENDING:
    case QUICKNOTE.REQUEST_OPENGRAPH_SUCCESS:
      nextState = {
        title: action.title,
        content: action.content,
        isLoading: action.isLoading,
      };

      return Object.assign({}, state, nextState);
    case QUICKNOTE.REQUEST_OPENGRAPH_FAIL:
      nextState = {
        isLoading: action.isLoading,
      };

      return Object.assign({}, state, nextState);
    case QUICKNOTE.CLOSE_SNACKBAR:
      nextState = {
        snackbar: action.snackbar,
      };

      return Object.assign({}, state, nextState);
    default:
      return state;
  }
}
