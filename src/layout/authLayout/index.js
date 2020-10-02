import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthContainer, FormContainer } from "./components";
import { TowniIcons } from "../../components";

class AuthLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isMobileSize, children } = this.props;
    return (
      <AuthContainer>
        <FormContainer>
          <TowniIcons name="logo" style={{ marginBottom: 19 }} />
          {children}
        </FormContainer>
      </AuthContainer>
    );
  }
}

AuthLayout.propTypes = {
  isMobileSize: PropTypes.bool
};

function mapStateToProps(state) {
  const { isMobileSize } = state.global;
  return {
    isMobileSize
  };
}
export default connect(mapStateToProps)(AuthLayout);
