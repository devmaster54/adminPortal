import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DashLayout } from "../../layout";
import { PageContainer, FlexInline } from "../../components";
import { getReportData } from "../../redux/actions/report";
import { get_tab_Permission } from "../../services/permission";
import { tabs } from "../../constants/permission";
import cardItems from "./cardItems";
import ActiveUsers from "./activeUsers";
import Devices from "./devices";
import Authroised from "./Authorised";
import CurrentAlert from "./currentAlert";
import RecentActivity from "./RecentActivity";
import RecentFileUpload from "./RecentFileUpload";
import DashCard from "./dashCard";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getReportData());
  }
  render() {
    const { rolePermission } = this.props;
    return (
      <DashLayout>
        <PageContainer>
          {rolePermission !== null &&
            get_tab_Permission(tabs.dashboard, rolePermission.functionName) && (
              <React.Fragment>
                <FlexInline>
                  <ActiveUsers />
                  <Devices />
                  <Authroised />
                </FlexInline>
                <FlexInline style={{ marginTop: 60 }}>
                  <CurrentAlert />
                  <RecentActivity />
                  <RecentFileUpload />
                </FlexInline>
              </React.Fragment>
            )}
          {rolePermission !== null &&
            !get_tab_Permission(
              tabs.dashboard,
              rolePermission.functionName
            ) && (
              <FlexInline>
                {cardItems.map(
                  (item, key) =>
                    get_tab_Permission(
                      item.tab,
                      rolePermission.functionName
                    ) && <DashCard key={key} data={item} />
                )}
              </FlexInline>
            )}
        </PageContainer>
      </DashLayout>
    );
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  rolePermission: PropTypes.object
};
function mapStateToProps(state) {
  const {} = state.report;
  const { rolePermission } = state.me;
  return { rolePermission };
}
export default connect(mapStateToProps)(DashboardPage);
