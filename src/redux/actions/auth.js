import { storeData, removeData } from "../../services";
import { RenewToken } from "../../apis/Identity";

export const SET_EMAIL = "SET_EMAIL";
export const SET_PHONE = "SET_PHONE";
export const SET_TOKEN = "SET_TOKEN";
export const LOG_OUT = "LOG_OUT";

export const setEmail = email => {
  storeData("email", email);
  return { type: SET_EMAIL, email };
};
export const setPhone = phone => {
  storeData("phone", phone);
  return { type: SET_PHONE, phone };
};
export const setToken = ({ token, renewToken, expDate }) => {
  storeData("token", { token, renewToken, expDate }, { json: true });
  return { type: SET_TOKEN, token, renewToken, expDate };
};

export const logout = () => {
  removeData("email");
  removeData("token");
  removeData("phone");
  return { type: LOG_OUT };
};

export const getNewToken = () => async (dispatch, getState) => {
  const { renewToken, email } = getState().auth;
  const res = await RenewToken(email, renewToken);
  if (!res.success) return false;
  if (res.payload.isSuccess) {
    dispatch(setToken(res.payload));
    return res.payload.token;
  } else return false;
};
