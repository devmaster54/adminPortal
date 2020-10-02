import { FETCH } from "../mocks";
import { store } from "../services";

export const GetUsersByTerm = async ({ dispatch, term }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/UserManagement/Search", {
    token,
    dispatch,
    params: {
      term
    }
  });
  return r;
};

export const GetAllUsers = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/UserManagement", {
    token,
    dispatch
  });
  return r;
};
export const GetRoleOptions = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/RoleManagement/Options", {
    token,
    dispatch
  });
  return r;
};
export const GetRolePermission = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/RoleManagement/RolePermission", {
    token,
    dispatch
  });
  return r;
};

export const PostUser = async ({ dispatch, data }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("POST /admin/UserManagement", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify(data)
  });
  return res;
};

export const GetUserDetail = async ({ dispatch, userKey }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/UserManagement/${userKey}`, {
    token,
    dispatch
  });
  return res;
};

export const DeleteUser = async ({ dispatch, userKey }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`DELETE /admin/UserManagement/${userKey}`, {
    token,
    dispatch
  });
  return res;
};

export const DisableUser = async ({ dispatch, userKey }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`PUT /admin/UserManagement/${userKey}/Disable`, {
    token,
    dispatch
  });
  return res;
};

export const SuspendUser = async ({ dispatch, userKey }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`PUT /admin/UserManagement/${userKey}/Suspend`, {
    token,
    dispatch
  });
  return res;
};

export const ApproveUser = async ({ dispatch, userKey }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`PUT /admin/UserManagement/${userKey}/Approve`, {
    token,
    dispatch
  });
  return res;
};

export const UnlockUser = async ({ dispatch, userKey }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`PUT /admin/UserManagement/${userKey}/Unlock`, {
    token,
    dispatch
  });
  return res;
};
