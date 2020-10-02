import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { TowniText } from "../../../components";
import { getMobileDate } from "../../../services";
import img_topnav from "../../../assets/images/top_nav.png";
import img_bottomnav from "../../../assets/images/bottom_nav.png";
import img_back from "../../../assets/images/phoneframe.png";

const PreviewContainer = styled.div`
  display: ${props => (props.visible ? "block" : "none")};
  width: 210px;
  margin: 0 auto;
  padding: 13px 16px;
  background: url(${img_back});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  & img {
    width: 100%;
  }
  & img.top-img {
    border-radius: 21px 21px 0 0;
  }
  & img.bottom-img {
    border-radius: 0 0 21px 21px;
  }
  & img.logo-img {
    border-radius: 5.78667px;
    width: 100%;
    margin-top: 10px;
  }
  & .content-div {
    padding: 22px 10px 0px 10px;
    height: 310px;
    overflow-y: auto;
    line-break: anywhere;
  }
  & .body-text {
    margin-top: 17px;
  }
`;

const MobilePreview = ({ visible, title, date, content, image }) => {
  const BodyHtml = draftToHtml(convertToRaw(content.getCurrentContent()));
  return (
    <PreviewContainer visible={visible}>
      <img src={img_topnav} className="top-img" />
      {/* <img src={img_back} className="background" /> */}
      <div className="content-div">
        <TowniText
          color="#484848"
          fontSize={14}
          fontWeight={"bold"}
          lineHeight={16}
        >
          {title}
        </TowniText>
        {date && (
          <TowniText
            color="#767676"
            fontSize={7}
            fontWeight={400}
            lineHeight={9}
            style={{ marginTop: 10 }}
          >
            {getMobileDate(date)}
          </TowniText>
        )}

        {image && <img className="logo-img" src={image} />}
        <div
          className="body-text"
          dangerouslySetInnerHTML={{ __html: BodyHtml }}
        ></div>
      </div>
      <img src={img_bottomnav} className="bottom-img" />
    </PreviewContainer>
  );
};

MobilePreview.propTypes = {
  visible: PropTypes.bool,
  content: PropTypes.object,
  title: PropTypes.string,
  date: PropTypes.object,
  image: PropTypes.string
};

function mapStateToProps(state) {
  const {
    heroImage,
    articleBody,
    articleHeadline,
    publishDate
  } = state.article;
  return {
    image: heroImage,
    content: articleBody,
    title: articleHeadline,
    date: publishDate
  };
}
export default connect(mapStateToProps)(MobilePreview);
