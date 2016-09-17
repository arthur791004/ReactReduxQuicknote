import { CONFIG } from '../constants';

const initialState = {
  hostname: '',
  port: 80,
  enableSSL: false
};

export default function config(state = initialState, action) {
  switch(action.type) {
    case CONFIG.SET:
      return action.config;
    default:
      return state;
  }
}
