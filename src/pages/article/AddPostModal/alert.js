import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  TowniText,
  TowniTextArea,
  TowniInput,
  FlexInline,
  TowniCheckBox,
  BroadcastListContainer,
  SearchInput,
  TowniIcons,
  FileContainer,
  FileDropdown
} from "../../../components";
import { alertLinkStatus } from "../../../constants/enum";
import { updateArticleDetail } from "../../../redux/actions/article";
import { getAllDocuments } from "../../../redux/actions/document";
import { GetArticleListByType } from "../../../apis/article";
import {
  getShortString,
  getSimplifiedDate,
  getIDByArticleType,
  utc2local
} from "../../../services";
import Broadcast from "./broadcast";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcast_list: [],
      searchText: ""
    };
  }
  componentDidMount() {
    const { dispatch, article_types } = this.props;
    dispatch(getAllDocuments());
    GetArticleListByType({
      type: getIDByArticleType("Broadcast", article_types),
      dispatch
    }).then(res => {
      if (res.success) this.setState({ broadcast_list: res.payload });
    });
  }
  UpdateStates = (name, value) => {
    const { dispatch } = this.props;
    const obj = {};
    obj[name] = value;
    dispatch(updateArticleDetail(obj));
  };
  onChangeAlertLinkOption = (e, { value }) => {
    const { dispatch, article_types } = this.props;
    this.UpdateStates("alert_link_option", value);
    if (value === alertLinkStatus.exist_broad) {
      GetArticleListByType({
        type: getIDByArticleType("Broadcast", article_types),
        dispatch
      }).then(res => {
        if (res.success) this.setState({ broadcast_list: res.payload });
      });
    }
  };
  onFileDropdownItem = item => {
    const { selectedFile_list } = this.props;
    if (selectedFile_list.find(i => i.documentId === item.documentId)) return;
    this.UpdateStates("selectedFile_list", [...selectedFile_list, item]);
  };
  removeSelectedFile = item => {
    const { selectedFile_list } = this.props;
    const newList = selectedFile_list.filter(
      i => i.documentKey !== item.documentKey
    );
    this.UpdateStates("selectedFile_list", newList);
  };
  getActiveBroadcast = () => {
    const { broadcast_list } = this.state;
    const { active_broadcast_item } = this.props;
    if (active_broadcast_item === null) return null;
    const res = broadcast_list.find(
      item => item.articleKey === active_broadcast_item
    );
    return res === undefined ? null : res;
  };
  filterList = () => {
    const { searchText, broadcast_list } = this.state;
    const { active_broadcast_item } = this.props;
    const filtered = broadcast_list.filter(item => {
      return (
        ((searchText !== "" &&
          item.articleHeadline
            .toUpperCase()
            .includes(searchText.toUpperCase())) ||
          searchText === "") &&
        item.articleKey !== active_broadcast_item
      );
    });
    return filtered;
  };
  render() {
    const {
      visible,
      article_detail,
      alert_link_option,
      selectedFile_list,
      sub_headline,
      document_list,
      summary_invalid,
      sub_headline_invalid,
      body_invalid,
      alertLink_invalid
    } = this.props;
    const { searchText } = this.state;
    const filtered_list = this.filterList();
    const active_broadcast_item = this.getActiveBroadcast();
    return (
      <div style={{ display: visible ? "block" : "none" }}>
        <div style={{ marginTop: 10 }}>
          <TowniText
            color="#4F4F4F"
            fontSize={14}
            fontWeight={500}
            lineHeight={16}
          >
            Alert Details
          </TowniText>
          <TowniTextArea
            value={article_detail}
            style={{ marginTop: 10 }}
            placeholder="Write Alert Details"
            invalid={summary_invalid.toString()}
            onChange={(e, { value }) =>
              this.UpdateStates("articleSummary", value)
            }
          />
          <FlexInline justify="flex-end">
            <TowniText
              color="#4F4F4F"
              fontSize={14}
              fontWeight={500}
              lineHeight={16}
            >
              {`${article_detail.length}/255`}
            </TowniText>
          </FlexInline>
        </div>
        <div style={{ marginTop: 20 }}>
          <TowniText
            color="#4F4F4F"
            fontSize={14}
            fontWeight={500}
            lineHeight={16}
          >
            Alert Link
          </TowniText>
          <FlexInline style={{ marginTop: 10 }} justify="space-between">
            <TowniCheckBox
              radio
              label="None"
              name="alertLink"
              value={alertLinkStatus.none}
              checked={alert_link_option === alertLinkStatus.none}
              onChange={this.onChangeAlertLinkOption}
            />
            <TowniCheckBox
              radio
              label="Existing Broadcast"
              name="alertLink"
              value={alertLinkStatus.exist_broad}
              checked={alert_link_option === alertLinkStatus.exist_broad}
              onChange={this.onChangeAlertLinkOption}
            />
            <TowniCheckBox
              radio
              label="Existing Document"
              name="alertLink"
              value={alertLinkStatus.exist_doc}
              checked={alert_link_option === alertLinkStatus.exist_doc}
              onChange={this.onChangeAlertLinkOption}
            />
            <TowniCheckBox
              radio
              label="New Broadcast"
              name="alertLink"
              value={alertLinkStatus.new_broad}
              checked={alert_link_option === alertLinkStatus.new_broad}
              onChange={this.onChangeAlertLinkOption}
            />
          </FlexInline>
        </div>
        <BroadcastListContainer
          style={{
            marginTop: 15,
            display:
              alert_link_option === alertLinkStatus.exist_broad
                ? "block"
                : "none"
          }}
          invalid={alertLink_invalid.toString()}
        >
          <SearchInput
            value={searchText}
            onClear={() => this.setState({ searchText: "" })}
            onChange={(e, { value }) => this.setState({ searchText: value })}
          />
          <div className="list-container">
            {active_broadcast_item !== null && (
              <div className="listItem active">
                <div style={{ minWidth: 200 }}>
                  {getShortString(active_broadcast_item.articleHeadline, 15)}
                </div>
                <div style={{ minWidth: 200 }}>
                  {getSimplifiedDate(
                    utc2local(active_broadcast_item.publishDate)
                  )}
                </div>
                <div style={{ width: 20 }}>
                  <TowniIcons name="check" />
                </div>
              </div>
            )}

            {filtered_list.map((item, key) => (
              <div
                className="listItem"
                key={key}
                onClick={() =>
                  this.UpdateStates("active_broadcast_item", item.articleKey)
                }
              >
                <div style={{ minWidth: 200 }}>
                  {getShortString(item.articleHeadline, 15)}
                </div>
                <div style={{ minWidth: 200 }}>
                  {getSimplifiedDate(utc2local(item.publishDate))}
                </div>
                <div style={{ width: 20 }} />
              </div>
            ))}
          </div>
        </BroadcastListContainer>
        <div
          style={{
            marginTop: 15,
            display:
              alert_link_option === alertLinkStatus.exist_doc ? "block" : "none"
          }}
        >
          <TowniText
            color="#4F4F4F"
            fontSize={14}
            fontWeight={500}
            lineHeight={16}
          >
            Select File From Document Centre
          </TowniText>

          <FileDropdown
            style={{
              marginTop: 25
            }}
            data={document_list}
            onItem={this.onFileDropdownItem}
            text="Select Files"
          />
          <FileContainer
            style={{
              marginTop: 20,
              display: selectedFile_list.length > 0 ? "block" : "none"
            }}
          >
            <TowniText
              color="#4F4F4F"
              fontSize={14}
              fontWeight={500}
              lineHeight={16}
              style={{ marginBottom: 10 }}
            >
              Selected Files
            </TowniText>
            {selectedFile_list.map((item, key) => (
              <div className="fileItem" key={key}>
                <div>{item.documentName}</div>
                <TowniIcons
                  name="close"
                  style={{ width: 10 }}
                  onClick={() => this.removeSelectedFile(item)}
                />
              </div>
            ))}
          </FileContainer>
        </div>
        <div
          style={{
            marginTop: 20,
            display:
              alert_link_option === alertLinkStatus.new_broad ? "block" : "none"
          }}
        >
          <TowniText
            color="#4F4F4F"
            fontSize={14}
            fontWeight={500}
            lineHeight={16}
          >
            Headline Text
          </TowniText>
          <TowniInput
            value={sub_headline}
            placeholder="Enter Headline Text"
            invalid={sub_headline_invalid.toString()}
            onChange={(e, { value }) =>
              this.UpdateStates("sub_headline", value)
            }
            style={{ marginTop: 10, width: 270 }}
          />
          <Broadcast visible={true} body_invalid={body_invalid} />
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  visible: PropTypes.bool,
  article_types: PropTypes.array,
  dispatch: PropTypes.func,
  article_detail: PropTypes.string,
  alert_link_option: PropTypes.number,
  selectedFile_list: PropTypes.array,
  active_broadcast_item: PropTypes.string,
  document_list: PropTypes.array,
  summary_invalid: PropTypes.bool,
  sub_headline_invalid: PropTypes.bool,
  body_invalid: PropTypes.bool,
  alertLink_invalid: PropTypes.bool
};
function mapStateToProps(state) {
  const {
    articleSummary,
    alert_link_option,
    active_broadcast_item,
    selectedFile_list,
    sub_headline,
    article_types
  } = state.article;
  const { document_list } = state.document;
  return {
    article_detail: articleSummary,
    alert_link_option,
    selectedFile_list,
    active_broadcast_item,
    sub_headline,
    article_types,
    document_list
  };
}
export default connect(mapStateToProps)(Alert);
