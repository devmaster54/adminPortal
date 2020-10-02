export const UPDATE_DOCUMENT_DETAIL = "UPDATE_DOCUMENT_DETAIL";
export const CLEAR_DOCUMENT_DETAIL = "CLEAR_DOCUMENT_DETAIL";

import {
  GetAllDocuments,
  GetAllDocumentArticles,
  GetDocumentList,
  GetDocumentDetailList,
  GetDocumentDetailListById
} from "../../apis/document";

export const updateDocumentDetail = data => ({
  type: UPDATE_DOCUMENT_DETAIL,
  data
});

export const clearDocumentDetail = () => ({
  type: CLEAR_DOCUMENT_DETAIL
});

export const getAllDocuments = () => async (dispatch, getState) => {
  const res = await GetAllDocuments({ dispatch });
  if (!res.success) return;
  dispatch(updateDocumentDetail({ document_list: res.payload }));
};
export const getAllDocumentArticles = () => async (dispatch, getState) => {
  const res = await GetAllDocumentArticles({ dispatch });
  if (!res.success) return;
  dispatch(updateDocumentDetail({ documentArticle_list: res.payload }));
};

export const getDocumentList = () => async (dispatch, getState) => {
  const { curParentDocId } = getState().document;
  let res;
  if (curParentDocId === null) res = await GetDocumentDetailList({ dispatch });
  else
    res = await GetDocumentDetailListById({ dispatch, docId: curParentDocId });
  console.log(res);
  if (!res.success) return;
  dispatch(updateDocumentDetail({ curDocList: res.payload }));
};
