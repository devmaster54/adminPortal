import { alertLinkStatus } from "../../constants/enum";
import { EditorState } from "draft-js";
import {
  UPDATE_ARTICLE_DETAIL,
  CLEAR_ARTICLE_DETAIL
} from "../actions/article";

const defaultState = {
  ///////////////////////
  articleType: null,
  articleHeadline: "",
  publishDate: null,
  receiver: "",
  isPin: false,
  isPublish: true,
  notifyUser: true,
  //////////////////////
  articleBody: EditorState.createEmpty(),
  selectedFile_list: [],
  sub_headline: "",
  active_broadcast_item: null,
  alert_link_option: alertLinkStatus.none,
  ///////////////////////////
  articleSummary: "",
  attachFile_list: [],
  thumbnail: null,
  thumbnailName: "",
  heroImage: null,
  heroImageName: "",
  //////////////////////////////
  editable_article: null,
  isEditing: false,
  openModal: false,
  articleID: null,
  articles: [],
  article_types: [],
  document_list: [],
  documentArticle_list: []
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_ARTICLE_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_ARTICLE_DETAIL:
      return {
        ...defaultState,
        publishDate: new Date(),
        articles: state.articles,
        article_types: state.article_types
      };
    default:
      return state;
  }
};
