import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import {
  TowniText,
  FlexInline,
  TowniIcons,
  FileButton,
  FileContainer,
  FileDropdown,
  RichEditor,
  Breakline,
  DragDrop,
  ModalTextButton,
  ModalTextButtonSeperator
} from "../../../components";
import MobilePreview from "./MobilePreview";
import * as FileUpload from "../../../services/FileUpload";
import { updateArticleDetail } from "../../../redux/actions/article";
import {
  getAllDocuments,
  getAllDocumentArticles
} from "../../../redux/actions/document";
import { UploadAttachedFile } from "../../../apis/document";

class Broadcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_folder: null,
      articleBody: EditorState.createEmpty(),
      isDraging: false,
      isMobileView: false,
      no_folder_err: false
    };
  }
  componentDidMount() {
    const { dispatch, aritcle_body } = this.props;
    this.setState({ articleBody: aritcle_body });
    this.dragCounter = 0;
    dispatch(getAllDocuments());
    dispatch(getAllDocumentArticles());
  }
  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    this.setState({ isDraging: true });
  };
  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    this.setState({ isDraging: false });
  };
  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter = 0;
    const { selected_folder } = this.state;
    const { attachFile_list, dispatch } = this.props;
    if (selected_folder === null) {
      this.setState({ no_folder_err: true });
    } else {
      const files = e.dataTransfer.files;
      console.log(files);
      [...files].map(file => {
        UploadAttachedFile({
          dispatch,
          file: file,
          folderKey: selected_folder.documentKey
        }).then(res => {
          if (!res.success) return;
          this.UpdateStates("attachFile_list", [
            ...attachFile_list,
            res.payload[0]
          ]);
        });
      });
    }
    this.setState({ isDraging: false });
  };
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
  removeAttachFile = item => {
    const { attachFile_list } = this.props;
    const newList = attachFile_list.filter(
      i => i.documentKey !== item.documentKey
    );
    this.UpdateStates("attachFile_list", newList);
  };
  onChooseFile = () => {
    const { selected_folder } = this.state;
    const { dispatch, attachFile_list } = this.props;
    if (selected_folder === null) {
      this.setState({ no_folder_err: true });
      return;
    }
    const fileSelector = FileUpload.buildFileSelector(e => {
      UploadAttachedFile({
        dispatch,
        file: e.target.files[0],
        folderKey: selected_folder.documentKey
      }).then(res => {
        if (!res.success) return;
        this.UpdateStates("attachFile_list", [
          ...attachFile_list,
          res.payload[0]
        ]);
      });
    });
    fileSelector.click();
  };
  onSelectFolder = item => {
    this.setState({ selected_folder: item, no_folder_err: false });
  };
  render() {
    const {
      visible,
      attachFile_list,
      selectedFile_list,
      document_list,
      documentArticle_list,
      body_invalid
    } = this.props;
    const {
      selected_folder,
      articleBody,
      isDraging,
      isMobileView,
      no_folder_err
    } = this.state;
    return (
      <div style={{ display: visible ? "block" : "none" }}>
        <div>
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
            editorState={articleBody}
            invalid={body_invalid.toString()}
            onEditorStateChange={this.onEditorChange}
            document_list={document_list}
            visible={!isMobileView}
          />
          <MobilePreview visible={isMobileView} />
        </div>
        <Breakline
          style={{
            marginTop: 15
          }}
        />
        {no_folder_err && (
          <TowniText
            color="#FF0000"
            fontSize={16}
            fontWeight={500}
            lineHeight={18}
            style={{
              marginTop: 15
            }}
          >
            Please select a folder.
          </TowniText>
        )}
        <FlexInline
          justify="space-between"
          top={true}
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            position: "relative"
          }}
          onDragOver={this.handleDrag}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragOut}
          onDrop={this.handleDrop}
        >
          <DragDrop visible={isDraging} />
          <div style={{ width: "50%" }}>
            <TowniText
              color="#4F4F4F"
              fontSize={14}
              fontWeight={500}
              lineHeight={16}
            >
              Attach Files to Broadcast
            </TowniText>
            <FileButton
              style={{
                marginTop: 20
              }}
              onClick={this.onChooseFile}
            >
              Choose Files
            </FileButton>
            <FileContainer
              style={{
                marginTop: 20,
                display: attachFile_list.length > 0 ? "block" : "none"
              }}
            >
              <TowniText
                color="#4F4F4F"
                fontSize={14}
                fontWeight={500}
                lineHeight={16}
                style={{ marginBottom: 10 }}
              >
                Attached Files
              </TowniText>
              {attachFile_list.map((item, key) => (
                <div className="fileItem" key={key}>
                  <div>{item.fileName}</div>
                  <TowniIcons
                    name="close"
                    style={{ width: 10, marginLeft: 13 }}
                    onClick={() => this.removeAttachFile(item)}
                  />
                </div>
              ))}
            </FileContainer>
          </div>
          <div style={{ width: "50%" }}>
            <TowniText
              color="#4F4F4F"
              fontSize={14}
              fontWeight={500}
              lineHeight={16}
            >
              Document Destination Folder
            </TowniText>
            <FileDropdown
              style={{
                marginTop: 20
              }}
              data={documentArticle_list}
              onItem={this.onSelectFolder}
              text="Select Folder"
              isfolder
            />

            {selected_folder && (
              <FileContainer
                style={{
                  marginTop: 20
                }}
              >
                <TowniText
                  color="#4F4F4F"
                  fontSize={14}
                  fontWeight={500}
                  lineHeight={16}
                  style={{ marginBottom: 10 }}
                >
                  Selected Folder
                </TowniText>
                <div className="fileItem folderItem">
                  <TowniIcons name="folder" style={{ width: 14 }} />
                  <div style={{ marginLeft: 10 }}>
                    {selected_folder.documentName}
                  </div>
                </div>
              </FileContainer>
            )}
          </div>
        </FlexInline>
        <Breakline />
        <div
          style={{
            marginTop: 15
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
                  style={{ width: 10, marginLeft: 13 }}
                  onClick={() => this.removeSelectedFile(item)}
                />
              </div>
            ))}
          </FileContainer>
        </div>
        <Breakline
          style={{
            marginTop: 15
          }}
        />
      </div>
    );
  }
}

Broadcast.propTypes = {
  visible: PropTypes.bool,
  dispatch: PropTypes.func,
  attachFile_list: PropTypes.array,
  selectedFile_list: PropTypes.array,
  article_body: PropTypes.object,
  document_list: PropTypes.array,
  documentArticle_list: PropTypes.array,
  body_invalid: PropTypes.bool
};

function mapStateToProps(state) {
  const { attachFile_list, selectedFile_list, articleBody } = state.article;
  const { document_list, documentArticle_list } = state.document;
  return {
    attachFile_list,
    selectedFile_list,
    aritcle_body: articleBody,
    document_list,
    documentArticle_list
  };
}
export default connect(mapStateToProps)(Broadcast);
