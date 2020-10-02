import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import {
  TowniText,
  TowniTextArea,
  FlexInline,
  RichEditor,
  ModalTextButton,
  ModalTextButtonSeperator
} from "../../../components";
import MobilePreview from "./MobilePreview";
import { updateArticleDetail } from "../../../redux/actions/article";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleBody: EditorState.createEmpty(),
      isMobileView: false
    };
  }
  componentDidMount() {
    const { aritcle_body } = this.props;
    this.setState({ articleBody: aritcle_body });
  }
  UpdateStates = (name, value) => {
    const { dispatch } = this.props;
    const obj = {};
    obj[name] = value;
    dispatch(updateArticleDetail(obj));
  };
  onEditorChange = value => {
    this.setState({ articleBody: value });
    this.UpdateStates("articleBody", value);
  };
  render() {
    const {
      visible,
      articleSummary,
      summary_invalid,
      body_invalid,
      document_list
    } = this.props;
    const { articleBody, isMobileView } = this.state;
    return (
      <div style={{ display: visible ? "block" : "none" }}>
        <div>
          <div style={{ marginTop: 15 }}>
            <TowniText
              color="#4F4F4F"
              fontSize={14}
              fontWeight={500}
              lineHeight={16}
            >
              Summary Text
            </TowniText>
            <TowniTextArea
              value={articleSummary}
              style={{ marginTop: 10 }}
              invalid={summary_invalid.toString()}
              placeholder="Enter Summary"
              onChange={(e, { value }) =>
                this.UpdateStates("articleSummary", value)
              }
            />
          </div>
          <TowniText
            color="#4F4F4F"
            fontSize={14}
            fontWeight={500}
            lineHeight={16}
            style={{
              marginBottom: 15,
              marginTop: 15
            }}
          >
            Body Content
          </TowniText>
          <FlexInline
            style={{
              marginBottom: 10
            }}
          >
            <ModalTextButton
              active={!isMobileView}
              onClick={() => this.setState({ isMobileView: false })}
            >
              Body Text
            </ModalTextButton>
            <ModalTextButtonSeperator />
            <ModalTextButton
              active={isMobileView}
              onClick={() => this.setState({ isMobileView: true })}
            >
              Mobile Preview
            </ModalTextButton>
          </FlexInline>
          <RichEditor
            visible={!isMobileView}
            invalid={body_invalid.toString()}
            editorState={articleBody}
            onEditorStateChange={this.onEditorChange}
            document_list={document_list}
          />
          <MobilePreview visible={isMobileView} />
        </div>
      </div>
    );
  }
}

News.propTypes = {
  visible: PropTypes.bool,
  dispatch: PropTypes.func,
  articleSummary: PropTypes.string,
  article_body: PropTypes.object,
  summary_invalid: PropTypes.bool,
  body_invalid: PropTypes.bool,
  document_list: PropTypes.array
};
function mapStateToProps(state) {
  const { articleSummary, articleBody } = state.article;
  const { document_list } = state.document;
  return {
    articleSummary,
    aritcle_body: articleBody,
    document_list
  };
}
export default connect(mapStateToProps)(News);
