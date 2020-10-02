import styled from "styled-components";
import { Menu, Segment } from "semantic-ui-react";
import React from "react";
import PropTypes from "prop-types";
import { FlexInline } from "../../components";

export const SideBarText = styled.p`
  & {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: ${props => (props.active ? "#5AD146" : "#FFFFFF")};
    margin-left: 30px;
  }
`;
export const LogoContainer = styled.div`
  & {
    display: flex;
    justify-content: center;
    margin-top: 67px;
    margin-bottom: 50px;
  }
`;
export const SideBarContainer = styled.div`
  & {
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

const SideItem = styled(Menu.Item)`
  .ui.menu &.item {
    margin: 0px;
    padding: 20px 0 20px 40px;
    background: transparent;
    position: relative;
    border: transparent;
  }

  .ui.menu &.item:hover,
  .ui.menu &.item.active-item {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  .ui.menu &.item.active-item:after {
    display: block !important;
    position: absolute;
    background: #5ad146 !important;
    content: "";
    width: 5px;
    height: 100%;
    right: 0px;
    top: 0;
  }
`;

export const SideBarItem = ({ active, children, ...other }) => (
  <SideItem className={active ? "active-item" : ""} {...other}>
    <FlexInline>{children}</FlexInline>
  </SideItem>
);
SideBarItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node
};

export const PusherContainer = styled.div`
  border: none;
  height: 100vh;
  padding-top: 80px;
  margin-right: ${props => (props.isMobileSize ? "0px" : "350px")};
  overflow-y: auto;
`;
export const PageContainer = styled.div`
  padding: 30px;
  min-height: 100%;
  background: #fbfbfb;
`;
