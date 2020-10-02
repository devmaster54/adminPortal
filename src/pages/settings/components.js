import styled from "styled-components";
import React, { useRef, useState } from "react";
import { Label } from "semantic-ui-react";

export const SettingsSubTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 10px;
`;

export const LandingScreenItem = styled.div`
  /* width: 170px; */
  margin-right: 40px;
  margin-top: 20px;
  max-width: 100%;
  min-width: 290px;
`;
export const LogoImage = styled.img`
  width: 130px;
  margin-left: 20px;
`;

export const LandingScreenItemTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const SettingButton = styled.div`
  box-shadow: 0px 7px 25px rgba(206, 216, 219, 0.35);
  border-radius: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.87);
  padding: 5px 20px;
  border: 1px solid #bdbdbd;
  cursor: pointer;
`;
const Color_btn = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
`;
export const ColorSelector = ({ value, onChange, ...other }) => {
  let color_ref = useRef();
  const onbtn = () => {
    color_ref.click();
  };
  return (
    <Color_btn onClick={onbtn} {...other}>
      <div style={{ width: 8, height: 8, background: value, marginRight: 5 }} />
      HEX {value.toUpperCase()}
      <input
        type="color"
        value={value}
        onChange={onChange}
        ref={ref => (color_ref = ref)}
        style={{ visibility: "hidden", width: 0, padding: 0 }}
      />
    </Color_btn>
  );
};

export const ColorText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 8px;
  line-height: 10px;
  color: #000000;
`;
export const GradientButton = styled.div`
  background: ${({ color1, color2 }) =>
    `linear-gradient(66.27deg, ${color1} 2.81%, ${color2} 97.19%)`};
  border-radius: 2px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 7.68814px;
  line-height: 9px;
  text-align: center;
  letter-spacing: 0.06em;
  width: 162px;
  padding: 7px;
  color: #eeeeee;
  margin-left: 30px;
`;

export const HelpScreenContainer = styled.div`
  max-width: 100%;
`;
export const HelpScreenText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 19px;
`;

export const HelpScreenInput = styled.input`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 2px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.5px;
  color: #000000;
  padding: 6px 8px;
  width: 370px;
  max-width: 100%;
  margin-bottom: 19px;
`;

const CLabel = styled(Label)`
  &.ui.pointing.basic.label {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 9px;
    line-height: 12px;
    text-align: center;
    width: 180px;
    padding: 7px 3px;
    color: #000000;
    background: #bababa;
    position: absolute;
    top: -59px;
    left: -64px;
    display: ${props => (props.visible == "true" ? "block" : "none")};
  }
`;
const ColorLabel = ({ visible }) => (
  <CLabel basic pointing="below" visible={visible.toString()}>
    If both colours are the same, the button colour will be solid. If two
    colours are chosen, it will create a gradient.
  </CLabel>
);

const IconItem = styled.div`
  background: #cfd1e5;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: center;
  margin-left: 13px;
  cursor: pointer;
`;

const RelativeDiv = styled.div`
  position: relative;
`;
export const HelpIcon = ({ style, text = "" }) => {
  const [visible, setVisible] = useState(false);
  return (
    <RelativeDiv style={style}>
      <CLabel basic pointing="below" visible={visible.toString()}>
        {text !== ""
          ? text
          : "If both colours are the same, the button colour will be solid. If two colours are chosen, it will create a gradient."}
      </CLabel>
      <IconItem
        onMouseOver={() => setVisible(true)}
        onMouseOut={() => setVisible(false)}
      >
        ?
      </IconItem>
    </RelativeDiv>
  );
};
