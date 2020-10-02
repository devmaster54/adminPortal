import { SET_EMAIL, SET_PHONE, SET_TOKEN, LOG_OUT } from "../actions/auth";

const defaultState = {
  isAuthenticated: false,
  email: "",
  phone: "",
  token: "",
  renewToken: "",
  expDate: ""
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.email };
    case SET_PHONE:
      return { ...state, phone: action.phone };
    case SET_TOKEN:
      return { ...state, ...action, isAuthenticated: true };
    case LOG_OUT:
      return defaultState;
    default:
      return state;
  }
};
