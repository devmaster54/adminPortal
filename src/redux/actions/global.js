export const SET_IS_MOBILE_SIZE = "SET_IS_MOBILE_SIZE";
export const SET_VISIBLE_SIDE_MENU = "SET_VISIBLE_SIDE_MENU";
export const SET_LOADING = "SET_LOADING";

export const setIsMobileSize = flag => ({
  type: SET_IS_MOBILE_SIZE,
  isMobileSize: flag
});

export const setLoading = flag => ({
  type: SET_LOADING,
  isLoading: flag
});

export const setVisibleSideMenu = flag => ({
  type: SET_VISIBLE_SIDE_MENU,
  visibleSideMenu: flag
});
