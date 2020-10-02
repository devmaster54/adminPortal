import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TowniText, FlexInline } from "../../components";
import { getDocViewDate } from "../../services";
import { DashboardSection, ArticleActivity, TextButton } from "./components";
import { updateArticleDetail } from "../../redux/actions/article";
import routes from "../../constants/routes";

const RecentActivity = ({ data, history, dispatch }) => {
  console.log("---activity---", data);
  const onView = item => {
    dispatch(
      updateArticleDetail({ openModal: true, articleID: item.articleId })
    );
    history.push(routes.article);
  };
  return (
    <DashboardSection className="recentActivity">
      <TowniText
        color="#4F4F4F"
        fontSize={24}
        fontWeight={500}
        lineHeight={28}
        style={{ marginBottom: 30 }}
      >
        Recent Activities
      </TowniText>

      <div className="sub-section">
        {data.map((item, key) => (
          <ArticleActivity key={key}>
            <div>
              <FlexInline>
                <TowniText
                  color="#4F4F4F"
                  fontSize={14}
                  fontWeight={500}
                  lineHeight={16}
                  style={{ marginRight: 10, marginBottom: 10 }}
                >
                  {item.fullName}
                </TowniText>
                <TowniText
                  color="#4F4F4F"
                  fontSize={14}
                  fontWeight={400}
                  lineHeight={16}
                  style={{ marginBottom: 10 }}
                >
                  {item.articleHeadline}
                </TowniText>
              </FlexInline>
              <TowniText
                color="#4F4F4F"
                fontSize={12}
                fontWeight={400}
                lineHeight={14}
              >
                {getDocViewDate(item.dateCreated)}
              </TowniText>
            </div>
            <TextButton onClick={() => onView(item)}>View</TextButton>
          </ArticleActivity>
        ))}
      </div>
    </DashboardSection>
  );
};
RecentActivity.propTypes = {
  data: PropTypes.array,
  history: PropTypes.object,
  dispatch: PropTypes.func
};
function mapStateToProps(state) {
  const { article_activity } = state.report;
  return {
    data: article_activity
  };
}
export default connect(mapStateToProps)(withRouter(RecentActivity));
