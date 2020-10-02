import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthLayout } from "../../layout";
import { LoginWithPassCode, RequestPassCode } from "../../apis/Identity";
import { setToken } from "../../redux/actions/auth";
import routes from "../../constants/routes";
import { setLoading } from "../../redux/actions/global";

class PhoneCodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      err_msg: "",
      isSending: false
    };
  }
  onChangeInput = e => {
    this.setState({
      code: e.target.value
    });
  };
  componentDidMount() {
    const { email, phone, history } = this.props;
    this.inputRef.focus();
    if (email === "" || phone === "") {
      history.push(routes.loginPage);
    }
  }
  keyPress = e => {
    if (e.keyCode == 13) {
      this.onConfirm();
    }
  };
  onConfirm = () => {
    const { dispatch, history, email } = this.props;
    const { code, isSending } = this.state;
    if (isSending || code.length < 6) return;
    this.setState({ isSending: true });
    dispatch(setLoading(true));
    LoginWithPassCode(email, code).then(r => {
      dispatch(setLoading(false));
      console.log(r);
      this.setState({ isSending: false });
      if (!r.success) {
        this.setState({ err_msg: r.error });
        return;
      }
      if (!r.payload.isSuccess) {
        this.setState({ err_msg: "* The verification code is wrong!" });
        return;
      }
      dispatch(setToken(r.payload));
      history.push(routes.mainRoute);
    });
  };
  render() {
    const { phone } = this.props;
    const { code, err_msg } = this.state;
    return (
      <AuthLayout>
        <p className="description" style={{ marginBottom: 40 }}>
          Please enter the verification code sent to the mobile number {phone}
        </p>
        <p className="error-message" style={{ marginBottom: 10 }}>
          {err_msg}
        </p>
        <input
          type="text"
          ref={ref => (this.inputRef = ref)}
          onKeyDown={this.keyPress}
          style={{ marginBottom: 8 }}
          className="code-input"
          value={code}
          onChange={this.onChangeInput}
        />
        <p className="description" style={{ marginBottom: 100 }}>
          Verification Code
        </p>
        <button onClick={this.onConfirm} disabled={code.length < 6}>
          Confirm
        </button>
      </AuthLayout>
    );
  }
}
PhoneCodePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  email: PropTypes.string,
  phone: PropTypes.string
};

function mapStateToProps(state) {
  const { email, phone } = state.auth;
  return {
    email,
    phone
  };
}
export default connect(mapStateToProps)(PhoneCodePage);
