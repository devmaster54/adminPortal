import styled from "styled-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, ContentState, EditorState, Modifier } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Modal, Dropdown, Input, Icon, Table } from "semantic-ui-react";
import { getShortString } from "../services";
import Img_Doc from "../assets/icons/folder_small.png";
export const ModalClose = styled.div`
  & {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 0px;
    width: 30px;
    height: 30px;
    margin: 0;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, 0.54);
    font-weight: bold;
    font-size: 25px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const TowniDialog = styled(Modal)`
  &.ui.modal {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    max-width: 650px;
  }
  &.ui.modal .content {
    padding: 22px 30px 40px 30px;
  }
`;
export const ModalInputItem = styled.div`
  margin-top: 10px;
  width: 270px;
  & div {
    width: 100%;
  }
  @media (max-width: 610px) {
    width: 100%;
  }
`;
export const BroadcastListContainer = styled.div`
  border: 1px solid
    ${props => (props.invalid === "true" ? "#ff0000" : "#bdbdbd")};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 13px;
  & .list-container {
    height: 170px;
    overflow-y: auto;
    padding-right: 20px;
  }
  & .listItem {
    border-bottom: 1px solid #bdbdbd;
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    cursor: pointer;
    margin-top: 10px;
  }
  & .listItem.active {
    color: #005595;
  }
`;
export const FileContainer = styled.div`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 3px;
  width: 250px;
  padding: 4px 6px 9px 6px;
  & .fileItem {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    padding: 5px 0;
    overflow-wrap: anywhere;
    justify-content: space-between;
    color: rgba(79, 79, 79, 0.75);
  }
  & .folderItem {
    justify-content: unset;
  }
  & img {
    cursor: pointer;
  }
`;
export const FileButton = styled.button`
  background: #ffffff;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 5px;
  width: 160px;
  height: 25px;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.87);
  outline: none;
  &:hover {
    background: #eeeeee;
  }
