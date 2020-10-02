import { FETCH } from "../mocks";
import { store } from "../services";

export const GetButtonType = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/OrgThemeManagement/ButtonType", {
    token,
    dispatch
  });
  return r;
};

export const GetTheme = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/OrgThemeManagement", {
    token,
    dispatch
  });
  return r;
};

export const GetThemeById = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const r = await FETCH(`GET /admin/OrgThemeManagement/${id}`, {
    token,
    dispatch
  });
  return r;
};

export const PostTheme = async ({ dispatch, data }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("POST /admin/OrgThemeManagement", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify(data)
  });
  return r;
};
