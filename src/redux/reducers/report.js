import { UPDATE_REPORT_DETAIL, CLEAR_REPORT_DETAIL } from "../actions/report";

const defaultState = {
  ///////////////////////
  user_device: [],
  user_state: [],
  alert_article: null,
  login_activity: [],
  article_activity: [],
  document_activity: []
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_REPORT_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_REPORT_DETAIL:
      return { ...defaultState };
    default:
      return state;
  }
};
