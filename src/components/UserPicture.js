import React from "react";
import PropTypes from "prop-types";
import { getColorFromString } from "../services";

const getInitial = str => {
  let arr = str.toUpperCase().split(" ");
  return arr.length >= 2 ? arr[0][0] + arr[1][0] : arr[0][0] + arr[0][1];
};

const UserPicture = ({ src = null, username = null, size = 50 }) => {
  const nameInitial = getInitial(username);
  return src ? (
    <div
      style={{
        backgroundColor: "#C6CDDB",
        backgroundImage: `url(${
          userPicture.indexOf("http") === 0
            ? `${userPicture}`
            : `https://${userPicture}`
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: size,
        height: size,
        borderRadius: size / 2
      }}
    />
  ) : (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: getColorFromString(username),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: size / 2,
          fontFamily: "Roboto",
          color: "white",
          textAlign: "center"
        }}
      >
        {nameInitial}
      </div>
    </div>
  );
};

UserPicture.propTypes = {
  src: PropTypes.string,
  username: PropTypes.string
};

export default UserPicture;
