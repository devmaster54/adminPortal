import React from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";
import loading from "../assets/images/loading.gif";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(55, 55, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
`;

const Loading = () => (
  <LoadingContainer>
    <Image src={loading} />
  </LoadingContainer>
);

export default Loading;
