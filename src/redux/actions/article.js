export const UPDATE_ARTICLE_DETAIL = "UPDATE_ARTICLE_DETAIL";
export const CLEAR_ARTICLE_DETAIL = "CLEAR_ARTICLE_DETAIL";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { alertLinkStatus } from "../../constants/enum";
import {
  PostArticle,
  GetArticleTypes,
  GetArticles,
  DeleteArticle,
  GetArticleDetail
} from "../../apis/article";
import { local2utc, utc2local } from "../../services";
import {
  getStandardDate,
  getDateString,
  getArticleTypeByID,
  getIDByArticleType
} from "../../services";
import { setLoading } from "../actions/global";

export const updateArticleDetail = data => ({
  type: UPDATE_ARTICLE_DETAIL,
  data
});

export const clearArticleDetail = () => ({
  type: CLEAR_ARTICLE_DETAIL
});

export const getArticleTypes = () => async (dispatch, getState) => {
  const res = await GetArticleTypes({ dispatch });
  if (!res.success) return;
  dispatch(updateArticleDetail({ article_types: res.payload }));
};
export const getArticles = () => async (dispatch, getState) => {
  const res = await GetArticles({ dispatch });
  if (!res.success) return;
  dispatch(updateArticleDetail({ articles: res.payload.articles }));
};

export const editArticle = id => async (dispatch, getState) => {
  const res = await GetArticleDetail({ dispatch, id });
  const { article_types } = getState().article;
  if (!res.success) return false;

  const {
    articleType,
    articleBody,
    articleSummary,
    articleHeadline,
    documentLinks,
    documentLinksDetail,
    heroImage,
    thumbnail,
    thumbnailName,
    heroImageName,
    isPin,
    isPublish,
    notifyUser,
    articleLinks,
    publishDate,
    articleDepartments,
    users
  } = res.payload;
  const receiver = users.length > 0 ? users[0] : articleDepartments[0];
  const blocksFromHtml = htmlToDraft(articleBody);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);
  let data = {
    articleType,
    articleHeadline,
    publishDate: getDateString(utc2local(publishDate)),
    selectedFile_list: [
      ...documentLinksDetail.map(item => ({
        documentName: item.title,
        documentKey: item.itemKey
      }))
    ],
    isPin,
    isPublish,
    notifyUser,
    articleSummary,
    articleBody: editorState,
    receiver,
    heroImage,
    thumbnail,
    thumbnailName,
    heroImageName,
    isEditing: true,
    editable_article: res.payload
  };
  if (getArticleTypeByID(articleType, article_types) === "Alert") {
    const alert_link_option =
      articleLinks.length > 0
        ? alertLinkStatus.exist_broad
        : documentLinks.length > 0
        ? alertLinkStatus.exist_doc
        : alertLinkStatus.none;
    data = {
      ...data,
      articleSummary: articleBody,
      alert_link_option,
      active_broadcast_item:
        alert_link_option === alertLinkStatus.exist_broad
          ? articleLinks[0]
          : null
    };
  }
  dispatch(updateArticleDetail(data));
  return res;
};
export const deleteArticle = id => async (dispatch, getState) => {
  const { articles } = getState().article;
  const res = await DeleteArticle({ dispatch, id });
  if (res.success) {
    const new_list = articles.filter(item => item.articleId != id);
    dispatch(updateArticleDetail({ articles: new_list }));
  }
  return res;
};
export const checkValidation = () => (dispatch, getState) => {
  const {
    articleType,
    receiver,
    articleHeadline,
    publishDate,
    articleBody,
    selectedFile_list,
    sub_headline,
    active_broadcast_item,
    alert_link_option,
    articleSummary,
    article_types
  } = getState().article;

  let res_data = {
    success: true,
    data: {
      type_invalid: false,
      date_invalid: false,
      headline_invalid: false,
      summary_invalid: false,
      sub_headline_invalid: false,
      body_invalid: false,
      receiver_invalid: false,
      err_msg: "*Please enter the required fields."
    }
  };
  if (articleType === null || publishDate === null || articleHeadline === "") {
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        type_invalid: articleType === null,
        date_invalid: publishDate === null,
        headline_invalid: articleHeadline === ""
      }
    };
  }
  if (
    receiver === "" &&
    getArticleTypeByID(articleType, article_types) !== "News"
  ) {
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        receiver_invalid: true
      }
    };
  }
  if (articleHeadline === "" || articleHeadline.length > 255) {
    res_data = {
      success: false,
      data: {
        ...res_data.data,
        headline_invalid: true
      }
    };
    if (articleHeadline.length > 255) {
      res_data = {
        success: false,
        data: {
          ...res_data.data,
          err_msg: "*Too many characters entered."
        }
      };
    }
  }
  const articleBodyHtml = draftToHtml(
    convertToRaw(articleBody.getCurrentContent())
  ).replace(/\r?\n|\r/, "");
  if (getArticleTypeByID(articleType, article_types) === "Alert") {
    if (articleSummary === "" || articleSummary.length > 255) {
      res_data = {
        success: false,
        data: {
          ...res_data.data,
          summary_invalid: true
        }
      };
      if (articleSummary.length > 255) {
        res_data = {
          success: false,
          data: {
            ...res_data.data,
            err_msg: "*Too many characters entered."
          }
        };
      }
    }

    if (
      alert_link_option === alertLinkStatus.exist_broad &&
      active_broadcast_item === null
    ) {
      res_data = {
        success: false,
        data: {
          ...res_data.data,
          alertLink_invalid: true
        }
      };
    }
    if (alert_link_option === alertLinkStatus.new_broad) {
      if (sub_headline === "" || articleBodyHtml === "<p></p>")
        res_data = {
          success: false,
          data: {
            ...res_data.data,
            sub_headline_invalid: sub_headline === "",
            body_invalid: articleBodyHtml === "<p></p>"
          }
        };
    }
  } else if (getArticleTypeByID(articleType, article_types) === "Broadcast") {
    if (articleBodyHtml === "<p></p>")
      res_data = {
        success: false,
        data: {
          ...res_data.data,
          body_invalid: true
        }
      };
  } else if (getArticleTypeByID(articleType, article_types) === "News") {
    if (articleSummary === "" || articleBodyHtml === "<p></p>")
      res_data = {
        success: false,
        data: {
          ...res_data.data,
          summary_invalid: articleSummary === "",
          body_invalid: articleBodyHtml === "<p></p>"
        }
      };
  }
  return res_data;
};

