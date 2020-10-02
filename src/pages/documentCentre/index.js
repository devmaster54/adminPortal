import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DashLayout } from "../../layout";
import { ViewType, DocType } from "../../constants/enum";
import routes from "../../constants/routes";
import {
  PageContainer,
  PageTitle,
  TowniIcons,
  FlexInline,
  SearchInput,
  TowniText
} from "../../components";
import { setLoading } from "../../redux/actions/global";
import { getDocViewDate, utc2local } from "../../services";
import {
  GetDocumentDetailList,
  GetDocumentDetailListById,
  GetFolderTree,
  DownloadDocument
} from "../../apis/document";
import {
  ListViewContainer,
  ListViewItem,
  ListViewSplitter,
  ModuleViewItem,
  ModalViewContainer,
  FileIcon,
  PathTextButton
} from "./components";

class DocumentCentrePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: ViewType.listView,
      searchText: "",
      curParentDocId: "",
      selectedItem: null,
      curPath: "",
      curDocList: []
    };
  }
  componentDidMount() {
    this.getDocumentList();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.documentId === this.props.match.params.documentId
    )
      return;
    this.getDocumentList();
  }
  getFolderPath = data => {
    if (data == null) return "";
    if (data.childFolder == null)
      return <PathTextButton active>{data.documentName}</PathTextButton>;
    return (
      <React.Fragment>
        <PathTextButton onClick={() => this.onFolderClick(data)}>
          {data.documentName}
        </PathTextButton>
        <TowniText
          color="#828282"
          fontSize={16}
          fontWeight={500}
          lineHeight={22}
          style={{ margin: "0 5px" }}
        >
          /
        </TowniText>
        {this.getFolderPath(data.childFolder)}
      </React.Fragment>
    );
  };
  getDocumentList = async () => {
    const { dispatch, match } = this.props;
    const docId =
      match.params.documentId == undefined ? null : match.params.documentId;
    let list_res, path_res;
    dispatch(setLoading(true));
    if (docId === null) {
      list_res = await GetDocumentDetailList({ dispatch });
      path_res = { success: true, payload: { childFolder: null } };
    } else {
      list_res = await GetDocumentDetailListById({
        dispatch,
        docId
      });
      path_res = await GetFolderTree({ dispatch, docId });
    }

    dispatch(setLoading(false));
    if (!list_res.success || !path_res.success) return;
    this.setState({
      curDocList: list_res.payload,
      curParentDocId: docId,
      curPath: path_res.payload.childFolder
    });
  };
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
  onFolderClick = async (document = null) => {
    const { history } = this.props;
    if (document == null) {
      history.push(routes.document);
      return;
    }
    if (document.documentType > DocType.MiscFolder) {
      this.onAttachment(document);
      return;
    }
    history.push(`${routes.document}/${document.documentId}`);
  };
  filterList = () => {
    const { searchText, curDocList } = this.state;
    const filtered = curDocList.filter(
      item =>
        (searchText.trim() !== "" &&
          item.documentName
            .toUpperCase()
            .includes(searchText.trim().toUpperCase())) ||
        searchText.trim() === ""
    );
    return filtered;
  };
  render() {
    const { viewType, searchText, curPath, selectedItem } = this.state;
    const filtered_list = this.filterList();
    return (
      <DashLayout>
        <PageContainer>
          <PageTitle>Document Centre</PageTitle>
          <FlexInline style={{ marginBottom: 20 }}>
            <PathTextButton onClick={() => this.onFolderClick()}>
              Document Centre
            </PathTextButton>
            <TowniText
              color="#828282"
              fontSize={16}
              fontWeight={500}
              lineHeight={22}
              style={{ margin: "0 5px" }}
            >
              /
            </TowniText>
            {this.getFolderPath(curPath)}
          </FlexInline>
          <FlexInline justify="space-between">
            <SearchInput
              value={searchText}
              onClear={() => this.setState({ searchText: "" })}
              onChange={(e, { value }) => this.setState({ searchText: value })}
            />
            <FlexInline>
              <TowniText
                color="#828282"
                fontSize={16}
                fontWeight={500}
                lineHeight={19}
                style={{ marginRight: 10 }}
              >
                View :
              </TowniText>
              <TowniIcons
                name="list_view"
                active={viewType === ViewType.listView}
                onClick={() => this.setState({ viewType: ViewType.listView })}
                style={{ marginRight: 5, height: 14, cursor: "pointer" }}
              />
              <TowniIcons
                name="module_view"
                active={viewType === ViewType.moduleView}
                onClick={() => this.setState({ viewType: ViewType.moduleView })}
                style={{ height: 14, cursor: "pointer" }}
              />
            </FlexInline>
          </FlexInline>
          <ListViewContainer>
            <ListViewSplitter />
            <div
              style={{
                display: viewType == ViewType.listView ? "block" : "none"
              }}
            >
              <ListViewItem>
                <TowniText
                  className="name"
                  color="#4F4F4F"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={19}
                >
                  Folder
                </TowniText>
                <TowniText
                  className="date"
                  color="#4F4F4F"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={19}
                >
                  Last Modified
                </TowniText>
              </ListViewItem>
              <ListViewSplitter />
              {filtered_list.map((item, key) => (
                <React.Fragment key={key}>
                  <ListViewItem
                    onDoubleClick={() => this.onFolderClick(item)}
                    onClick={() =>
                      this.setState({ selectedItem: item.documentId })
                    }
                    active={selectedItem === item.documentId}
                  >
                    <div className="name">
                      <FileIcon size="small" docType={item.documentType} />
                      <TowniText
                        className="date"
                        color="#4F4F4F"
                        fontSize={16}
                        fontWeight={500}
                        lineHeight={19}
                      >
                        {item.documentName}
                      </TowniText>
                    </div>
                    <div className="date">
                      {getDocViewDate(utc2local(item.dateModified))}
                    </div>
                  </ListViewItem>
                  <ListViewSplitter />
                </React.Fragment>
              ))}
            </div>
            <ModalViewContainer
              style={{
                display: viewType == ViewType.moduleView ? "flex" : "none"
              }}
            >
              {filtered_list.map((item, key) => (
                <React.Fragment key={key}>
                  <ModuleViewItem
                    onDoubleClick={() => this.onFolderClick(item)}
                    onClick={() =>
                      this.setState({ selectedItem: item.documentId })
                    }
                    active={selectedItem === item.documentId}
                  >
                    <FileIcon
                      style={{ marginBottom: 20 }}
                      size="large"
                      docType={item.documentType}
                    />
                    <TowniText
                      color="#4F4F4F"
                      fontSize={16}
                      fontWeight={500}
                      lineHeight={23}
                      style={{ marginBottom: 5 }}
                    >
                      {item.documentName}
                    </TowniText>
                    <TowniText
                      color="#828282"
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={23}
                      style={{ marginBottom: 15 }}
                    >
                      {item.documentType < DocType.Pdf
                        ? item.fileCount + " Files"
                        : item.documentSize + " kb"}
                    </TowniText>
                    <TowniText
                      color="#828282"
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={23}
                    >
                      {("Last Modified: ", getDocViewDate(item.dateModified))}
                    </TowniText>
                  </ModuleViewItem>
                </React.Fragment>
              ))}
            </ModalViewContainer>
          </ListViewContainer>
        </PageContainer>
      </DashLayout>
    );
  }
}

DocumentCentrePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object
};
function mapStateToProps(state) {
  const { curDocList } = state.document;
  return {};
}
export default connect(mapStateToProps)(DocumentCentrePage);
