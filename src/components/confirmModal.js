import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TowniDialog,
  ModalClose,
  TowniIcons,
  TowniText,
  FlexInline,
  SimpleButton,
  WhiteButton
} from ".";

class ConfirmDeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { visible, onClose, onContinue, title, content } = this.props;

    return (
      <TowniDialog open={visible} onClose={onClose}>
        <TowniDialog.Content>
          <ModalClose onClick={onClose}>
            <TowniIcons name="close" />
          </ModalClose>
          <TowniText
            color="#000000"
            fontSize={24}
            fontWeight={400}
            lineHeight={28}
          >
            {title}
          </TowniText>
          <FlexInline justify="center">
            <TowniText
              color="#313445"
              fontSize={24}
              fontWeight={"bold"}
              lineHeight={28}
              style={{ marginTop: 50, textAlign: "center", maxWidth: 350 }}
            >
              {content}
            </TowniText>
          </FlexInline>
          <FlexInline style={{ marginTop: 40 }} justify="space-around">
            <WhiteButton onClick={onClose} style={{ width: 220 }}>
              Cancel
            </WhiteButton>
            <SimpleButton onClick={onContinue} style={{ width: 220 }}>
              Continue
            </SimpleButton>
          </FlexInline>
        </TowniDialog.Content>
      </TowniDialog>
    );
  }
}

ConfirmDeleteModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onClose: PropTypes.func,
  onContinue: PropTypes.func
};

export default ConfirmDeleteModal;
