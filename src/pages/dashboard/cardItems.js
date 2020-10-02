import routes from "../../constants/routes";
import { tabs } from "../../constants/permission";
import CardBack_Article from "../../assets/icons/dash_back/article.png";
import CardBack_Document from "../../assets/icons/dash_back/document.png";
import CardBack_Feedback from "../../assets/icons/dash_back/feedback.png";
import CardBack_User from "../../assets/icons/dash_back/user.png";
import CardBack_Group from "../../assets/icons/dash_back/group.png";
export default [
  {
    icon: "dash_card_article",
    back_img: CardBack_Article,
    text: "News & Alerts",
    sub_text: "Check the latest content updates",
    link: routes.article,
    back_color: "#E06E12",
    tab: tabs.article
  },
  {
    icon: "dash_card_document",
    back_img: CardBack_Document,
    text: "Document Centre",
    sub_text: "Upload and manage files",
    link: routes.document,
    back_color: "#1297E0",
    tab: tabs.document
  },
  {
    icon: "dash_card_feedback",
    back_img: CardBack_Feedback,
    text: "Feedback",
    sub_text: "Check the user reviews",
    link: routes.feedback,
    back_color: "#419833",
    tab: tabs.feedback
  },
  {
    icon: "dash_card_user",
    back_img: CardBack_User,
    text: "User Management",
    sub_text: "Check the user reviews",
    link: routes.user,
    back_color: "#8C4CBE",
    tab: tabs.user
  },
  {
    icon: "dash_card_group",
    back_img: CardBack_Group,
    text: "Group Management",
    sub_text: "Check the user reviews",
    link: routes.department,
    back_color: "#A72020",
    tab: tabs.group
  }
];
