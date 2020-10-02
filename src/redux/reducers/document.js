import {
  UPDATE_DOCUMENT_DETAIL,
  CLEAR_DOCUMENT_DETAIL
} from "../actions/document";

const defaultState = {
  ///////////////////////
  curParentDocId: null,
  curDocList: [],
  document_list: [],
  documentArticle_list: []
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_DOCUMENT_DETAIL:
      return { ...state, ...action.data };
    case CLEAR_DOCUMENT_DETAIL:
      return {
        ...defaultState
      };
    default:
      return state;
  }
};
