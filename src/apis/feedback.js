import { FETCH } from "../mocks";
import { store } from "../services";

export const GetAllFeedbacks = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/FeedbackManagement", {
    token,
    dispatch
  });
  return r;
};
export const GetFeedbackDetail = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/FeedbackManagement/${id}`, {
    token,
    dispatch
  });
  return res;
};

export const DeleteFeedback = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`DELETE /admin/FeedbackManagement/${id}`, {
    token,
    dispatch
  });
  return res;
};
