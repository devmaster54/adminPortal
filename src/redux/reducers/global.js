import {
  SET_IS_MOBILE_SIZE,
  SET_VISIBLE_SIDE_MENU,
  SET_LOADING
} from "../actions/global";

const defaultState = {
  isMobileSize: false,
  visibleSideMenu: false,
  isLoading: false
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_MOBILE_SIZE:
      return { ...state, isMobileSize: action.isMobileSize };
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_VISIBLE_SIDE_MENU:
      return { ...state, visibleSideMenu: action.visibleSideMenu };
    default:
      return state;
  }
};
