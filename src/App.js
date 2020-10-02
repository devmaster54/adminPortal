import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import { Responsive } from "semantic-ui-react";
import "babel-polyfill";
import { setIsMobileSize } from "./redux/actions/global";
import { InitFirebase } from "./redux/actions/notification";
import { isIOS, isMacOs, isSafari } from "react-device-detect";
import { MainRoute } from "./routes";
import { Loading } from "./components";

let DevTools;
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  DevTools = require("./services/DevTools").default;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }
  updateWidth = () => {
    const isSSR = typeof window === "undefined";
    const width = isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
    const { dispatch } = this.props;
    if (width < Responsive.onlyTablet.minWidth) dispatch(setIsMobileSize(true));
    else dispatch(setIsMobileSize(false));
  };
  componentDidMount() {
    const { dispatch } = this.props;
    window.addEventListener("resize", this.updateWidth);
    this.updateWidth();
    this.setState({ isMounted: true });
    if (!isSafari && !isIOS && !isMacOs) {
      dispatch(InitFirebase());
    }
  }
  render() {
    const { isMounted } = this.state;
    const { isLoading } = this.props;
    return (
      <React.Fragment>
        {isMounted &&
          !window.devToolsExtension &&
          process.env.NODE_ENV === "development" && <DevTools />}
        <HashRouter>
          <Route path="/" component={MainRoute} />
        </HashRouter>
        {isLoading && <Loading />}
      </React.Fragment>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func
};
function mapStateToProps(state) {
  const { isLoading } = state.global;
  return {
    isLoading
  };
}
export default connect(mapStateToProps)(App);
