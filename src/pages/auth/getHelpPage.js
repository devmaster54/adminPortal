import React, { Component } from "react";
import { AuthLayout } from "../../layout";
import { Link } from "react-router-dom";
import { TowniIcons } from "../../components";
import routes from "../../constants/routes";

class GetHelpPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AuthLayout>
        <p className="black-title" style={{ marginBottom: 10 }}>
          Get Help
        </p>
        <p className="btn-text" style={{ marginBottom: 40 }}>
          Please phone the BMCC IT Department for further help in logging in
        </p>
        <div className="flex-inline-center" style={{ marginBottom: 45 }}>
          <TowniIcons name="phone" />
          <div>
            <p className="btn-text">(02) 9911 1111</p>
            <p className="btn-subtext">BMCC IT Department</p>
          </div>
        </div>
        <p className="btn-text">
          Click here to return to{" "}
          <Link className="login" to={routes.loginPage}>
            login
          </Link>
        </p>
      </AuthLayout>
    );
  }
}
export default GetHelpPage;