`;

const CustomizedFileDropdown = styled(Dropdown)`
  &.ui.dropdown {
    background: #ffffff;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 5px;
    width: 160px;
    height: 25px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.ui.dropdown:hover {
    background: #eeeeee;
  }
  &.ui.dropdown.editor-dropdown {
    border: 1px solid #f1f1f1;
    width: 25px;
    height: 20px;
    padding: 5px;
    border-radius: 2px;
    margin: 0 4px;
    background-color: white;
    background-image: url(${Img_Doc});
    background-repeat: no-repeat;
    background-position: center;
  }
  &.ui.dropdown.editor-dropdown:hover {
    box-shadow: 1px 1px 0px #bfbdbd;
    background-color: white;
  }
  &.ui.dropdown .item .left.dropdown.icon {
    width: 100%;
    padding: 10px 30px 10px 46px !important;
  }
  &.ui.dropdown .item .left.dropdown.icon::after {
    content: ">";
    margin-left: 10px;
    position: absolute;
    right: 10px;
    font-weight: bold;
  }
  &.ui.dropdown .item .left.dropdown.icon > i {
    position: absolute;
    left: 20px;
  }
  &.ui.dropdown > .dropdown.icon {
    display: none;
  }
  &.ui.dropdown .item .left.dropdown.icon:before,
  &.ui.dropdown .left.menu .item .dropdown.icon:before {
    content: "";
  }

  &.ui.dropdown .menu {
    background: #fff !important;
    opacity: 1 !important;
  }
  &.ui.dropdown .menu > .header {
    text-transform: unset;
    color: #000000;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    padding: 5px 10px;
    margin: 0;
  }
  &.ui.dropdown .menu > .item {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #484848;
    min-width: 150px;
    padding: 0px 0px !important;
    display: -webkit-box;
    max-width: 250px;
  }
  &.ui.dropdown .menu > .item.noMenu {
    padding: 10px 20px !important;
  }
  &.ui.dropdown .menu > .item.noMenu > i {
  }
  &.ui.dropdown .menu > .divider {
    margin: 0;
  }
  &.ui.left.pointing.dropdown > .menu:after,
  & .ui.left.pointing.dropdown > .menu:after {
    top: 33px;
  }
  &.ui.left.pointing.dropdown > .menu {
    top: -25px !important;
    margin: 0 0 0 10px !important;
    z-index: 100;
  }
  & .ui.left.pointing.dropdown > .menu {
    top: -26px !important;
    margin: 0 0 0 9px !important;
  }
`;

const hasDirectory = data => {
  if (data.childList.find(item => item.documentType < 100)) return true;
  return false;
};

const DropdownMenu = ({ data, onItem, isfolder }) => {
  const onItemClick = () => {
    if (isfolder && data.childList.length == 0) onItem(data);
    if (!isfolder && data.documentType >= 100) onItem(data);
  };
  if (data.childList.length === 0 || (isfolder && !hasDirectory(data))) {
    if (!isfolder || (isfolder && data.documentType < 100)) {
      return (
        <Dropdown.Item
          onClick={onItemClick}
          icon="folder outline"
          content={getShortString(data.documentName, 28)}
          className="noMenu"
        />
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  } else {
    return (
      <Dropdown.Item onClick={onItemClick}>
        <Dropdown
          text={data.documentName}
          labeled
          pointing="left"
          icon="folder outline"
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Header>{data.documentName}</Dropdown.Header>
            <Dropdown.Divider />
            {data.childList.map((item, key) => (
              <DropdownMenu
                data={item}
                key={key}
                onItem={onItem}
                isfolder={isfolder}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Dropdown.Item>
    );
  }
};
export const FileDropdown = ({
  data,
  onItem,
  text,
  isfolder = false,
  ...others
}) => (
  <CustomizedFileDropdown text={text} pointing="left" {...others}>
    <Dropdown.Menu>
      <Dropdown.Header>Home</Dropdown.Header>
      <Dropdown.Divider />
      {data.map((item, key) => (
        <DropdownMenu
          data={item}
          key={key}
          onItem={onItem}
          isfolder={isfolder}
        />
      ))}
    </Dropdown.Menu>
  </CustomizedFileDropdown>
);
FileDropdown.propTypes = {
  data: PropTypes.array,
  onItem: PropTypes.func,
  text: PropTypes.string,
  isfolder: PropTypes.bool
};

const RichEditorContainer = styled.div`
  display: ${({ visible }) => (visible ? "block" : "none")};
  & .rdw-editor-wrapper {
    border: 1px solid
      ${props => (props.invalid === "true" ? "#ff0000" : "#bdbdbd")};
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    height: 250px;
    padding-bottom: 70px;
  }
  & .rdw-editor-toolbar {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 4px;
  }
  & .rdw-editor-main {
    padding: 0 20px 10px 20px;
  }
  & .DraftEditor-root {
    height: unset;
  }
  & .rdw-link-modal {
    display: block;
    height: unset;
    box-shadow: none;
  }
`;

class CustomLinkButton extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object
  };
  onItem = item => {
    const { editorState, onChange } = this.props;
    const link = `<a href="https://www.internal.download.document/${item.documentKey}">${item.documentName}</a>`;
    const blocksFromHTML = convertFromHTML(link);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    const contentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      state.getBlockMap()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };
  render() {
    const { document_list } = this.props;
    return (
      <FileDropdown
        data={document_list}
        onItem={this.onItem}
        className="editor-dropdown"
      />
    );
  }
}

export const RichEditor = ({
  visible,
  editorState,
  onEditorStateChange,
  document_list,
  invalid
}) => (
  <RichEditorContainer visible={visible} invalid={invalid}>
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={EditorToolbarOptions}
      toolbarCustomButtons={[
        <CustomLinkButton
          document_list={document_list}
          onChange={onEditorStateChange}
          editorState={editorState}
        />
      ]}
    />
  </RichEditorContainer>
);
RichEditor.defaultProps = {
  invalid: "false"
};

const EditorToolbarOptions = {
  options: [
    "inline",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "link",
    "image",
    "colorPicker",
    "history"
  ],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline"]
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Roboto",
      "Times New Roman",
      "Verdana"
    ]
  },
  list: {
    inDropdown: false,
    options: ["unordered", "ordered", "indent", "outdent"]
  },

  textAlign: {
    inDropdown: true,
    options: ["left", "center", "right", "justify"]
  },
  colorPicker: {
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)"
    ]
  },
  history: {
    inDropdown: false,
    options: ["undo", "redo"]
  }
};

export const Breakline = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  height: 1px;
  width: 100%;
`;

export const ModalImage = styled.img`
  width: 100%;
  margin-top: 10px;
`;

const DragContainer = styled.div`
  background: rgba(196, 196, 196, 0.5);
  border: 1px dashed #005595;
  box-sizing: border-box;
  border-radius: 11px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 34px;
  line-height: 40px;
  display: ${props => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  letter-spacing: 0.25px;
  color: #000000;
  position: absolute;
  top: 0;
  bottom: 0%;
  left: 0;
  right: 0;
  z-index: 99999;
`;

export const DragDrop = ({ visible }) => (
  <DragContainer visible={visible}>Drop Files Here</DragContainer>
);

export const ModalTextButton = styled.div`
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({ active }) => (active ? "#005595" : "#4f4f4f")};
`;

export const ModalTextButtonSeperator = styled.div`
  border: none;
  border-left: 0.5px solid #4f4f4f;
  margin: 0 5px;
  height: 14px;
`;

const MDropdown = styled(Dropdown)`
  &.ui.multiple.dropdown {
    width: 324px;
    min-height: 50px;

    background: #f4f8f7;
    border: 1px solid
      ${props => (props.invalid === "true" ? "#ff0000" : "none")};
    border-radius: 5px;
    padding: 10px 18px;
  }
  &.ui.multiple.dropdown .dropdown.icon {
    display: none;
  }
  &.ui.active.selection.dropdown {
    border: 1px solid #96c8da;
  }
  &.ui.multiple.dropdown > .label {
    background: #ebedf2;
    border-radius: 3px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 21px;
    color: #000000;
  }
`;
export const MultiDropdown = ({ options, ...others }) => (
  <MDropdown
    clearable
    multiple
    search
    selection
    options={options}
    placeholder=""
    {...others}
  />
);
export const UserModalInput = styled(Input)`
  &.ui.input {
    border: 1px solid
      ${props => (props.invalid === "true" ? "#ff0000" : "none")};
    box-sizing: border-box;
    border-radius: 5px;
    height: 50px;
    width: 324px;
    max-width: 100%;
  }
  &.ui.input input {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    background: #f4f8f7;
    color: #000000;
    border: none;
  }
`;

export const FeedbackCategory = styled.div`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  width: 270px;
  max-width: 100%;
  border-radius: 5px;
  padding: 16px 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.87);
`;

export const FeedbackContent = styled.div`
  border: 1px solid #005595;
  box-sizing: border-box;
  word-break: break-word;
  padding: 14px;
  width: 100%;
  height: 300px;
  overflow-y: auto;
`;
export const FeedbackFileItem = styled.div`
  border: 0.5px solid #000000;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 11px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 114px;
  cursor: pointer;
`;
export const GroupUserContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 3px;
  padding: 13px 14px;
  height: 380px;
`;

export const UserTableContainer = styled.div`
  overflow-y: auto;
  height: 314px;
`;
export const GroupUserTable = styled(Table)`
  &.ui.table {
    border: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16.2347px;
    line-height: 23px;
    color: #000000;
  }
  &.ui.table thead th {
    border: none;
  }
  &.ui.table tbody td {
    padding: 15px;
    word-break: break-all;
    border: none;
  }
  &.ui.table tbody td.name {
    max-width: 130px;
  }
  &.ui.table tbody td.email {
    max-width: 170px;
  }
  &.ui.table tbody td img {
    margin: 0 5px;
    cursor: pointer;
  }
  &.ui.table tbody tr td.center {
    text-align: center;
  }
`;
