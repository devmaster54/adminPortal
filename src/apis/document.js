import { FETCH } from "../mocks";
import { store } from "../services";

export const UploadImage = async ({ dispatch, file }) => {
  const { token } = store.getState().auth;
  var formData = new FormData();
  formData.append("file", file);
  const r = await FETCH("POST /admin/DocumentManagement/Public", {
    token,
    dispatch,
    body: formData
  });
  return r;
};

export const UploadAttachedFile = async ({ dispatch, file, folderKey }) => {
  const { token } = store.getState().auth;
  var formData = new FormData();
  formData.append("file", file);
  // formData.append("folderKey", folderKey);
  const res = await FETCH("POST /admin/DocumentManagement/Article", {
    token,
    dispatch,
    body: formData,
    params: {
      folderKey: folderKey
    }
  });
  return res;
};

export const GetDocumentList = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("GET /admin/DocumentManagement/List", {
    token,
    dispatch
  });
  return res;
};

export const GetDocumentListById = async ({ dispatch, docId }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/DocumentManagement/${docId}/List`, {
    token,
    dispatch
  });
  return res;
};

export const GetAllDocuments = async ({ dispatch, docId }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/DocumentManagement/List/All`, {
    token,
    dispatch
  });
  return res;
};

export const GetDocumentArticle = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("GET /admin/DocumentManagement/Article", {
    token,
    dispatch
  });
  return res;
};

export const GetDocumentArticleById = async ({ dispatch, docId }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/DocumentManagement/${docId}/Article`, {
    token,
    dispatch
  });
  return res;
};

export const GetAllDocumentArticles = async ({ dispatch, docId }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/DocumentManagement/Article/All`, {
    token,
    dispatch
  });
  return res;
};

export const GetDocumentDetailList = async ({ dispatch }) => {
  const { token } = store.getState().auth;
  const res = await FETCH("GET /admin/DocumentManagement/DetailList", {
    token,
    dispatch
  });
  return res;
};

export const GetDocumentDetailListById = async ({ dispatch, docId }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/DocumentManagement/${docId}/DetailList`, {
    token,
    dispatch
  });
  return res;
};

export const GetFolderTree = async ({ dispatch, docId }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /admin/DocumentManagement/${docId}/FolderTree`, {
    token,
    dispatch
  });
  return res;
};

export const DownloadDocument = async ({ dispatch, key }) => {
  const { token } = store.getState().auth;
  const res = await FETCH(`GET /document/${key}`, {
    token,
    dispatch,
    isFile: true
  });
  return res;
};
