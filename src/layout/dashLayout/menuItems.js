import routes from "../../constants/routes";
import { tabs } from "../../constants/permission";

export default [
  {
    icon: "dash_dash",
    text: "Dashboard",
    link: routes.dashboard,
    tab: tabs.dashboard
  },
  {
    icon: "dash_news",
    text: "News & Alerts",
    link: routes.article,
    tab: tabs.article
  },
  {
    icon: "dash_document",
    text: "Document Centre",
    link: routes.document,
    tab: tabs.document
  },
  {
    icon: "dash_feedback",
    text: "Feedback",
    link: routes.feedback,
    tab: tabs.feedback
  },
  {
    icon: "dash_user",
    text: "User Management",
    link: routes.user,
    tab: tabs.user
  },
  {
    icon: "dash_group",
    text: "Group Management",
    link: routes.department,
    tab: tabs.group
  },
  {
    icon: "dash_setting",
    text: "Settings",
    link: routes.setting,
    tab: tabs.settings
  }
];
