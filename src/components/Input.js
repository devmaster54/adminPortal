import styled from "styled-components";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown, Icon, Input, TextArea } from "semantic-ui-react";
import { TowniIcons } from ".";

export const TowniDropdown = styled(Dropdown)`
  &.ui.selection.dropdown {
    border: 1px solid
      ${props => (props.invalid === "true" ? "#ff0000" : "#bdbdbd")};
    box-sizing: border-box;
    border-radius: 5px;
    /* width: 80px; */
    min-width: unset;
    /* padding: 17px; */
    /* display: flex; */
    align-items: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #828282;
  }
`;
TowniDropdown.defaultProps = {
  invalid: "false"
};

export const TowniInput = styled(Input)`
  &.ui.input {
    border: 1px solid
      ${props => (props.invalid === "true" ? "#ff0000" : "#bdbdbd")};
    box-sizing: border-box;
    border-radius: 5px;
    height: 40px;
  }
  &.ui.input input {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #828282;
    border: none;
    padding-right: 23px !important;
  }
`;
TowniInput.defaultProps = {
  invalid: "false"
};
export const TowniTextArea = styled(TextArea)`
  border: 1px solid
    ${props => (props.invalid === "true" ? "#ff0000" : "#bdbdbd")};
  box-sizing: border-box;
  border-radius: 5px;
  min-height: 70px;
  padding: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #828282;
  width: 100%;
  resize: none;
  outline: none;
`;
TowniTextArea.defaultProps = {
  invalid: "false"
};

export class SearchInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClear, onChange, value, style } = this.props;
    return (
      <TowniInput
        icon
        placeholder="Search..."
        iconPosition="left"
        onChange={onChange}
        value={value}
        style={style}
      >
        <input />
        <Icon name="search" />
        <TowniIcons
          name="close"
          style={{ position: "absolute", right: 8, top: 11, cursor: "pointer" }}
          onClick={onClear}
        />
      </TowniInput>
    );
  }
}
