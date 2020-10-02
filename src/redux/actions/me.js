export const UPDATE_ME_DETAIL = "UPDATE_ME_DETAIL";
export const CLEAR_ME_DETAIL = "CLEAR_ME_DETAIL";

import { GetRolePermission } from "../../apis/user";

export const updateMeDetail = data => ({
  type: UPDATE_ME_DETAIL,
  data
});

export const clearMeDetail = () => ({
  type: CLEAR_ME_DETAIL
});

export const getRolePermission = () => async (dispatch, getState) => {
  const res = await GetRolePermission({ dispatch });
  if (!res.success) return Promise.reject();
  dispatch(updateMeDetail({ rolePermission: res.payload[0] }));
  return Promise.resolve();
};
