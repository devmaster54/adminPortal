import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import { TowniIcons, UserPicture, TowniText } from "../../components";
import { NavItem, NavBar, NavContainer, NotificationModal } from "./components";
import { logout } from "../../redux/actions/auth";
import { GetProfile } from "../../apis/myInfo";
import {
  setIsNewNotify,
  getNotifications
} from "../../redux/actions/notification";
import { getSimplifiedDate, utc2local } from "../../services";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    GetProfile({ dispatch }).then(res => {
      if (!res.success) return;
      this.setState({
        name: res.payload.firstName.trim() + " " + res.payload.lastName.trim()
      });
    });
    dispatch(getNotifications());
  }
  onLogout = () => {
    const { dispatch, history } = this.props;
    dispatch(logout());
    history.push("/");
  };
  onNotify = () => {
    const { dispatch } = this.props;
    dispatch(setIsNewNotify(false));
  };
  render() {
    const {
      isMobileSize,
      handleSideMenuVisible,
      isNewNotify,
      notifications
    } = this.props;
    const { name } = this.state;
    return (
      <React.Fragment>
        <NavBar fixed={"top"} size="large">
          <NavContainer isMobileSize={isMobileSize}>
            {isMobileSize && (
              <Menu.Menu position="left">
                <NavItem onClick={() => handleSideMenuVisible(true)}>
                  <TowniIcons name="hamburger" />
                </NavItem>
              </Menu.Menu>
            )}
            <Menu.Menu position="right">
              <NavItem>
                <div className="backnodes">
                  <NotificationModal
                    dimmer="inverted"
                    trigger={
                      <TowniIcons
                        name="alert"
                        active={isNewNotify}
                        onClick={this.onNotify}
                        style={{ cursor: "pointer" }}
                      />
                    }
                  >
                    <NotificationModal.Header>
                      Notifications
                    </NotificationModal.Header>
                    <NotificationModal.Content>
                      {notifications.map((item, key) => (
                        <div key={key} className="item">
                          <TowniText
                            color="#4F4F4F"
                            fontSize={15}
                            fontWeight={500}
                            lineHeight={18}
                            style={{ marginBottom: 5 }}
                          >
                            {item.title}
                          </TowniText>
                          <TowniText
                            color="#4F4F4F"
                            fontSize={15}
                            fontWeight={400}
                            lineHeight={18}
                            style={{ marginBottom: 5 }}
                          >
                            {item.summary}
                          </TowniText>
                          <TowniText
                            color="#4F4F4F"
                            fontSize={15}
                            fontWeight={400}
                            lineHeight={18}
                          >
                            {getSimplifiedDate(utc2local(item.dateCreated))}
                          </TowniText>
                        </div>
                      ))}
                    </NotificationModal.Content>
                  </NotificationModal>
                </div>
              </NavItem>
              <NavItem>
                <Dropdown
                  icon={null}
                  trigger={name !== null && <UserPicture username={name} />}
                >
                  <Dropdown.Menu
                    style={{
                      marginTop: 10,
                      borderRadius: 4
                    }}
                  >
                    <Dropdown.Item text="Log out" onClick={this.onLogout} />
                  </Dropdown.Menu>
                </Dropdown>
              </NavItem>
            </Menu.Menu>
          </NavContainer>
        </NavBar>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  isMobileSize: PropTypes.bool.isRequired,
  handleSideMenuVisible: PropTypes.func.isRequired,
  isNewNotify: PropTypes.bool,
  notifications: PropTypes.array
};
function mapStateToProps(state) {
  const { isNewNotify, notifications } = state.notification;
  return {
    isNewNotify,
    notifications
  };
}
export default connect(mapStateToProps)(withRouter(Navbar));
