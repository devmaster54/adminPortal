import React from "react";
import styled from "styled-components";
import { articleStatus, userStatus } from "../constants/enum";
import { getStatudByCode } from "../services";

export const PageTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  line-height: 40px;
  color: #4f4f4f;
  margin-bottom: 15px;
`;

const status_colors = {
  Draft: { color: "#F2C94C", upper: false },
  Archived: { color: "#F6746B", upper: false },
  Live: { color: "#6FCF97", upper: true },
  Rejected: { color: "rgba(0, 0, 0, 0.38)", upper: true },
  Pending: { color: "#F2C94C", upper: true },
  Authorised: { color: "#6FCF97", upper: true },
  Disabled: { color: "rgba(0, 0, 0, 0.38)", upper: true },
  Suspended: { color: "#E06E12", upper: true }
};

const StatusText = styled.div`
  background: ${props => status_colors[props.status].color};
  font-family: Roboto;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  padding: 5px 15px;
  min-width: 100px;
  width: max-content;
  margin: 0 auto;
  border-radius: 31px;
  text-transform: ${props =>
    status_colors[props.status].upper ? "uppercase" : "none"};
`;

export const ArticleStatus = ({ status }) => (
  <StatusText status={getStatudByCode(status, articleStatus)}>
    {getStatudByCode(status, articleStatus)}
  </StatusText>
);
export const UserStatus = ({ status }) => (
  <StatusText status={getStatudByCode(status, userStatus)}>
    {getStatudByCode(status, userStatus)}
  </StatusText>
);

export const TowniText = styled.div`
  font-family: Roboto;
  font-style: normal;
  word-break: break-word;
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize}px;
  line-height: ${props => props.lineHeight}px;
  color: ${props => props.color};
`;
TowniText.defaultProps = {
  color: "#000000",
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 400
};
