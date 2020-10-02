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

class ConfirmSaveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { visible, onClose, save } = this.props;

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
            Confirm New Post
          </TowniText>
          <FlexInline justify="center">
            <TowniText
              color="#313445"
              fontSize={24}
              fontWeight={"bold"}
              lineHeight={28}
              style={{ marginTop: 50, textAlign: "center", maxWidth: 350 }}
            >
              Only one alert may be active at a time. By publishing this new
              alert, the current alert will end.
            </TowniText>
          </FlexInline>
          <FlexInline justify="center">
            <TowniText
              color="#313445"
              fontSize={24}
              fontWeight={"bold"}
              lineHeight={28}
              style={{ marginTop: 50, textAlign: "center", maxWidth: 350 }}
            >
              Are you sure you want to continue?
            </TowniText>
          </FlexInline>

          <FlexInline style={{ marginTop: 40 }} justify="space-around">
            <SimpleButton onClick={() => save(false)} style={{ width: 220 }}>
              Save as Draft
            </SimpleButton>
            <SimpleButton onClick={() => save(true)} style={{ width: 220 }}>
              Save & Publish
            </SimpleButton>
          </FlexInline>
        </TowniDialog.Content>
      </TowniDialog>
    );
  }
}

ConfirmSaveModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  save: PropTypes.func
};

export default connect()(ConfirmSaveModal);
