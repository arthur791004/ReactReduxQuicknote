import { USER } from '../constants';
import User from '../models/User';

const initialState = new User();

export default function counter(state = initialState, action) {
  switch(action.type) {
    case USER.AUTH_SUCCESS:
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
}
