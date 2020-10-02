import { FETCH } from "../mocks";
import { store } from "../services";

export const SendTokenToServer = async ({ dispatch, Token }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("POST /admin/UserManagement/Token", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify({
      token: Token
    })
  });
  return r;
};

export const GetNotifications = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/Notify/Logs", {
    token,
    dispatch
  });
  return r;
};
