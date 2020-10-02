export const UPDATE_DEPARTMENT_DETAIL = "UPDATE_DEPARTMENT_DETAIL";
export const CLEAR_DEPARTMENT_DETAIL = "CLEAR_DEPARTMENT_DETAIL";

import {
  GetDepartmentOptions,
  GetAllDepartments,
  DeleteDepartment,
  GetDepartmentUsers,
  SetDeptUserList,
  PostDepartment
} from "../../apis/department";
import { setLoading } from "../actions/global";

export const updateDepartmentDetail = data => ({
  type: UPDATE_DEPARTMENT_DETAIL,
  data
});

export const clearDepartmentDetail = () => ({
  type: CLEAR_DEPARTMENT_DETAIL
});

export const getDepartmentOptions = () => async (dispatch, getState) => {
  const res = await GetDepartmentOptions({ dispatch });
  if (!res.success) return;
  dispatch(updateDepartmentDetail({ department_options: res.payload }));
};

export const getDepartmentList = () => async (dispatch, getState) => {
  const res = await GetAllDepartments({ dispatch });
  if (!res.success) return;
  dispatch(updateDepartmentDetail({ department_list: res.payload }));
};

export const editDepartment = id => async (dispatch, getState) => {
  const res = await GetDepartmentUsers({ dispatch, id });
  if (!res.success) return false;
  const { department_list } = getState().department;
  const selected = department_list.find(item => item.departmentId === id);
  dispatch(
    updateDepartmentDetail({
      user_list: res.payload,
      editable_department: selected,
      departmentName: selected.departmentName,
      departmentDesc: selected.departmentDesc,
      isEditing: true
    })
  );
  return res;
};
export const checkValidation = () => (dispatch, getState) => {
  const { departmentName, departmentDesc } = getState().department;

  let res_data = {
    success: true,
    data: {
      name_invalid: false,
      desc_invalid: false,
      err_msg: "*Please enter the required fields."
    }
  };

  if (departmentName === "")
    res_data = {
      success: false,
      data: { ...res_data.data, name_invalid: true }
    };
  if (departmentDesc === "")
    res_data = {
      success: false,
      data: { ...res_data.data, desc_invalid: true }
    };
  return res_data;
};

export const postDepartment = () => async (dispatch, getState) => {
  const {
    departmentName,
    departmentDesc,
    user_list,
    isEditing,
    editable_department
  } = getState().department;
  dispatch(setLoading(true));
  let data = { departmentName, departmentDesc, departmentId: 0 };
  if (isEditing)
    data = { ...data, departmentId: editable_department.departmentId };
  console.log(data);
  const res = await PostDepartment({ dispatch, data });
  console.log(res);
  if (!res.success) {
    dispatch(setLoading(false));
    return res;
  }
  const resU = await SetDeptUserList({
    dispatch,
    data: {
      departmentId: res.payload,
      orgUsers: user_list.map(item => item.orgUserId)
    }
  });
  dispatch(setLoading(false));
  return resU;
};
export const deleteDepartment = id => async (dispatch, getState) => {
  const { department_list } = getState().department;
  const res = await DeleteDepartment({ dispatch, id });
  if (res.success) {
    const new_list = department_list.filter(item => item.departmentId != id);
    dispatch(updateDepartmentDetail({ department_list: new_list }));
  }
  return res;
};
