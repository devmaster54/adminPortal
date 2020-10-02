import React, { Component } from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TowniIcons } from "../../components";
import { setVisibleSideMenu } from "../../redux/actions/global";
import Navbar from "../navbar";
import menuItems from "./menuItems";
import { getRolePermission } from "../../redux/actions/me";
import { setLoading } from "../../redux/actions/global";
import { get_tab_Permission } from "../../services/permission";
import {
  SideBarItem,
  SideBarText,
  PageContainer,
  PusherContainer,
  LogoContainer,
  SideBarContainer
} from "./components";

class DashLayout extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRolePermission());
  }
  handleSideMenuVisible = visible => {
    const { dispatch } = this.props;
    dispatch(setVisibleSideMenu(visible));
  };
  goTo = url => {
    const { history, dispatch } = this.props;
    dispatch(setVisibleSideMenu(false));
    history.push(url);
  };
  render() {
    const {
      isMobileSize,
      children,
      visibleSideMenu,
      location,
      rolePermission
    } = this.props;
    return (
      <React.Fragment>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation={isMobileSize ? "overlay" : "push"}
            direction="left"
            onHide={() => this.handleSideMenuVisible(false)}
            vertical
            visible={(visibleSideMenu && isMobileSize) || !isMobileSize}
          >
            <LogoContainer>
              <TowniIcons name="dash_logo" />
            </LogoContainer>
            <SideBarContainer>
              {rolePermission !== null &&
                menuItems.map(
                  (item, key) =>
                    get_tab_Permission(
                      item.tab,
                      rolePermission.functionName
                    ) && (
                      <SideBarItem
                        key={key}
                        active={location.pathname.includes(item.link)}
                        onClick={() => this.goTo(item.link)}
                      >
                        <TowniIcons
                          name={item.icon}
                          active={location.pathname.includes(item.link)}
                        />
                        <SideBarText
                          active={location.pathname.includes(item.link)}
                        >
                          {item.text}
                        </SideBarText>
                      </SideBarItem>
                    )
                )}
            </SideBarContainer>
          </Sidebar>
          <Sidebar.Pusher dimmed={isMobileSize && visibleSideMenu}>
            <PusherContainer isMobileSize={isMobileSize}>
              <Navbar
                isMobileSize={isMobileSize}
                handleSideMenuVisible={this.handleSideMenuVisible}
              />
              <PageContainer>
                {rolePermission !== null && children}
              </PageContainer>
            </PusherContainer>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}

DashLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobileSize: PropTypes.bool,
  visibleSideMenu: PropTypes.bool,
  rolePermission: PropTypes.object,
  location: PropTypes.object
};

function mapStateToProps(state) {
  const { isMobileSize, visibleSideMenu } = state.global;
  const { rolePermission } = state.me;
  return {
    isMobileSize,
    visibleSideMenu,
    rolePermission
  };
}
export default connect(mapStateToProps)(withRouter(DashLayout));
