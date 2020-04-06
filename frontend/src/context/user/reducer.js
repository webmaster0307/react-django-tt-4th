import produce from 'immer';

import {
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_STORE,
  SEND_ENQUIERY_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  SIGN_OUT,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action,
) =>  {
  const { type, payload } = action;
  if(type === RESET_STORE) {
    return { ...payload, updatedAt: new Date().getMilliseconds() }
  }

  return produce(state, draft => {
    draft.updatedAt = new Date().getMilliseconds();
    switch(type) {
      case GET_USERS_SUCCESS:
        const { data: { count, results}, params } = payload;
        draft.users = results;
        draft.count = count;
        draft.loading = false;
        draft.params = { ...draft.params, ...params};
        break;
      case GET_USER_SUCCESS:
        draft.user = payload || {};
        break;
      case LOGIN_REQUEST:
        draft.loginLoading = true;
        break;
      case LOGIN_SUCCESS:
        draft.currentUser = payload;
        draft.loginLoading = false;
        break;
      case LOGIN_FAILURE: 
        draft.loginLoading = false;
        break;
      case SIGN_OUT:
        draft.currentUser = {}
        break;
      case SEND_ENQUIERY_SUCCESS:
        if(draft.user) {
          draft.user.enquiries = ((draft.user && draft.user.enquiries)||[]).concat(payload);
        }
        break;
      case PROFILE_UPDATE_SUCCESS:
        draft.currentUser = { ...payload, enquiries: (draft.currentUser && draft.currentUser.enquiries) || []}
        break;
      default: break;
    } 
  })
};