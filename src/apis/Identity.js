import { FETCH } from "../mocks";

export const RequestPassCode = async (lookup, dispatchType) => {
  const res = await FETCH("POST /Identity/RequestPassCode", {
    json: true,
    body: JSON.stringify({
      lookup,
      dispatchType
    })
  });
  return res;
};

export const LoginWithPassCode = async (userName, password) => {
  const res = await FETCH("POST /Identity/LoginWithPassCode", {
    json: true,
    body: JSON.stringify({
      userName,
      password
    })
  });
  return res;
};
export const AlternativeComm = async lookup => {
  const res = await FETCH("POST /Identity/AlternativeComm", {
    json: true,
    body: JSON.stringify({
      lookup
    })
  });
  return res;
};
export const RenewToken = async (userName, renewToken) => {
  const res = await FETCH("POST /Identity/RenewToken", {
    json: true,
    body: JSON.stringify({
      userName,
      password: renewToken
    })
  });
  return res;
};
