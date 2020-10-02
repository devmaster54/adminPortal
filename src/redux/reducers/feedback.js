import {
  UPDATE_FEEDBACK_DETAIL,
  CLEAR_FEEDBACK_DETAIL
} from "../actions/feedback";

const defaultState = {
  ///////////////////////
  feedback_list: [],
  selected_feedback: null
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_FEEDBACK_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_FEEDBACK_DETAIL:
      return {
        ...defaultState,
        feedback_list: state.feedback_list
      };
    default:
      return state;
  }
};