export const postAlert = () => async (dispatch, getState) => {
  const {
    articleType,
    articleHeadline,
    publishDate,
    receiver,
    isPin,
    isPublish,
    notifyUser,
    articleBody,
    selectedFile_list,
    sub_headline,
    active_broadcast_item,
    alert_link_option,
    articleSummary,
    attachFile_list,
    thumbnail,
    heroImage,
    thumbnailName,
    heroImageName,
    article_types,
    editable_article,
    isEditing
  } = getState().article;
  dispatch(setLoading(true));
  // const department = receivers.filter(item => typeof item === "number");
  // const receiver_users = receivers.filter(item => typeof item === "string");
  const department = typeof receiver === "number" ? [receiver] : [0];
  const receiver_users = typeof receiver === "string" ? [receiver] : [];
  let data = {
    articleType,
    articleHeadline,
    publishDate: getStandardDate(local2utc(publishDate)),
    articleDepartments: department,
    users: receiver_users,
    isPin,
    isPublish,
    notifyUser
  };
  if (isEditing) data = { ...data, articleId: editable_article.articleId };
  const articleBodyHtml = draftToHtml(
    convertToRaw(articleBody.getCurrentContent())
  ).replace(/\r?\n|\r/, "");
  if (getArticleTypeByID(articleType, article_types) === "Alert") {
    data = {
      ...data,
      articleSummary: articleHeadline,
      articleBody: articleSummary
    };
    if (alert_link_option === alertLinkStatus.exist_broad) {
      data = { ...data, articleLinks: [active_broadcast_item] };
    } else if (alert_link_option === alertLinkStatus.exist_doc) {
      const file_list = selectedFile_list.map(item => item.documentKey);
      data = { ...data, documentLinks: file_list };
    } else if (alert_link_option === alertLinkStatus.new_broad) {
      const file_list = [
        ...selectedFile_list.map(item => item.documentKey),
        ...attachFile_list.map(item => item.documentKey)
      ];
      const broad_data = {
        articleType: getIDByArticleType("Broadcast", article_types),
        articleHeadline: sub_headline,
        publishDate: getStandardDate(local2utc(publishDate)),
        articleBody: articleBodyHtml,
        articleSummary: articleHeadline,
        thumbnail: thumbnail,
        heroImage: heroImage,
        thumbnailName,
        heroImageName,
        documentLinks: file_list,
        isPin,
        isPublish,
        notifyUser
      };
      const res = await PostArticle({ dispatch, data: broad_data });
      if (res.success) {
        data = { ...data, articleLinks: [res.payload.articleKey] };
      }
    }
  } else if (getArticleTypeByID(articleType, article_types) === "Broadcast") {
    const file_list = [
      ...selectedFile_list.map(item => item.documentKey),
      ...attachFile_list.map(item => item.documentKey)
    ];
    data = {
      ...data,
      articleBody: articleBodyHtml,
      articleSummary: articleHeadline,
      thumbnail: thumbnail,
      heroImage: heroImage,
      thumbnailName,
      heroImageName,
      documentLinks: file_list
    };
  } else if (getArticleTypeByID(articleType, article_types) === "News") {
    data = {
      ...data,
      articleBody: articleBodyHtml,
      articleSummary,
      thumbnail: thumbnail,
      heroImage: heroImage,
      thumbnailName,
      heroImageName
    };
  }
  const res = await PostArticle({ dispatch, data });
  dispatch(getArticles());
  dispatch(setLoading(false));
  return res;
};
