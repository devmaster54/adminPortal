import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TowniText, FlexInline } from "../../components";
import { getTimeDifference, getShortString } from "../../services";
import { DashboardSection, ArticleActivity, TextButton } from "./components";
import { FileIcon } from "../documentCentre/components";
import { setLoading } from "../../redux/actions/global";
import { DownloadDocument } from "../../apis/document";
const RecentFileUpload = ({ data, dispatch }) => {
  const onView = async item => {
    dispatch(setLoading(true));
    const res = await DownloadDocument({ dispatch, key: item.documentKey });
    dispatch(setLoading(false));
    res.blob().then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = item.documentName;
      a.click();
    });
  };
  return (
    <DashboardSection className="recentFiles">
      <TowniText
        color="#4F4F4F"
        fontSize={24}
        fontWeight={500}
        lineHeight={28}
        style={{ marginBottom: 30 }}
      >
        Recent File Uploads
      </TowniText>

      <div className="sub-section">
        {data.map((item, key) => (
          <ArticleActivity key={key}>
            <div>
              <FlexInline style={{ marginBottom: 10 }}>
                <FileIcon
                  style={{ marginRight: 10 }}
                  size="small"
                  docType={item.documentType}
                />
                <TowniText
                  color="#4F4F4F"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={19}
                  style={{ marginRight: 10 }}
                >
                  {getShortString(item.documentName, 20)}
                </TowniText>
              </FlexInline>
              <TowniText
                color="#828282"
                fontSize={14}
                fontWeight={400}
                lineHeight={16}
              >
                Uploaded to {item.parentFolder}
              </TowniText>
            </div>
            <div style={{ textAlign: "right" }}>
              <TowniText
                color="#828282"
                fontSize={14}
                fontWeight={400}
                lineHeight={16}
                style={{ marginBottom: 10 }}
              >
                {getTimeDifference(item.dateModified)}h ago
              </TowniText>
              <TextButton onClick={() => onView(item)}>View</TextButton>
            </div>
          </ArticleActivity>
        ))}
      </div>
    </DashboardSection>
  );
};
RecentFileUpload.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.array
};
function mapStateToProps(state) {
  const { document_activity } = state.report;
  return {
    data: document_activity
  };
}
export default connect(mapStateToProps)(RecentFileUpload);
