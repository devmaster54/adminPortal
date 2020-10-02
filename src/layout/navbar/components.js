import { Menu, Modal } from "semantic-ui-react";
import styled from "styled-components";

export const NavItem = styled(Menu.Item)`
  .ui.menu &.item {
    border-left: none !important;
  }

  .ui.menu.vertical &.item {
    display: flex;
    align-items: center;
  }

  .ui.menu.vertical.sidebar_grey &.item {
    padding-bottom: 0;
    padding-top: 0;
  }

  .ui.menu &.item.mx-auto {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .ui.menu &.item:before {
    width: 0px;
  }
  .ui.menu &.item > img:not(.ui) {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
  }
`;

export const NavBar = styled(Menu)`
  border-bottom: none;
  height: 80px;
  border: none;
  &.ui.menu {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
    border: none;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  justify-content: space-between;
  width: ${props => (props.isMobileSize ? "100vw" : "calc(100vw - 350px)")};
`;

export const NotificationModal = styled(Modal)`
  &.ui.modal {
    background: #ffffff;
    border-radius: 5px;
    max-width: 400px;
    position: fixed;
    top: 93px;
    right: 100px;
    padding: 10px;
  }
  &.ui.modal .header {
    padding: 5px;
    font-size: 18px;
  }
  &.ui.modal .content {
    padding: 5px;
    height: 400px;
    overflow-y: auto;
  }
  &.ui.modal .content .item {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
  }
`;
