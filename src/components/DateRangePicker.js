import styled from "styled-components";
import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const NewDateRangePicker = styled(DateRangePicker)`
  & .react-daterange-picker__wrapper {
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 5px;
    height: 40px;
    padding-left: 5px;
    margin-right: ${props => props.right}px;
    margin-top: ${props => props.top}px;
  }
  & .react-daterange-picker__inputGroup input {
    outline: none;
  }
  & .react-daterange-picker__inputGroup__input:invalid {
    background: unset;
  }
  & .react-daterange-picker__button {
    outline: none;
  }
  & svg {
    stroke: #828282;
  }
`;
const DRPicker = ({ onChange, value, right = 0, top = 0 }) => (
  <NewDateRangePicker
    onChange={onChange}
    format="yyyy/MM/dd"
    value={value}
    right={right}
    top={top}
  />
);

export default DRPicker;
