import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  TowniDialog,
  ModalClose,
  TowniIcons,
  TowniText,
  FlexInline,
  SimpleButton
} from "../../components";

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      visible,
      onClose,
      onButton,
      title,
      content,
      btn_text,
      icon
    } = this.props;

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
          <SimpleButton
            onClick={onButton}
            style={{ width: 220, margin: "40px auto 0" }}
          >
            <TowniIcons name={icon} style={{ marginRight: 10 }} />
            {btn_text}
          </SimpleButton>
        </TowniDialog.Content>
      </TowniDialog>
    );
  }
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onButton: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  btn_text: PropTypes.string,
  icon: PropTypes.string
};

export default connect()(ConfirmModal);
