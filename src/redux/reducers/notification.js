import { getData } from "../../services";
import {
  UPDATE_NOTIFICATION_DETAIL,
  CLEAR_NOTIFICATION_DETAIL
} from "../actions/notification";

const defaultState = {
  notifications: [],
  isNewNotify: getData("isNewNotify") === "true"
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_NOTIFICATION_DETAIL:
      return { ...defaultState };
    default:
      return state;
  }
};
