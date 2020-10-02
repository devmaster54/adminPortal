export const tabs = {
  user: 1,
  group: 2,
  settings: 3,
  dashboard: 4,
  article: 5,
  document: 6,
  survey: 7,
  feedback: 8
};
export const userType = {
  system_admin: "System Admin",
  org_admin: "Organisation Admin",
  content_admin: "Content Admin",
  content_editor: "Content Editor"
};
export const tab_permission = {
  SuperAdmin: [
    tabs.user,
    tabs.group,
    tabs.settings,
    tabs.dashboard,
    tabs.article,
    tabs.document,
    tabs.survey,
    tabs.feedback
  ],
  "System Admin": [
    tabs.user,
    tabs.group,
    tabs.settings,
    tabs.dashboard,
    tabs.article,
    tabs.document,
    tabs.survey,
    tabs.feedback
  ],
  OrgAdmin: [
    tabs.user,
    tabs.group,
    tabs.settings,
    tabs.dashboard,
    tabs.article,
    tabs.document,
    tabs.survey,
    tabs.feedback
  ],
  "Content Admin": [tabs.article, tabs.document, tabs.survey],
  "Content Editor": [tabs.article, tabs.document, tabs.survey]
};

export const tasks = {
  setting_create: 0,
  setting_delete: 1,
  setting_special: 2,
  article_delete: 3,
  article_special: 4,
  survey_delete: 5,
  survey_special: 6
};
export const task_permission = {
  SuperAdmin: [
    tasks.setting_create,
    tasks.setting_delete,
    tasks.setting_special,
    tasks.article_delete,
    tasks.article_special,
    tasks.survey_delete,
    tasks.survey_special
  ],
  "System Admin": [
    tasks.setting_create,
    tasks.setting_delete,
    tasks.setting_special,
    tasks.article_delete,
    tasks.article_special,
    tasks.survey_delete,
    tasks.survey_special
  ],
  OrgAdmin: [
    tasks.article_delete,
    tasks.article_special,
    tasks.survey_delete,
    tasks.survey_special
  ],
  "Content Admin": [
    tasks.article_delete,
    tasks.article_special,
    tasks.survey_delete,
    tasks.survey_special
  ],
  "Content Editor": []
};
