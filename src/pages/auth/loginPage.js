import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-google";
import { CONFIG } from "../../config";
import { AuthLayout } from "../../layout";
import { RequestPassCode, AlternativeComm } from "../../apis/Identity";
import { setEmail, setPhone } from "../../redux/actions/auth";
import routes from "../../constants/routes";
import { loginType } from "../../constants/enum";
import { setLoading } from "../../redux/actions/global";
import { validateEmail } from "../../services";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      remember_me: false,
      err_msg: "",
      recaptcha: false,
      isSending: false
    };
  }
  componentDidMount() {
    loadReCaptcha();
    this.inputRef.focus();
    if (this.captchaRef) {
      console.log("started, just a second...");
      this.captchaRef.reset();
      this.captchaRef.execute();
    }
  }
  keyPress = e => {
    if (e.keyCode == 13) {
      this.onSendCode();
    }
  };
  onChangeInput = e => {
    this.setState({
      email: e.target.value
    });
  };
  verifyCallback = recaptchaToken => {
    this.setState({ recaptcha: true });
  };
  onLoadRecaptcha = () => {
    if (this.captchaRef) {
      this.captchaRef.reset();
      this.captchaRef.execute();
    }
  };
  onCheckBox = e => {
    this.setState({
      remember_me: e.target.checked
    });
  };
  onSendCode = () => {
    const { dispatch, history } = this.props;
    const { email, isSending, recaptcha } = this.state;
    //if (isSending || email === "" || !recaptcha) return;
    if (isSending || email === "") return;
    this.setState({ isSending: true });
    dispatch(setLoading(true));
    RequestPassCode(email, loginType.email).then(async r => {
      dispatch(setLoading(false));
      this.setState({ isSending: false });
      if (!r.success) {
        this.setState({ err_msg: r.error });
        return;
      }
      console.log(r);
      // if (!r.payload.success) {
      //   this.setState({ err_msg: "* This email doesn't exist!" });
      //   return;
      // }
      const res = await AlternativeComm(email);
      console.log(res);
      if (!res.success) return;
      dispatch(setEmail(email));
      dispatch(
        setPhone(res.payload.length > 0 ? res.payload[0].displayName : "")
      );

      history.push(routes.mailCode);
    });
  };
  render() {
    const { email, remember_me, err_msg } = this.state;
    return (
      <AuthLayout>
        <p className="grey-title">Sign in</p>
        <p className="description" style={{ marginBottom: 20 }}>
          Please enter the email address you registered with and we will send
          you a verification code to login.
        </p>
        <p className="error-message" style={{ marginBottom: 10 }}>
          {err_msg}
        </p>
        <p className="input-text" style={{ marginBottom: 10 }}>
          Email Address
        </p>
        <input
          type="text"
          ref={ref => (this.inputRef = ref)}
          onKeyDown={this.keyPress}
          style={{ marginBottom: 40 }}
          value={email}
          onChange={this.onChangeInput}
        />
        <div className="flex-inline-center" style={{ marginBottom: 30 }}>
          <input
            type="checkbox"
            id="check_remember"
            checked={remember_me}
            onChange={this.onCheckBox}
          />
          <label htmlFor="check_remember">
            <p className="input-text" style={{ marginLeft: 10 }}>
              Remember me for 30 days
            </p>
          </label>
        </div>
        {/* <div style={{ marginBottom: 30 }}>
          <ReCaptcha
            ref={el => {
              this.captchaRef = el;
            }}
            size="invisible"
            render="explicit"
            data-theme="dark"
            sitekey={CONFIG.recaptcha_key}
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
          />
        </div> */}
        <button onClick={this.onSendCode} disabled={!validateEmail(email)}>
          Send Code
        </button>
      </AuthLayout>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object
};
export default connect()(LoginPage);
