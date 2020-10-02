import styled from "styled-components";
import { Pagination } from "semantic-ui-react";

const TowniPagination = styled(Pagination)`
  &.ui.pagination.menu {
    border: none;
    box-shadow: none;
  }
  &.ui.pagination.menu .active.item {
    outline: none;
    background: #005595;
    border-radius: 5px;
    color: #ffffff;
    padding: 0;
  }
  &.ui.menu .item:before {
    display: none;
  }
  &.ui.pagination.menu .item[type="ellipsisItem"] {
    outline: 0;
  }
  &.ui.pagination.menu .item[type="nextItem"],
  &.ui.pagination.menu .item[type="prevItem"],
  &.ui.pagination.menu .item[type="firstItem"],
  &.ui.pagination.menu .item[type="lastItem"] {
    background: #ffffff;
    border: 1px solid #cfd1e5;
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;
  }
  &.ui.pagination.menu .item {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #828282;
    border: none;
    padding: 0;
    width: 40px;
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
  }
  &.ui.pagination.menu .item:hover,
  &.ui.pagination.menu .item[type="nextItem"]:hover,
  &.ui.pagination.menu .item[type="prevItem"]:hover,
  &.ui.pagination.menu .item[type="firstItem"]:hover,
  &.ui.pagination.menu .item[type="lastItem"]:hover {
    background: #097fd8;
    color: white;
    border-radius: 5px;
    border: none;
  }
`;

export default TowniPagination;
