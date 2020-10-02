import { FETCH } from "../mocks";
import { store } from "../services";

export const GetProfile = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /User/Profile", {
    token,
    dispatch
  });
  return r;
};
