import styled from "styled-components";
import React from "react";
import DatePicker from "react-date-picker";

const NewDatePicker = styled(DatePicker)`
  &.react-date-picker {
  }
  &.react-date-picker span .react-date-picker__calendar {
    z-index: 100;
  }
  & .react-date-picker__wrapper {
    border: 1px solid ${props => (props.invalid ? "#ff0000" : "#bdbdbd")};
    box-sizing: border-box;
    border-radius: 5px;
    height: 40px;
    padding-left: 10px;
  }
  & .react-date-picker__inputGroup__input {
    outline: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #828282;
  }
  & .react-date-picker__inputGroup__input:invalid {
    background: unset;
  }
  & .react-date-picker__button {
    outline: none;
  }
  & svg {
    stroke: #828282;
  }
`;
const DTPicker = ({ onChange, value, invalid, ...other }) => (
  <NewDatePicker
    onChange={onChange}
    value={value}
    invalid={invalid}
    {...other}
  />
);
DTPicker.defaultProps = {
  invalid: false
};
export default DTPicker;
