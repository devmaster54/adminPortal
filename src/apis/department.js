import { FETCH } from "../mocks";
import { store } from "../services";

export const GetDepartmentOptions = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/DepartmentManagement/Options", {
    token,
    dispatch
  });
  return r;
};

export const GetAllDepartments = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const r = await FETCH("GET /admin/DepartmentManagement", {
    token,
    dispatch
  });
  return r;
};

export const GetDepartmentUsers = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const r = await FETCH(`GET /admin/DepartmentManagement/${id}/Users`, {
    token,
    dispatch
  });
  return r;
};

export const PostDepartment = async ({ dispatch, data }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("POST /admin/DepartmentManagement", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify(data)
  });
  return res;
};

export const SetDeptUserList = async ({ dispatch, data }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("POST /admin/DepartmentManagement/AddUsers", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify(data)
  });
  return res;
};

export const AddUserToDepartment = async ({
  dispatch,
  departmentId,
  orgUserId
}) => {
  const { token } = store.getState().auth;
  const res = await FETCH("POST /admin/UserManagement", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify({ departmentId, orgUserId })
  });
  return res;
};

export const DeleteDepartment = async ({ dispatch, id }) => {
  const { token } = store.getState().auth;
  const r = await FETCH(`DELETE /admin/DepartmentManagement/${id}`, {
    token,
    dispatch
  });
  return r;
};

export const DeleteUserFromDepartment = async ({
  dispatch,
  deptId,
  orgUserId
}) => {
  const { token } = store.getState().auth;
  const r = await FETCH(
    `DELETE /admin/DepartmentManagement/${deptId}/${orgUserId}`,
    {
      token,
      dispatch
    }
  );
  return r;
};
