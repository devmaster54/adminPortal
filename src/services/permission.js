import {
  tabs,
  userType,
  tab_permission,
  tasks,
  task_permission
} from "../constants/permission";

export const get_tab_Permission = (tab, user) => {
  return tab_permission[user].includes(tab);
};
export const get_task_Permission = (task, user) => {
  return task_permission[user].includes(task);
};
