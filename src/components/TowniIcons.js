import React from "react";
import PropTypes from "prop-types";

import IconLogo from "../assets/icons/logo.png";
import IconCode from "../assets/icons/code.png";
import IconBack from "../assets/icons/back.png";
import IconHelp from "../assets/icons/help.png";
import IconPhone from "../assets/icons/phone.png";
import IconAlert from "../assets/icons/alert.png";
import IconAlertActive from "../assets/icons/alert_active.png";
import IconHamburger from "../assets/icons/hamburger.png";
import IconEdit from "../assets/icons/edit.png";
import IconEditGrey from "../assets/icons/edit_grey.png";
import IconDelete from "../assets/icons/delete.png";
import IconDeleteWhite from "../assets/icons/delete_white.png";
import IconLock from "../assets/icons/lock.png";
import IconLockGrey from "../assets/icons/lock_grey.png";
import IconLockWhite from "../assets/icons/lock_white.png";
import IconUnLockWhite from "../assets/icons/unlock_white.png";
import IconKey from "../assets/icons/key.png";
import IconKeyWhite from "../assets/icons/key_white.png";
import IconView from "../assets/icons/view.png";
import IconCheck from "../assets/icons/check.png";
import IconUserAdd from "../assets/icons/user_add.png";
import IconUserDelete from "../assets/icons/user_delete.png";
import IconFolder from "../assets/icons/folder.png";
import IconClose from "../assets/icons/close.png";
import IconSuccess from "../assets/icons/success.png";
import IconImgFile from "../assets/icons/img_file.png";
import IconPdfFile from "../assets/icons/pdf_file.png";
import IconListView from "../assets/icons/list_view.png";
import IconListViewActive from "../assets/icons/list_view_active.png";
import IconModuleView from "../assets/icons/module_view.png";
import IconModuleViewActive from "../assets/icons/module_view_active.png";
import IconFolderSmall from "../assets/icons/folder_small.png";
import IconFolderLarge from "../assets/icons/folder_large.png";

import IconDashLogo from "../assets/icons/sidebar/logo.png";
import IconDashDashboard from "../assets/icons/sidebar/dashboard.png";
import IconDashDashboard_Green from "../assets/icons/sidebar/dashboard_green.png";
import IconDashNews from "../assets/icons/sidebar/news.png";
import IconDashNews_Green from "../assets/icons/sidebar/news_green.png";
import IconDashDocument from "../assets/icons/sidebar/document.png";
import IconDashDocument_Green from "../assets/icons/sidebar/document_green.png";
import IconDashSurvey from "../assets/icons/sidebar/survey.png";
import IconDashSurvey_Green from "../assets/icons/sidebar/survey_green.png";
import IconDashFeedback from "../assets/icons/sidebar/feedback.png";
import IconDashFeedback_Green from "../assets/icons/sidebar/feedback_green.png";
import IconDashUser from "../assets/icons/sidebar/user.png";
import IconDashUser_Green from "../assets/icons/sidebar/user_green.png";
import IconDashGroup from "../assets/icons/sidebar/group.png";
import IconDashGroup_Green from "../assets/icons/sidebar/group_green.png";
import IconDashSetting from "../assets/icons/sidebar/settings.png";
import IconDashSetting_Green from "../assets/icons/sidebar/settings_green.png";

import IconDashCard_Article from "../assets/icons/dashboard/article.png";
import IconDashCard_Document from "../assets/icons/dashboard/document.png";
import IconDashCard_Feedback from "../assets/icons/dashboard/feedback.png";
import IconDashCard_User from "../assets/icons/dashboard/user.png";
import IconDashCard_Group from "../assets/icons/dashboard/group.png";

const TowniIcon = ({ name, active, ...other }) => {
  var Icon = null;

  switch (name) {
    case "logo":
      Icon = IconLogo;
      break;
    case "code":
      Icon = IconCode;
      break;
    case "back":
      Icon = IconBack;
      break;
    case "help":
      Icon = IconHelp;
      break;
    case "phone":
      Icon = IconPhone;
      break;
    case "alert":
      Icon = IconAlert;
      if (active) Icon = IconAlertActive;
      break;
    case "hamburger":
      Icon = IconHamburger;
      break;
    case "edit":
      Icon = IconEdit;
      break;
    case "edit_grey":
      Icon = IconEditGrey;
      break;
    case "check":
      Icon = IconCheck;
      break;
    case "user_add":
      Icon = IconUserAdd;
      break;
    case "user_delete":
      Icon = IconUserDelete;
      break;
    case "folder":
      Icon = IconFolder;
      break;
    case "close":
      Icon = IconClose;
      break;
    case "success":
      Icon = IconSuccess;
      break;
    case "delete":
      Icon = IconDelete;
      break;
    case "delete_white":
      Icon = IconDeleteWhite;
      break;
    case "lock":
      Icon = IconLock;
      break;
    case "lock_grey":
      Icon = IconLockGrey;
      break;
    case "lock_white":
      Icon = IconLockWhite;
      break;
    case "unlock_white":
      Icon = IconUnLockWhite;
      break;
    case "key":
      Icon = IconKey;
      break;
    case "key_white":
      Icon = IconKeyWhite;
      break;
    case "view":
      Icon = IconView;
      break;
    case "img_file":
      Icon = IconImgFile;
      break;
    case "pdf_file":
      Icon = IconPdfFile;
      break;
    case "dash_logo":
      Icon = IconDashLogo;
      break;
    case "folder_small":
      Icon = IconFolderSmall;
      break;
    case "folder_large":
      Icon = IconFolderLarge;
      break;
    case "list_view":
      Icon = IconListView;
      if (active) Icon = IconListViewActive;
      break;
    case "module_view":
      Icon = IconModuleView;
      if (active) Icon = IconModuleViewActive;
      break;
    case "dash_dash":
      Icon = IconDashDashboard;
      if (active) Icon = IconDashDashboard_Green;
      break;
    case "dash_news":
      Icon = IconDashNews;
      if (active) Icon = IconDashNews_Green;
      break;
    case "dash_document":
      Icon = IconDashDocument;
      if (active) Icon = IconDashDocument_Green;
      break;
    case "dash_survey":
      Icon = IconDashSurvey;
      if (active) Icon = IconDashSurvey_Green;
      break;
    case "dash_feedback":
      Icon = IconDashFeedback;
      if (active) Icon = IconDashFeedback_Green;
      break;
    case "dash_user":
      Icon = IconDashUser;
      if (active) Icon = IconDashUser_Green;
      break;
    case "dash_group":
      Icon = IconDashGroup;
      if (active) Icon = IconDashGroup_Green;
      break;
    case "dash_setting":
      Icon = IconDashSetting;
      if (active) Icon = IconDashSetting_Green;
      break;

    case "dash_card_article":
      Icon = IconDashCard_Article;
      break;
    case "dash_card_document":
      Icon = IconDashCard_Document;
      break;
    case "dash_card_feedback":
      Icon = IconDashCard_Feedback;
      break;
    case "dash_card_user":
      Icon = IconDashCard_User;
      break;
    case "dash_card_group":
      Icon = IconDashCard_Group;
      break;
    default:
      return <div {...other} />;
  }

  return <img src={Icon} {...other} />;
};

TowniIcon.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default TowniIcon;
