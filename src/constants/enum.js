export const articleStatus = [
  { code: 1, text: "Live" },
  { code: 2, text: "Draft" },
  { code: 3, text: "Archived" },
  { code: 4, text: "Rejected" }
];

export const userStatus = [
  { code: 1, text: "Authorised" },
  { code: 2, text: "Pending" },
  { code: 3, text: "Suspended" },
  { code: 4, text: "Disabled" },
  { code: 5, text: "Cancelled" }
];

export const ViewType = {
  listView: 1,
  moduleView: 2
};
export const loginType = {
  email: 1,
  phone: 2
};

export const alertLinkStatus = {
  none: 1,
  exist_broad: 2,
  exist_doc: 3,
  new_broad: 4
};

export const DocType = {
  Folder: 1,
  FeedbackFolder: 2,
  ArticleFolder: 3,
  PublicFolder: 4,
  MiscFolder: 10,

  // Common
  Pdf: 100,
  Txt: 120,

  Rtf: 121,
  Csv: 122,

  // Document
  Doc: 200,
  Docx: 201,
  Dot: 203,
  Dotx: 204,

  Xls: 220,
  Xlsx: 221,

  Ppt: 240,
  Pptx: 241,

  Odt: 260,

  Key: 281,

  // Image
  Png: 300,

  Jpg: 320,
  Jpeg: 321,

  Gif: 340,

  Bmp: 360,
  Tif: 361,
  Tiff: 362,
  Svg: 363,

  Psd: 380,

  // Audio
  Mp3: 400,
  M4A: 402,
  Ogg: 403,
  Wav: 404,

  // Video
  Mp4: 501,
  M4V: 502,
  Mpg: 510,
  Mpeg: 511,
  Avi: 520,
  Mov: 521,
  Wmv: 530,
  Wma: 531,
  Flv: 540,
  Ogv: 541
};

export const DocColor = {
  100: { text: "Pdf", color: "#FF2116" },

  120: { text: "Txt", color: "#E7E5E5" },

  121: { text: "Rtf", color: "#1297E0" },
  200: { text: "Doc", color: "#1297E0" },
  201: { text: "Docx", color: "#1297E0" },
  203: { text: "Dot", color: "#1297E0" },
  204: { text: "Dotx", color: "#1297E0" },

  122: { text: "Csv", color: "#7BC142" },
  220: { text: "Xls", color: "#7BC142" },
  221: { text: "Xlsx", color: "#7BC142" },

  240: { text: "Ppt", color: "#F6746B" },
  241: { text: "Pptx", color: "#F6746B" },

  260: { text: "Odt", color: "#81B4E2" },

  281: { text: "Key", color: "#104475" },

  300: { text: "Png", color: "#5B6080" },
  320: { text: "Jpg", color: "#5B6080" },
  321: { text: "Jpeg", color: "#5B6080" },
  340: { text: "Gif", color: "#5B6080" },
  360: { text: "Bmp", color: "#5B6080" },
  361: { text: "Tif", color: "#5B6080" },
  362: { text: "Tiff", color: "#5B6080" },
  363: { text: "Svg", color: "#5B6080" },
  380: { text: "Psd", color: "#5B6080" },

  400: { text: "Mp3", color: "#41B09C" },
  402: { text: "M4A", color: "#41B09C" },
  403: { text: "Ogg", color: "#41B09C" },
  404: { text: "Wav", color: "#41B09C" },

  501: { text: "Mp4", color: "#58857D" },
  502: { text: "M4V", color: "#58857D" },
  510: { text: "Mpg", color: "#58857D" },
  511: { text: "Mpeg", color: "#58857D" },
  520: { text: "Avi", color: "#58857D" },
  521: { text: "Mov", color: "#58857D" },
  530: { text: "Wmv", color: "#58857D" },
  531: { text: "Wma", color: "#58857D" },
  540: { text: "Flv", color: "#58857D" },
  541: { text: "Ogv", color: "#58857D" }
};

export const uploadFileType = {
  thumbnail: 1,
  hero: 2,
  attached: 3
};
