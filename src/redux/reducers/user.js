import { UPDATE_USER_DETAIL, CLEAR_USER_DETAIL } from "../actions/user";

const defaultState = {
  ///////////////////////
  roles: [],
  departments: [],
  firstName: "",
  lastName: "",
  status: 0,
  position: "",
  email: "",
  mobile: "",
  staff_id: "",
  isActive: false,
  isShowMobile: false,
  isEditing: false,
  editable_user: null,
  users: [],
  roleOptions: [],
  rolePermission: []
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_USER_DETAIL:
      return {
        ...defaultState,
        users: state.users,
        roleOptions: state.roleOptions
      };
    default:
      return state;
  }
};
