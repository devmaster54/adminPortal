import styled from "styled-components";

export const DashboardSection = styled.div`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  max-width: 100%;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  min-height: 320px;
  & .sub-section {
    border: 1px solid #bdbdbd;
    padding: 20px;
    height: 320px;
    border-radius: 8px;
    overflow-y: auto;
  }
  &.activeUser {
    width: 700px;
    height: 420px;
  }
  &.devices {
    width: 300px;
    height: 420px;
  }
  &.authorised {
    width: 380px;
    height: 420px;
  }
  &.currentAlert {
    width: 430px;
    padding: 0;
    border: none;
  }
  &.recentActivity {
    width: 610px;
    padding: 0;
    border: none;
  }
  &.recentFiles {
    width: 340px;
    padding: 0;
    border: none;
  }
  @media only screen and (min-width: 1920px) {
    &.activeUser {
      width: 48.61%;
    }
    &.devices {
      width: 20.83%;
    }
    &.authorised {
      width: 26.388%;
    }
    &.currentAlert {
      width: 29.86%;
    }
    &.recentActivity {
      width: 42.36%;
    }
    &.recentFiles {
      width: 23.61%;
    }
  }
`;

export const AlertPart = styled.div`
  background: linear-gradient(
    253.2deg,
    #ff7961 0%,
    #fe735c 14.58%,
    #f44336 96.35%
  );
  display: flex;
  align-items: center;
  padding: 20px;
  color: #f2f2f2;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  & .title {
    font-size: 24px;
    line-height: 28px;
  }
  & .content {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const ArticleActivity = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
  justify-content: space-between;
`;

export const TextButton = styled.div`
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #1890ff;
`;

export const DashCardItem = styled.div`
  background-color: ${props => props.backColor};
  width: 643px;
  max-width: 100%;
  margin: 30px;
  cursor: pointer;
  & .img-section {
    /* background-image: ${props => `url(${props.backImg})`}; */
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #dfdfdf;
    padding: 20px;
    overflow: hidden;
    position: relative;
  }
  & .img-section .back-img {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    opacity: 0.2;
    z-index: 0;
    width: 140%;
  }
  & .img-section .back-img img {
    margin: 10px 25px;
  }
  & .img-section img {
    max-width: 100%;
    z-index: 1;
  }
  & .text-section {
    padding: 27px;
  }
`;
