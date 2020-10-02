import { store } from "../services";

export const GetArticles = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/ArticleManagement", { token, dispatch });
  return r;
};

export const GetArticleTypes = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("GET /admin/ArticleManagement/Types", {
    token,
    dispatch
  });
  return res;
};

export const PostArticle = async ({ dispatch, data }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("POST /admin/ArticleManagement", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify(data)
  });
  return res;
};

export const DeleteArticle = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`DELETE /admin/ArticleManagement/${id}`, {
    token,
    dispatch
  });
  return res;
};

export const GetArticleListByType = async ({ type, dispatch }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/ArticleManagement/${type}/List`, {
    token,
    dispatch
  });
  return res;
};

export const GetArticleDetail = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/ArticleManagement/${id}/Detail`, {
    token,
    dispatch
  });
  return res;
};
