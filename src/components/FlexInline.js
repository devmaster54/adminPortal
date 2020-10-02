import styled from "styled-components";

const FlexInline = styled.div`
  display: flex;
  align-items: ${props =>
    props.top ? "flex-start" : props.bottom ? "flex-end" : "center"};
  justify-content: ${props => (props.justify === "" ? "unset" : props.justify)};
  flex-wrap: wrap;
`;

FlexInline.defaultProps = {
  top: false,
  bottom: false,
  justify: ""
};

export default FlexInline;
