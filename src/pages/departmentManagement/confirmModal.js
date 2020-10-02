import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  TowniDialog,
  ModalClose,
  TowniIcons,
  TowniText,
  FlexInline,
  SimpleButton,
  UserModalInput
} from "../../components";

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remove_text: "",
      btn_disable: true
    };
  }
  onInputChange = (e, { value }) => {
    this.setState({ remove_text: value });
    if (value === "Delete Group") this.setState({ btn_disable: false });
    else this.setState({ btn_disable: true });
  };
  onBtnClick = () => {
    const { onButton, isDeleteGroup } = this.props;
    const { btn_disable } = this.state;
    if (isDeleteGroup && btn_disable) return;
    onButton();
  };
  onCloseModal = () => {
    const { onClose } = this.props;
    this.setState({ btn_disable: true, remove_text: "" });
    onClose();
  };
  render() {
    const {
      visible,
      title,
      content,
      btn_text,
      icon,
      isDeleteGroup
    } = this.props;
    const { remove_text, btn_disable } = this.state;
    return (
      <TowniDialog open={visible} onClose={this.onCloseModal}>
        <TowniDialog.Content>
          <ModalClose onClick={this.onCloseModal}>
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
          {isDeleteGroup && (
            <div style={{ margin: "0 auto", width: "max-content" }}>
              <TowniText
                color="#000000"
                fontSize={16}
                fontWeight={400}
                lineHeight={24}
                style={{ marginTop: 15, textAlign: "center", maxWidth: 340 }}
              >
                To delete the group please type “Delete Group” below:
              </TowniText>
              <UserModalInput
                placeholder="Type to remove"
                value={remove_text}
                onChange={this.onInputChange}
              />
            </div>
          )}
          <SimpleButton
            onClick={this.onBtnClick}
            style={{ width: 220, margin: "40px auto 0" }}
            disabled={isDeleteGroup && btn_disable}
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
  icon: PropTypes.string,
  isDeleteGroup: PropTypes.bool
};

export default ConfirmModal;
