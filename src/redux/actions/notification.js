import firebase from "firebase/app";
import "firebase/messaging";

import { SendTokenToServer, GetNotifications } from "../../apis/notification";
import { storeData, getData } from "../../services";

export const UPDATE_NOTIFICATION_DETAIL = "UPDATE_NOTIFICATION_DETAIL";
export const CLEAR_NOTIFICATION_DETAIL = "CLEAR_NOTIFICATION_DETAIL";

export const updateNotificationDetail = data => ({
  type: UPDATE_NOTIFICATION_DETAIL,
  data
});

export const clearNotificationDetail = () => ({
  type: CLEAR_NOTIFICATION_DETAIL
});

export const setIsNewNotify = flag => (dispatch, getState) => {
  dispatch(updateNotificationDetail({ isNewNotify: flag }));
  storeData("isNewNotify", flag);
};
export const getNotifications = () => async (dispatch, getState) => {
  const res = await GetNotifications({ dispatch });
  if (!res.success) return;
  dispatch(updateNotificationDetail({ notifications: res.payload }));
};

const sendTokenToServer = async (currentToken, dispatch) => {
  const res = await SendTokenToServer({ dispatch, Token: currentToken });
  return;
  if (!isTokenSentToServer()) {
    console.log("Sending token to server...");
    // TODO(developer): Send the current token to your server.
    const res = await SendTokenToServer({ dispatch, Token: currentToken });
    console.log(res);
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so won't send it again " +
        "unless it changes"
    );
  }
};

function isTokenSentToServer() {
  return getData("sentToServer") === "1";
}

function setTokenSentToServer(sent) {
  storeData("sentToServer", sent ? "1" : "0");
}

export const InitFirebase = () => (dispatch, getState) => {
  var firebaseConfig = {
    apiKey: "AIzaSyAVRxgxEVn_ZBb1ILmIwgDS81S99P2g5YI",
    authDomain: "lbh-towni.firebaseapp.com",
    databaseURL: "https://lbh-towni.firebaseio.com",
    projectId: "lbh-towni",
    storageBucket: "lbh-towni.appspot.com",
    messagingSenderId: "509473643878",
    appId: "1:509473643878:web:cf255e60602277ea1a3ca7",
    measurementId: "G-V71SQPNWKL"
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BHBIEi-woqnva0MDDEPqIlcINdvGWde1FaFVG4CUBiHVFsNOCmGGM5UlLyxAlJoD7GGug2jvIpKzq_-B7IC3JZA"
  );
  messaging
    .getToken()
    .then(currentToken => {
      if (currentToken) {
        sendTokenToServer(currentToken, dispatch);
        console.log(currentToken);
      } else {
        console.log(
          "No Instance ID token available. Request permission to generate one."
        );
        setTokenSentToServer(false);
      }
    })
    .catch(err => {
      console.log("An error occurred while retrieving token. ", err);
      setTokenSentToServer(false);
    });
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        console.log("Token refreshed.");
        // Indicate that the new Instance ID token has not yet been sent to the app server.
        setTokenSentToServer(false);
        sendTokenToServer(refreshedToken, dispatch);
      })
      .catch(err => {
        console.log("Unable to retrieve refreshed token ", err);
      });
  });
  messaging.onMessage(payload => {
    console.log("Message received. ", payload);
    const { notifications } = getState().notification;
    dispatch(
      updateNotificationDetail({
        notifications: [...notifications, payload.data]
      })
    );
    dispatch(setIsNewNotify(true));
  });
};
