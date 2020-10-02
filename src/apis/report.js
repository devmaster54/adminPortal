import { FETCH } from "../mocks";
import { store } from "../services";

export const GetDocumentActivity = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/Report/DocumentActivity", {
    token,
    dispatch
  });
  return r;
};

export const GetArticleActivity = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/Report/ArticleActivity", {
    token,
    dispatch
  });
  return r;
};

export const GetAlertArticle = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/Report/AlertArticle", {
    token,
    dispatch
  });
  return r;
};

export const GetUserState = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/Report/UserStatus", {
    token,
    dispatch
  });
  return r;
};

export const GetUserDevice = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/Report/UserDevice", {
    token,
    dispatch
  });
  return r;
};

export const GetLoginActivity = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/Report/LoginActivity", {
    token,
    dispatch
  });
  return r;
};
