import React, { Component } from "react";

import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
import { PrivateRoute } from "../components";
import {
  LoginPage,
  TwoStepPage,
  MailCodePage,
  PhoneCodePage,
  GetHelpPage,
  DashboardPage,
  ArticlePage,
  DocumentCentrePage,
  FeedbackPage,
  UserManagementPage,
  DepartmentManagementPage,
  SettingsPage
} from "../pages";
import routes from "../constants/routes";

class MainRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute path={routes.authRoute}>
            <Switch>
              <Route path={routes.loginPage} component={LoginPage} exact />
              <Route path={routes.mailCode} component={MailCodePage} exact />
              <Route path={routes.twoStep} component={TwoStepPage} exact />
              <Route path={routes.phoneCode} component={PhoneCodePage} exact />
              <Route path={routes.helpPage} component={GetHelpPage} exact />
              <Redirect to={{ pathname: routes.loginPage }} />
            </Switch>
          </PrivateRoute>
          <PrivateRoute path={routes.mainRoute}>
            <Switch>
              <Route path={routes.dashboard} component={DashboardPage} exact />
              <Route path={routes.article} component={ArticlePage} exact />
              <Route
                path={routes.document}
                component={DocumentCentrePage}
                exact
              />
              <Route
                path={routes.documentId}
                component={DocumentCentrePage}
                exact
              />
              <Route path={routes.feedback} component={FeedbackPage} exact />
              <Route path={routes.user} component={UserManagementPage} exact />
              <Route
                path={routes.department}
                component={DepartmentManagementPage}
                exact
              />
              <Route path={routes.setting} component={SettingsPage} exact />
              <Redirect to={{ pathname: routes.dashboard }} />
            </Switch>
          </PrivateRoute>
          <Redirect to={{ pathname: routes.authRoute }} />
        </Switch>
      </React.Fragment>
    );
  }
}
MainRoute.propTypes = {};

export default MainRoute;
