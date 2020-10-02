export const UPDATE_REPORT_DETAIL = "UPDATE_REPORT_DETAIL";
export const CLEAR_REPORT_DETAIL = "CLEAR_REPORT_DETAIL";

import {
  GetUserDevice,
  GetUserState,
  GetAlertArticle,
  GetLoginActivity,
  GetArticleActivity,
  GetDocumentActivity
} from "../../apis/report";

export const updateReportDetail = data => ({
  type: UPDATE_REPORT_DETAIL,
  data
});

export const clearReportDetail = () => ({
  type: CLEAR_REPORT_DETAIL
});

export const getReportData = () => (dispatch, getState) => {
  GetUserDevice({ dispatch }).then(res => {
    if (!res.success) return;
    dispatch(updateReportDetail({ user_device: res.payload }));
  });
  GetUserState({ dispatch }).then(res => {
    if (!res.success) return;
    dispatch(updateReportDetail({ user_state: res.payload }));
  });
  GetAlertArticle({ dispatch }).then(res => {
    if (!res.success) return;
    dispatch(updateReportDetail({ alert_article: res.payload }));
  });
  GetLoginActivity({ dispatch }).then(res => {
    if (!res.success) return;
    dispatch(updateReportDetail({ login_activity: res.payload }));
  });
  GetArticleActivity({ dispatch }).then(res => {
    if (!res.success) return;
    dispatch(updateReportDetail({ article_activity: res.payload }));
  });
  GetDocumentActivity({ dispatch }).then(res => {
    if (!res.success) return;
    dispatch(updateReportDetail({ document_activity: res.payload }));
  });
};
