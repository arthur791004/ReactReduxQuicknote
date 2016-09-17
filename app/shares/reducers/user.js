import { USER } from '../constants';

const initialState = {
  cookie: '',
  crumb: '',
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case USER.AUTH_SUCCESS:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}
