import { UPDATE_ME_DETAIL, CLEAR_ME_DETAIL } from "../actions/me";

const defaultState = {
  ///////////////////////
  rolePermission: null
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_ME_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_ME_DETAIL:
      return { ...defaultState };
    default:
      return state;
  }
};
