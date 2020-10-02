import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";
import { DocType } from "../constants/enum";


export const getAttrValueFromUser = (data, attr) => {
  if (data.attr1 == attr) return data.attr1Val;
  else if (data.attr2 == attr) return data.attr2Val;
  else if (data.attr3 == attr) return data.attr3Val;
  else if (data.attributeName == attr) return data.attributeValue;
  else return null;
};

export const getSimplifiedDate = date => {
  const dateTime = dayjs(date).format("YYYY/MM/DD hh:mm A");
  return dateTime.toString();
};
export const getDocViewDate = date => {
  const dateTime = dayjs(date).format("MMM DD, YYYY");
  return dateTime.toString();
};
export const getTimeDifference = date => {
  const dateTime = dayjs(date);
  const now = dayjs();
  var duration = now.diff(dateTime, "hour");
  return duration.toString();
};
export const utc2local = date => {
  dayjs.extend(dayjsPluginUTC);
  const utcDate = dayjs.utc(date);
  return utcDate.local().format();
};
export const local2utc = date => {
  dayjs.extend(dayjsPluginUTC);
  const localDate = dayjs(date);
  return localDate.utc().format();
};
export const getStandardDate = date => {
  const dateTime = dayjs(date).format("YYYY-MM-DDTHH:mm:ss[Z]");
  return dateTime.toString();
};
export const getMobileDate = date => {
  const dateTime = dayjs(date).format("dddd, MMMM DD");
  return dateTime.toString();
};
export const getDateString = date => {
  const dateTime = new Date(date);
  return dateTime;
};

export const compareDate = (date1, date2) => {
  if (dayjs(date1).isAfter(dayjs(date2))) return -1;
  else if (dayjs(date1).isBefore(dayjs(date2))) return 1;
  else return 0;
};

export const compareString = (str1, str2) => {
  return str1.localeCompare(str2);
};

export const getShortString = (str, len) => {
  let res = str;
  if (str.length > len - 3) {
    res = str.slice(0, len) + "...";
  }
  return res;
};

export const getArticleTypeByID = (id, article_types) => {
  let res = article_types.find(item => item.typeId === id);
  if (res === undefined) return null;
  return res.typeValue;
};

export const getIDByArticleType = (type, article_types) => {
  let res = article_types.find(item => item.typeValue === type);
  return res.typeId;
};

export const getRoleNameByID = (id, roleOptions) => {
  let res = roleOptions.find(item => item.roleId === id);
  return res.roleName;
};
export const getDepartmentNameByID = (id, department_list) => {
  let res = department_list.find(item => item.departmentId === id);
  return res ? res.departmentName : "";
};
export const getStatudByCode = (code, data) => {
  let res = data.find(item => item.code === code);
  return res.text;
};
export const getCodeByStatus = (status, data) => {
  let res = data.find(item => item.text === status);
  return res.code;
};
export const getCroppedImageFile = (image, crop, fileName) => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        console.error("Canvas is empty");
        return;
      }
      blob.name = fileName;
      blob.lastModifiedDate = new Date();
      const file = new File([blob], fileName);
      resolve(file);
    }, "image/jpeg");
  });
};

export const getDataURLfromImg = src => {
  var img = new Image();
  var c = document.createElement("canvas");
  var ctx = c.getContext("2d");
  img.crossOrigin = "anonymous";
  img.src = src;
  return new Promise(resolve => {
    img.onload = function() {
      c.width = this.naturalWidth;
      c.height = this.naturalHeight;
      ctx.drawImage(this, 0, 0);
      const data = c.toDataURL();
      resolve(data);
    };
  });
};

export const getFileIconByType = type => {
  if (type >= DocType.Png && type <= DocType.Psd) return "img_file";
  else if (type === 100) return "pdf_file";
  else return "";
};
