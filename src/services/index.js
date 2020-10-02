export { default as history } from "./history";
export { default as DevTools } from "./DevTools";
export { storeData, getData, removeData } from "./localstore";
export { default as store } from "./store";
export { registerServiceWorker } from "./serviceWorker";
export {
  getColorFromString,
  getAttrValueFromUser,
  getSimplifiedDate,
  getMobileDate,
  compareDate,
  compareString,
  getShortString,
  getStandardDate,
  getDocViewDate,
  getTimeDifference,
  getDateString,
  getArticleTypeByID,
  getIDByArticleType,
  getRoleNameByID,
  getDepartmentNameByID,
  getStatudByCode,
  getCodeByStatus,
  getCroppedImageFile,
  getDataURLfromImg,
  getFileIconByType,
  local2utc,
  utc2local
} from "./utils";

export { validateEmail } from "./validate";
