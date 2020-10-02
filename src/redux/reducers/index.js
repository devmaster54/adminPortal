import { combineReducers } from "redux";
import auth from "./auth";
import global from "./global";
import user from "./user";
import department from "./department";
import feedback from "./feedback";
import article from "./article";
import document from "./document";
import report from "./report";
import notification from "./notification";
import me from "./me";

const appReducer = combineReducers({
  auth,
  global,
  user,
  department,
  feedback,
  article,
  document,
  report,
  notification,
  me
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state.user = undefined;
    state.article = undefined;
    state.document = undefined;
    state.auth = undefined;
    state.department = undefined;
    state.feedback = undefined;
    state.report = undefined;
    state.notification = undefined;
    state.me = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
