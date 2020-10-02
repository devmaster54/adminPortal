import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TowniText, GreenButton, FlexInline } from "../../components";
import routes from "../../constants/routes";
import { getDocViewDate } from "../../services";
import { DashboardSection, AlertPart } from "./components";
import img_alert from "../../assets/images/alert.png";
const CurrentAlert = ({ data, history }) => {
  const onUpdateAlert = () => {
    history.push(routes.article);
  };
  return (
    <DashboardSection className="currentAlert">
      <TowniText
        color="#4F4F4F"
        fontSize={24}
        fontWeight={500}
        lineHeight={28}
        style={{ marginBottom: 30 }}
      >
        Current Alert
      </TowniText>

      <div className="sub-section">
        <TowniText
          color="#4F4F4F"
          fontSize={18}
          fontWeight={500}
          lineHeight={21}
          style={{ marginBottom: 20 }}
        >
          Current Alert
        </TowniText>

        <AlertPart style={{ marginBottom: 20 }}>
          <img src={img_alert} style={{ marginRight: 20 }} />
          {data !== null && (
            <div>
              <div className="title">{data.articleHeadline}</div>
              <div className="content">{data.articleSummary}</div>
            </div>
          )}
        </AlertPart>
        <FlexInline style={{ marginBottom: 20 }}>
          <TowniText
            color="#828282"
            fontSize={18}
            fontWeight={500}
            lineHeight={21}
            style={{ marginRight: 10 }}
          >
            Date Posted:
          </TowniText>
          {data !== null && (
            <TowniText
              color="#000000"
              fontSize={18}
              fontWeight={500}
              lineHeight={21}
            >
              {getDocViewDate(data.publishDate)}
            </TowniText>
          )}
        </FlexInline>
        <FlexInline justify="flex-end">
          <GreenButton onClick={onUpdateAlert}>Update Alert</GreenButton>
        </FlexInline>
      </div>
    </DashboardSection>
  );
};
CurrentAlert.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object
};
function mapStateToProps(state) {
  const { alert_article } = state.report;
  return {
    data: alert_article
  };
}
export default connect(mapStateToProps)(withRouter(CurrentAlert));
