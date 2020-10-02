import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TowniDialog,
  TowniIcons,
  TowniText,
  FlexInline,
  SimpleButton
} from ".";

class SuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { visible, onClose, text } = this.props;

    return (
      <TowniDialog open={visible} onClose={onClose}>
        <TowniDialog.Content>
          <FlexInline justify="center" style={{ marginTop: 50 }}>
            <TowniIcons name="success" />
          </FlexInline>
          <FlexInline justify="center">
            <TowniText
              color="#313445"
              fontSize={24}
              fontWeight={"bold"}
              lineHeight={28}
              style={{ marginTop: 50, textAlign: "center", maxWidth: 300 }}
            >
              {text}
            </TowniText>
          </FlexInline>
          <FlexInline style={{ marginTop: 40 }} justify="center">
            <SimpleButton onClick={onClose} style={{ width: 220 }}>
              Continue
            </SimpleButton>
          </FlexInline>
        </TowniDialog.Content>
      </TowniDialog>
    );
  }
}

SuccessModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  text: PropTypes.string
};

export default SuccessModal;
