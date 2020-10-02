export const UPDATE_USER_DETAIL = "UPDATE_USER_DETAIL";
export const CLEAR_USER_DETAIL = "CLEAR_USER_DETAIL";

import {
  GetAllUsers,
  GetRoleOptions,
  GetRolePermission,
  PostUser,
  DeleteUser,
  DisableUser,
  GetUserDetail,
  SuspendUser,
  ApproveUser,
  UnlockUser
} from "../../apis/user";
import { setLoading } from "../actions/global";
import { getCodeByStatus } from "../../services";
import { userStatus } from "../../constants/enum";
import {
  validateEmail,
  validatePhone,
  validateStaffID
} from "../../services/validate";

export const updateUserDetail = data => ({
  type: UPDATE_USER_DETAIL,
  data
});

export const clearUserDetail = () => ({
  type: CLEAR_USER_DETAIL
});

export const getUsers = () => async (dispatch, getState) => {
  const res = await GetAllUsers({ dispatch });
  if (!res.success) return;
  dispatch(updateUserDetail({ users: res.payload }));
};
export const getRoleOptions = () => async (dispatch, getState) => {
  const res = await GetRoleOptions({ dispatch });
  if (!res.success) return;
  dispatch(updateUserDetail({ roleOptions: res.payload }));
};
export const getRolePermission = () => async (dispatch, getState) => {
  const res = await GetRolePermission({ dispatch });
  if (!res.success) return;
  dispatch(updateUserDetail({ rolePermission: res.payload[0] }));
};

export const editUser = userKey => async (dispatch, getState) => {
  const res = await GetUserDetail({ dispatch, userKey });
  if (!res.success || res.payload === null) return false;
  const {
    firstName,
    lastName,
    mobile,
    roles,
    status,
    departments,
    attributes,
    privacySetting,
    email
  } = res.payload;
  const attr = attributes.find(item => item.attributeName === "Position");
  const employ_num = attributes.find(
    item => item.attributeName === "EmployeeNum"
  );
  const contactPrivacy = privacySetting.find(item => item.privacyType === 200);
  let data = {
    firstName,
    lastName,
    roles: roles.map(item => item.roleId),
    departments: departments.map(item => item.departmentId),
    mobile: mobile ? mobile : "",
    email: email ? email : "",
    position: attr === null ? "" : attr.attributeValue,
    staff_id: employ_num === null ? "" : employ_num.attributeValue,
    isActive: status === 1,
    isShowMobile: contactPrivacy.permissionType === 1 ? true : false,
    status,
    editable_user: res.payload,
    isEditing: true
  };
  dispatch(updateUserDetail(data));
  return res;
};
export const deleteUser = userKey => async (dispatch, getState) => {
  const { users } = getState().user;
  const res = await DeleteUser({ dispatch, userKey });
  if (res.success) {
    const new_list = users.filter(item => item.userKey != userKey);
    dispatch(updateUserDetail({ users: new_list }));
  }
  return res;
};

export const disableUser = userKey => async (dispatch, getState) => {
  const { users } = getState().user;
  const res = await DisableUser({ dispatch, userKey });
  if (res.success) {
    const new_list = users.map(item =>
      item.userKey != userKey
        ? item
        : { ...item, status: getCodeByStatus("Disabled", userStatus) }
    );
    dispatch(updateUserDetail({ users: new_list }));
  }
  return res;
};
export const suspendUser = userKey => async (dispatch, getState) => {
  const { users } = getState().user;
  const res = await SuspendUser({ dispatch, userKey });
  if (res.success) {
    const new_list = users.map(item =>
      item.userKey != userKey
        ? item
        : { ...item, status: getCodeByStatus("Suspended", userStatus) }
    );
    dispatch(updateUserDetail({ users: new_list }));
  }
  return res;
};
export const approveUser = userKey => async (dispatch, getState) => {
  const { users } = getState().user;
  const res = await ApproveUser({ dispatch, userKey });
  if (res.success) {
    const new_list = users.map(item =>
      item.userKey != userKey
        ? item
        : { ...item, status: getCodeByStatus("Authorised", userStatus) }
    );
    dispatch(updateUserDetail({ users: new_list }));
  }
  return res;
};
export const releaseUser = userKey => async (dispatch, getState) => {
  const { users } = getState().user;
  const res = await UnlockUser({ dispatch, userKey });
  if (res.success) {
    const new_list = users.map(item =>
      item.userKey != userKey
        ? item
        : { ...item, status: getCodeByStatus("Authorised", userStatus) }
    );
    dispatch(updateUserDetail({ users: new_list }));
  }
  return res;
};

export const postUser = () => async (dispatch, getState) => {
  const {
    editable_user,
    roles,
    departments,
    firstName,
    lastName,
    position,
    email,
    mobile,
    staff_id,
    isActive,
    isShowMobile,
    isEditing
  } = getState().user;
  dispatch(setLoading(true));

  let data = {
    firstName,
    lastName,
    email,
    mobile,
    isActive,
    roles,
    departments,
    attributes: [
      { attributeName: "Position", attributeValue: position },
      { attributeName: "EmployeeNum", attributeValue: staff_id }
    ],
    privacySetting: [
      {
        permissionType: isShowMobile ? 1 : 16384,
        privacyType: 200,
        referenceId: 0,
        referenceName: "Contact"
      }
    ]
  };
  if (isEditing) data = { ...data, userKey: editable_user.userKey };
  const res = await PostUser({ dispatch, data });
  dispatch(setLoading(false));
  return res;
};

export const checkValidation = () => (dispatch, getState) => {
  const {
    roles,
    departments,
    firstName,
    lastName,
    email,
    mobile,
    staff_id
  } = getState().user;

  let res_data = {
    success: true,
    data: {
      role_invalid: false,
      department_invalid: false,
      firstname_invalid: false,
      lastname_invalid: false,
      email_invalid: false,
      mobile_invalid: false,
      staff_invalid: false,
      err_msg: "",
      format_errors: []
    }
  };
  if (roles.length === 0)
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        role_invalid: true,
        err_msg: "*Please enter the required fields."
      }
    };
  if (departments.length === 0)
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        department_invalid: true,
        err_msg: "*Please enter the required fields."
      }
    };
  if (firstName === "")
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        firstname_invalid: true,
        err_msg: "*Please enter the required fields."
      }
    };
  if (lastName === "")
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        lastname_invalid: true,
        err_msg: "*Please enter the required fields."
      }
    };
  if (email === "")
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        email_invalid: true,
        err_msg: "*Please enter the required fields."
      }
    };
  if (email !== "" && !validateEmail(email))
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        email_invalid: true,
        format_errors: [
          ...res_data.data.format_errors,
          "*Email format is invalid."
        ]
      }
    };
  if (mobile === "")
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        mobile_invalid: true,
        err_msg: "*Please enter the required fields."
      }
    };
  if (mobile !== "" && !validatePhone(mobile))
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        mobile_invalid: true,
        format_errors: [
          ...res_data.data.format_errors,
          "*Mobile format is invalid."
        ]
      }
    };
  if (staff_id === "")
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        staff_invalid: true,
        err_msg: "*Please enter the required fields."
      }
    };
  else if (staff_id !== "" && !validateStaffID(staff_id))
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        staff_invalid: true,
        format_errors: [
          ...res_data.data.format_errors,
          "*Staff format is invalid."
        ]
      }
    };

  return res_data;
};
