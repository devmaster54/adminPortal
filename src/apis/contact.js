import { FETCH } from "../mocks";
import { store } from "../services";

export const GetContactType = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/ContactModuleManagement/ContactType", {
    token,
    dispatch
  });
  return r;
};
export const GetChannelType = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/ContactModuleManagement/ChannelType", {
    token,
    dispatch
  });
  return r;
};
export const GetContactInfo = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/ContactModuleManagement", {
    token,
    dispatch
  });
  return r;
};

export const GetContactInfoById = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const r = await FETCH(`GET /admin/ContactModuleManagement/${id}`, {
    token,
    dispatch
  });
  return r;
};

export const PostContact = async ({ dispatch, data }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("POST /admin/ContactModuleManagement", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify(data)
  });
  return r;
};
