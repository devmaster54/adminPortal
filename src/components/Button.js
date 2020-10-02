import styled from "styled-components";
import { Checkbox } from "semantic-ui-react";

export const SimpleButton = styled.div`
  background: ${({ disabled }) => (disabled ? "#bfbfbf" : "#005595")};
  border-radius: 4px;
  font-family: Roboto;
  /* padding: 15px 40px; */
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  width: fit-content;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  height: 40px;
  padding-left: 40px;
  padding-right: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    background: ${({ disabled }) => (disabled ? "#bfbfbf" : "#096eba")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

export const GreenButton = styled.div`
  background: ${({ disabled }) => (disabled ? "#bfbfbf" : "#5AD146")};
  border-radius: 4px;
  font-family: Roboto;
  /* padding: 15px 40px; */
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  width: fit-content;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  height: 40px;
  padding-left: 40px;
  padding-right: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    background: ${({ disabled }) => (disabled ? "#bfbfbf" : "#75E363")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

export const WhiteButton = styled.div`
  background: #ffffff;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  border: 1px solid #000000;
  color: #313445;
  height: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    background: #eeeeee;
    cursor: pointer;
  }
`;

export const TowniCheckBox = styled(Checkbox)`
  &.ui.radio.checkbox input:checked ~ .box:after,
  &.ui.radio.checkbox input:checked ~ label:after {
    background: #828282;
  }
  &.ui.checkbox label {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #828282;
  }
`;
