import styled from "styled-components";
import React from "react";
import { TowniIcons, FlexInline } from "../../components";
import { DocColor, DocType } from "../../constants/enum";
export const ListViewContainer = styled.div`
  margin: 30px -30px;
`;
export const PathTextButton = styled.div`
  font-family: Roboto;
  font-style: normal;
  word-break: break-word;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${props => (props.active ? "#2d9cdb" : "#828282")};
  cursor: pointer;
`;
export const ListViewItem = styled.div`
  cursor: pointer;
  display: flex;
  padding: 20px 20px;
  background: ${props =>
    props.active === true ? "rgba(185, 205, 251, 0.4)" : "rgba(255,255,255)"};
  & .name {
    display: flex;
    align-items: center;
    width: 50%;
    padding-left: 50px;
  }
  & .date {
    width: 50%;
    padding-left: 30px;
  }
`;
export const ModalViewContainer = styled.div`
  padding: 30px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
export const ListViewSplitter = styled.div`
  background: #e0e0e0;
  height: 1px;
  border: none;
  width: 100%;
`;

export const ModuleViewItem = styled.div`
  cursor: pointer;
  padding: 20px 20px;
  background: ${props =>
    props.active === true
      ? "rgba(185, 205, 251, 0.4)"
      : "rgba(242, 242, 242, 0.4)"};
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 4px;
  width: 270px;
  max-width: 100%;
  margin: 10px;
`;

const FileIconItem = styled.div`
  width: ${props => (props.size == "small" ? "33px" : "47px")};
  height: ${props => (props.size == "small" ? "14px" : "47px")};
  background: ${props => props.color};
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 2px;
`;
export const FileIcon = ({ docType, size, ...other }) => {
  if (docType <= DocType.MiscFolder)
    return (
      <div {...other}>
        <FlexInline
          justify="center"
          style={{
            width: size == "small" ? 33 : 47,
            height: size == "small" ? 14 : 47
          }}
        >
          <TowniIcons
            name={size == "small" ? "folder_small" : "folder_large"}
          />
        </FlexInline>
      </div>
    );
  return (
    <FileIconItem size={size} color={DocColor[docType].color} {...other}>
      {DocColor[docType].text.toUpperCase()}
    </FileIconItem>
  );
};
