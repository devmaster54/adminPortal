import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../layout";
import { LoginWithPassCode, RequestPassCode } from "../../apis/Identity";
import { setToken, logout } from "../../redux/actions/auth";
import routes from "../../constants/routes";
import { loginType } from "../../constants/enum";
import { setLoading } from "../../redux/actions/global";

class MailCodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      err_msg: "",
      resent: false
    };
  }
  componentDidMount() {
    const { email, history } = this.props;
    this.inputRef.focus();
    if (email === "") {
      history.push(routes.loginPage);
    }
  }
  keyPress = e => {
    if (e.keyCode == 13) {
      this.onConfirm();
    }
  };
  onChangeInput = e => {
    this.setState({
      code: e.target.value
    });
  };
  onConfirm = () => {
    const { dispatch, history, email } = this.props;
    const { code, isSending } = this.state;
    if (isSending || code.length < 6) return;
    this.setState({ isSending: true });
    dispatch(setLoading(true));
    LoginWithPassCode(email, code).then(r => {
      this.setState({ isSending: false });
      dispatch(setLoading(false));
      if (!r.success) {
        this.setState({ err_msg: r.error });
        return;
      }
      if (!r.payload.isSuccess) {
        // this.setState({ err_msg: "* The verification code is wrong!" });
        dispatch(logout());
        history.push(routes.loginPage);
        return;
      }
      dispatch(setToken(r.payload));
      history.push(routes.mainRoute);
    });
  };
  onResend = async () => {
    const { email, dispatch } = this.props;
    dispatch(setLoading(true));
    await RequestPassCode(email, loginType.email);
    dispatch(setLoading(false));
    this.setState({ resent: true });
  };
  render() {
    const { email } = this.props;
    const { code, err_msg, resent } = this.state;
    return (
      <AuthLayout>
        <p className="description" style={{ marginBottom: 40 }}>
          A verification code has been sent to your email{resent && " " + email}
          . Please enter your code below.
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
        <p className="description" style={{ marginBottom: 23 }}>
          Verification Code
        </p>
        <a onClick={this.onResend}>Resend Code</a>
        {resent && (
          <div>
            <p className="description">or</p>
            <Link to={routes.twoStep}>Try alternate method</Link>
          </div>
        )}

        <button
          onClick={this.onConfirm}
          style={{ marginTop: 50 }}
          disabled={code.length < 6}
        >
          Confirm
        </button>
      </AuthLayout>
    );
  }
}
MailCodePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  email: PropTypes.string
};

function mapStateToProps(state) {
  const { email } = state.auth;
  return {
    email
  };
}
export default connect(mapStateToProps)(MailCodePage);
