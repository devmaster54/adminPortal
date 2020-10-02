export const UPDATE_FEEDBACK_DETAIL = "UPDATE_FEEDBACK_DETAIL";
export const CLEAR_FEEDBACK_DETAIL = "CLEAR_FEEDBACK_DETAIL";

import {
  GetAllFeedbacks,
  GetFeedbackDetail,
  DeleteFeedback
} from "../../apis/feedback";

export const updateFeedbackDetail = data => ({
  type: UPDATE_FEEDBACK_DETAIL,
  data
});

export const clearFeedDetail = () => ({
  type: CLEAR_FEEDBACK_DETAIL
});

export const getFeedbackList = () => async (dispatch, getState) => {
  const res = await GetAllFeedbacks({ dispatch });
  if (!res.success) return;
  dispatch(updateFeedbackDetail({ feedback_list: res.payload }));
};

export const getFeedbackDetail = id => async (dispatch, getState) => {
  const res = await GetFeedbackDetail({ dispatch, id });
  if (!res.success) return false;
  dispatch(updateFeedbackDetail({ selected_feedback: res.payload }));
  return res;
};
export const deleteFeedback = id => async (dispatch, getState) => {
  const { feedback_list } = getState().feedback;
  const res = await DeleteFeedback({ dispatch, id });
  if (res.success) {
    const new_list = feedback_list.filter(item => item.orgUserFeedbackId != id);
    dispatch(updateFeedbackDetail({ feedback_list: new_list }));
  }
  return res;
};
