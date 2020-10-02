import styled from "styled-components";
import { Table } from "semantic-ui-react";

const TowniTable = styled(Table)`
  &.ui.table {
    border: none;
  }
  &.ui.table.center {
    text-align: center;
  }
  &.ui.table thead tr {
    border-radius: 4px;
    background: #5b6080;
  }
  &.ui.table thead th {
    background: #5b6080;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    padding: 10px;
  }
  &.ui.table thead th.center {
    text-align: center;
  }
  &.ui.table tbody tr {
    border-radius: 4px;
    background: #ffffff;
  }
  &.ui.table tbody tr td {
    border: none;
  }
  &.ui.table tbody tr:nth-of-type(even) {
    background: #f5f6fb;
  }
  &.ui.table tbody td {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    padding: 15px;
  }
  &.ui.table tbody td img {
    margin: 0 5px;
    cursor: pointer;
  }
  &.ui.table tbody tr td:first-child {
    /* font-size: 18px; */
    /* line-height: 21px; */
    /* padding: 5px; */
  }
  &.ui.table tbody tr td.center {
    text-align: center;
  }
  &.ui.table tbody tr td.date-cell {
    padding: 0 35px;
  }
  &.ui.table tbody tr td .date-cell {
    padding: 0 30px;
  }
  &.ui.table tbody tr td.type-cell {
    width: 120px;
  }
  &.ui.table tbody tr td.user-cell {
    width: 120px;
  }
  &.ui.table tbody tr td.receiver-cell {
    width: 100px;
  }
`;

export default TowniTable;
