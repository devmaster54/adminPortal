import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthLayout } from "../../layout";
import { TowniIcons } from "../../components";
import { RequestPassCode } from "../../apis/Identity";
import { loginType } from "../../constants/enum";
import routes from "../../constants/routes";
import { setLoading } from "../../redux/actions/global";

class TwoStepPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSending: false
    };
  }
  componentDidMount() {
    const { email, phone, history } = this.props;
    if (email === "" || phone === "") {
      history.push(routes.loginPage);
      return;
    }
  }
  goTo = url => {
    const { history } = this.props;
    history.push(url);
  };
  onConfirm = () => {};
  onSendPhoneCode = () => {
    const { history, email, dispatch } = this.props;
    const { isSending } = this.state;
    if (isSending) return;
    this.setState({ isSending: true });
    dispatch(setLoading(true));
    RequestPassCode(email, loginType.phone).then(r => {
      this.setState({ isSending: false });
      dispatch(setLoading(false));
      console.log(r);
      if (!r.success) {
        history.push(routes.loginPage);
        return;
      }
      history.push(routes.phoneCode);
    });
  };
  render() {
    const { phone } = this.props;
    return (
      <AuthLayout>
        <p className="black-title" style={{ marginBottom: 20 }}>
          2-Step Verification
        </p>
        <p style={{ marginBottom: 20, marginLeft: -10 }}>
          Please select one of the following options to sign in
        </p>
        <div
          className="flex-btn-div grey-border"
          onClick={this.onSendPhoneCode}
        >
          <TowniIcons name="code" />
          <div>
            <p className="btn-text">Get a verification code sent to {phone}</p>
            <p className="btn-subtext">Standard rates apply</p>
          </div>
        </div>
        <div
          className="flex-btn-div grey-border"
          onClick={() => this.goTo(routes.helpPage)}
        >
          <TowniIcons name="help" />
          <div>
            <p className="btn-text">Get Help</p>
          </div>
        </div>
        <div
          className="flex-btn-div"
          style={{ marginBottom: 15 }}
          onClick={() => this.goTo(routes.loginPage)}
        >
          <TowniIcons name="back" />
          <div>
            <p className="btn-text">Back to Login</p>
          </div>
        </div>
        <button onClick={this.onConfirm}>Confirm</button>
      </AuthLayout>
    );
  }
}
TwoStepPage.propTypes = {
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
export default connect(mapStateToProps)(TwoStepPage);
