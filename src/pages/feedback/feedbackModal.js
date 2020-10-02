import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  TowniDialog,
  ModalClose,
  TowniIcons,
  TowniText,
  FeedbackCategory,
  FeedbackContent,
  FeedbackFileItem,
  FlexInline,
  SimpleButton
} from "../../components";
import { setLoading } from "../../redux/actions/global";
import { getFileIconByType, getShortString } from "../../services";
import { DownloadDocument } from "../../apis/document";

class FeedbackModal extends Component {
  constructor(props) {
    super(props);
  }
  onAttachment = async item => {
    const { dispatch } = this.props;
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
  render() {
    const { visible, onClose, feedback } = this.props;
    if (feedback === null) return <div></div>;
    return (
      <React.Fragment>
        <TowniDialog open={visible} onClose={onClose} style={{ maxWidth: 733 }}>
          <TowniDialog.Content>
            <ModalClose onClick={onClose}>
              <TowniIcons name="close" />
            </ModalClose>
            <TowniText
              color="#000000"
              fontSize={24}
              fontWeight={500}
              lineHeight={28}
              style={{ marginBottom: 30 }}
            >
              Feedback Detail
            </TowniText>
            <TowniText
              color="#4F4F4F"
              fontSize={14}
              fontWeight={500}
              lineHeight={16}
              style={{ marginBottom: 10 }}
            >
              Category
            </TowniText>
            <FeedbackCategory style={{ marginBottom: 30 }}>
              {feedback.categoryName}
            </FeedbackCategory>
            <TowniText
              color="#000000"
              fontSize={18}
              fontWeight={500}
              lineHeight={21}
              style={{ marginBottom: 14 }}
            >
              {feedback.subject}
            </TowniText>
            <FeedbackContent style={{ marginBottom: 20 }}>
              {feedback.message}
            </FeedbackContent>
            {feedback.documents.length > 0 && (
              <div style={{ marginBottom: 37 }}>
                <TowniText
                  color="#000000"
                  fontSize={18}
                  fontWeight={500}
                  lineHeight={21}
                  style={{ marginBottom: 12 }}
                >
                  Attached Files
                </TowniText>
                <FlexInline>
                  {feedback.documents.map((item, key) => (
                    <FeedbackFileItem
                      key={key}
                      style={{ marginRight: 10, marginTop: 5 }}
                      onClick={() => this.onAttachment(item)}
                    >
                      <TowniIcons name={getFileIconByType(item.documentType)} />
                      <TowniText
                        color="#000000"
                        fontSize={14}
                        fontWeight={500}
                        lineHeight={16}
                        style={{ marginLeft: 3 }}
                      >
                        {getShortString(item.documentName, 8)}
                      </TowniText>
                    </FeedbackFileItem>
                  ))}
                </FlexInline>
              </div>
            )}

            <FlexInline justify="flex-end">
              <SimpleButton
                style={{ width: 160, height: 50 }}
                onClick={onClose}
              >
                Close
              </SimpleButton>
            </FlexInline>
          </TowniDialog.Content>
        </TowniDialog>
      </React.Fragment>
    );
  }
}

FeedbackModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  feedback: PropTypes.object
};
function mapStateToProps(state) {
  const { selected_feedback } = state.feedback;
  return { feedback: selected_feedback };
}
export default connect(mapStateToProps)(FeedbackModal);
