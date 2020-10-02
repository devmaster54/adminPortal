import {
  UPDATE_DEPARTMENT_DETAIL,
  CLEAR_DEPARTMENT_DETAIL
} from "../actions/department";

const defaultState = {
  department_list: [],
  department_options: [],
  user_list: [],
  departmentName: "",
  departmentDesc: "",
  editable_department: null,
  isEditing: false
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_DEPARTMENT_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_DEPARTMENT_DETAIL:
      return { ...defaultState, department_list: state.department_list };
    default:
      return state;
  }
};
