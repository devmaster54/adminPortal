import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  TowniDialog,
  ModalClose,
  TowniIcons,
  TowniText,
  TowniDropdown,
  TowniInput,
  FlexInline,
  SimpleButton,
  WhiteButton,
  TowniCheckBox,
  DatePicker,
  ModalTextButton,
  ModalTextButtonSeperator,
  FileButton,
  FileContainer,
  ModalImage,
  ModalInputItem,
  SuccessModal
} from "../../../components";
import { HelpIcon } from "../../settings/components";
import { uploadFileType, alertLinkStatus } from "../../../constants/enum";
import * as FileUpload from "../../../services/FileUpload";
import { UploadImage } from "../../../apis/document";
import { get_task_Permission } from "../../../services/permission";
import { tasks } from "../../../constants/permission";
import {
  updateArticleDetail,
  clearArticleDetail,
  postAlert,
  checkValidation
} from "../../../redux/actions/article";
import {
  getArticleTypeByID,
  getCroppedImageFile,
  getDataURLfromImg
} from "../../../services";
import Alert from "./alert";
import Broadcast from "./broadcast";
import News from "./news";
import ConfirmModal from "../confirmSaveModal";

const defaultState = {
  showConfirmModal: false,
  showSuccessModal: false,
  error: false,
  err_msg: "",
  image_type: uploadFileType.thumbnail,
  isImageEditing: false,
  curImage: null,
  imageFileName: "",
  imageCrop: {
    unit: "%",
    x: 5,
    y: 5,
    width: 90,
    height: 90
  },
  successModalText: "",
  type_invalid: false,
  receiver_invalid: false,
  date_invalid: false,
  alertLink_invalid: false,
  headline_invalid: false,
  summary_invalid: false,
  sub_headline_invalid: false,
  body_invalid: false
};
class AddPostModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  UpdateStates = (name, value) => {
    const { dispatch } = this.props;
    const obj = {};
    obj[name] = value;
    dispatch(updateArticleDetail(obj));
  };
  onDiscard = () => {
    this.onClose();
  };
  Save = async isPublish => {
    const { dispatch, articleType, article_types, isEditing } = this.props;
    this.setState({ showConfirmModal: false });
    this.UpdateStates("isPublish", isPublish);
    const res = await dispatch(postAlert());
    if (isEditing)
      this.setState({ successModalText: "Post successfully updated." });
    else
      this.setState({
        successModalText:
          getArticleTypeByID(articleType, article_types) +
          " successfully " +
          (isPublish ? "posted." : "saved.") +
          (getArticleTypeByID(articleType, article_types) === "Alert" &&
          isPublish
            ? " It is now ACTIVE."
            : "")
      });
    if (res.success) {
      this.setState({ showSuccessModal: true });
    } else this.setState({ error: res.title });
  };
  onContinue = () => {
    const { dispatch, onClose } = this.props;
    this.setState({ showSuccessModal: false });
    dispatch(clearArticleDetail());
    onClose();
  };
  onSave = () => {
    const {
      dispatch,
      articleType,
      article_types,
      isPublish,
      rolePermission
    } = this.props;
    this.setState({ error: false });
    const res = dispatch(checkValidation());
    if (!res.success) {
      this.setState({ ...res.data, error: true });
      return;
    }
    if (
      get_task_Permission(tasks.article_special, rolePermission.functionName)
    ) {
      if (getArticleTypeByID(articleType, article_types) === "Alert")
        this.setState({ showConfirmModal: true });
      else this.Save(isPublish);
    } else {
      this.Save(false);
    }
  };
  onClose = () => {
    const { onClose, dispatch } = this.props;
    this.setState(defaultState);
    dispatch(clearArticleDetail());
    onClose();
  };
  onChooseFile = () => {
    const fileSelector = FileUpload.buildFileSelector(e => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.setState({ curImage: reader.result, isImageEditing: true });
      });
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ imageFileName: e.target.files[0].name });
    });
    fileSelector.click();
  };
  onImageTextButton = type => {
    const { image_type } = this.state;
    if (image_type === type) return;
    this.setState({ image_type: type, isImageEditing: false });
  };
  editImage = () => {
    const { thumbnail, heroImage, thumbnailName, heroImageName } = this.props;
    const { image_type } = this.state;
    getDataURLfromImg(
      image_type === uploadFileType.thumbnail ? thumbnail : heroImage
    ).then(data => {
      this.setState({
        isImageEditing: true,
        curImage: data,
        imageFileName:
          image_type === uploadFileType.thumbnail
            ? thumbnailName
            : heroImageName
      });
    });
  };
  onCropConfirm = async () => {
    const { image_type, imageCrop, imageFileName } = this.state;
    const { dispatch } = this.props;
    this.setState({ isImageEditing: false });
    const file = await getCroppedImageFile(
      this.imageRef,
      imageCrop,
      imageFileName
    );
    const res = await UploadImage({ dispatch, file });
    if (!res.success) return;
    this.setState({ imageCrop: defaultState.imageCrop });
    this.UpdateStates(
      image_type === uploadFileType.hero ? "heroImage" : "thumbnail",
      res.payload[0].publicUrl
    );
    this.UpdateStates(
      image_type === uploadFileType.hero ? "heroImageName" : "thumbnailName",
      imageFileName
    );
  };
  onTypeChange = (e, { value }) => {
    const { article_types } = this.props;
    this.UpdateStates("articleType", value);
    this.setState({
      type_invalid: false,
      receiver_invalid: false,
      date_invalid: false,
      headline_invalid: false,
      summary_invalid: false,
      sub_headline_invalid: false,
      body_invalid: false,
      error: false,
      err_msg: "",
      image_type:
        getArticleTypeByID(value, article_types) === "Broadcast"
          ? uploadFileType.hero
          : uploadFileType.thumbnail
    });
  };
  onReceiverChange = (e, { value }) => {
    // if (value.includes(0)) this.UpdateStates("receivers", [0]);
    // else this.UpdateStates("receivers", value);
    this.UpdateStates("receiver", value);
  };
  onImageLoaded = image => {
    this.imageRef = image;
  };
  onCropChange = (crop, percentCrop) => {
    this.setState({ imageCrop: crop });
  };

  onCropCancel = () => {
    this.setState({ isImageEditing: false });
  };
  removeImage = () => {
    const { image_type } = this.state;
    this.setState({ isImageEditing: false });
    if (image_type === uploadFileType.thumbnail) {
      this.UpdateStates("thumbnail", null);
    } else {
      this.UpdateStates("heroImage", null);
    }
  };
  render() {
    const {
      visible,
      article_types,
      alert_link_option,
      articleType,
      articleHeadline,
      publishDate,
      isEditing,
      heroImage,
      thumbnail,
      isPin,
      isPublish,
      notifyUser,
      thumbnailName,
      heroImageName,
      receiver,
      department_options,
      user_list,
      rolePermission
    } = this.props;
    const {
      showConfirmModal,
      showSuccessModal,
      error,
      err_msg,
      image_type,
      isImageEditing,
      curImage,
      imageCrop,
      successModalText,
      type_invalid,
      receiver_invalid,
      date_invalid,
      alertLink_invalid,
      headline_invalid,
      summary_invalid,
      sub_headline_invalid,
      body_invalid
    } = this.state;
    const typeOptions = [
      ...article_types.map((item, key) => ({
        key: key,
        text: item.typeValue,
        value: item.typeId
      }))
    ];
    const articleTypeText = getArticleTypeByID(articleType, article_types);
    const receiver_options =
      articleTypeText === "News"
        ? [
            ...department_options.map((item, key) => ({
              key: item.departmentId,
              text: item.departmentName,
              value: item.departmentId
            }))
          ]
        : [
            ...department_options.map((item, key) => ({
              key: item.departmentId,
              text: item.departmentName,
              value: item.departmentId
            })),
            ...user_list.map((item, key) => ({
              key: item.userKey,
              text: item.firstName + " " + item.lastName,
              value: item.userKey
            }))
          ];
    return (
      <React.Fragment>
        <TowniDialog
          open={visible && !showConfirmModal && !showSuccessModal}
          onClose={this.onClose}
        >
          <TowniDialog.Content>
            <ModalClose onClick={this.onClose}>
              <TowniIcons name="close" />
            </ModalClose>
            <TowniText
              color="#4F4F4F"
              fontSize={24}
              fontWeight={500}
              lineHeight={28}
              style={{ marginBottom: 60 }}
            >
              {isEditing ? "Edit A Post" : "Add New Post"}
            </TowniText>
            {error && (
              <TowniText
                color="#FF0000"
                fontSize={16}
                fontWeight={500}
                lineHeight={18}
              >
                {err_msg}
              </TowniText>
            )}
            <div
              style={{
                display: articleType !== null ? "none" : "block"
              }}
            >
              <TowniText
                color="#4F4F4F"
                fontSize={14}
                fontWeight={500}
                lineHeight={16}
              >
                Type
              </TowniText>
              <TowniDropdown
                selection
                options={typeOptions}
                value={articleType}
                onChange={this.onTypeChange}
                invalid={type_invalid.toString()}
                style={{ marginTop: 10, width: 270 }}
              />
            </div>
            <div
              style={{
                display: articleType === null ? "none" : "block"
              }}
            >
              <FlexInline justify="space-between" top>
                <ModalInputItem>
                  <TowniText
                    color="#4F4F4F"
                    fontSize={14}
                    fontWeight={500}
                    lineHeight={16}
                    style={{ marginBottom: 10 }}
                  >
                    Type
                  </TowniText>
                  <TowniDropdown
                    selection
                    options={typeOptions}
                    value={articleType}
                    onChange={this.onTypeChange}
                  />
                </ModalInputItem>
                <ModalInputItem
                  style={{
                    display: articleTypeText === "News" ? "none" : "block"
                  }}
                >
                  <TowniText
                    color="#4F4F4F"
                    fontSize={14}
                    fontWeight={500}
                    lineHeight={16}
                    style={{ marginBottom: 10 }}
                  >
                    Receiver
                  </TowniText>
                  <TowniDropdown
                    clearable
                    search
                    placeholder="Select Receivers"
                    selection
                    fluid
                    options={receiver_options}
                    value={receiver}
                    invalid={receiver_invalid.toString()}
                    onChange={this.onReceiverChange}
                  />
                </ModalInputItem>
              </FlexInline>
              <FlexInline justify="space-between">
                <ModalInputItem>
                  <TowniText
                    color="#4F4F4F"
                    fontSize={14}
                    fontWeight={500}
                    lineHeight={16}
                    style={{ marginBottom: 10 }}
                  >
                    Display Date
                  </TowniText>
                  <DatePicker
                    value={publishDate}
                    invalid={date_invalid}
                    onChange={value => this.UpdateStates("publishDate", value)}
                  />
                </ModalInputItem>
                <ModalInputItem>
                  <TowniText
                    color="#4F4F4F"
                    fontSize={14}
                    fontWeight={500}
                    lineHeight={16}
                    style={{ marginBottom: 10 }}
                  >
                    Headline Text
                  </TowniText>
                  <TowniInput
                    value={articleHeadline}
                    placeholder="Enter Headline Text"
                    invalid={headline_invalid.toString()}
                    onChange={(e, { value }) =>
                      this.UpdateStates("articleHeadline", value)
                    }
                  />
                </ModalInputItem>
              </FlexInline>
              <div
                style={{
                  marginTop: 10,
                  display:
                    articleTypeText === "Broadcast" ||
                    articleTypeText === "News"
                      ? "block"
                      : "none"
                }}
              >
                <ModalTextButton
                  style={{
                    marginBottom: 10,
                    display: articleTypeText !== "Broadcast" ? "none" : "block"
                  }}
                >
                  Hero Image
                </ModalTextButton>
                <FlexInline
                  style={{
                    marginBottom: 10,
                    display: articleTypeText === "Broadcast" ? "none" : "flex"
                  }}
                >
                  <ModalTextButton
                    active={image_type === uploadFileType.thumbnail}
                    onClick={() =>
                      this.onImageTextButton(uploadFileType.thumbnail)
                    }
                  >
                    Thumbnail Image
                  </ModalTextButton>
                  <ModalTextButtonSeperator />
                  <ModalTextButton
                    active={image_type === uploadFileType.hero}
                    onClick={() => this.onImageTextButton(uploadFileType.hero)}
                  >
                    Hero Image
                  </ModalTextButton>
                </FlexInline>
                <FileButton
                  style={{
                    marginTop: 20
                  }}
                  onClick={this.onChooseFile}
                >
                  Choose File
                </FileButton>
                <FileContainer
                  style={{
                    marginTop: 20,
                    display:
                      (image_type === uploadFileType.thumbnail && thumbnail) ||
                      (image_type === uploadFileType.hero && heroImage)
                        ? "block"
                        : "none"
                  }}
                >
                  <TowniText
                    color="#4F4F4F"
                    fontSize={14}
                    fontWeight={500}
                    lineHeight={16}
                  >
                    Attached Files
                  </TowniText>
                  <div>
                    <ModalImage
                      src={
                        image_type === uploadFileType.thumbnail
                          ? thumbnail
                          : heroImage
                      }
                    />
                    <FlexInline justify="space-between">
                      <TowniText
                        color="rgba(79, 79, 79, 0.75)"
                        fontSize={14}
                        fontWeight={500}
                        lineHeight={16}
                      >
                        {image_type === uploadFileType.thumbnail
                          ? thumbnailName
                          : heroImageName}
                      </TowniText>
                      <FlexInline>
                        <TowniIcons
                          name="edit_grey"
                          style={{ width: 14 }}
                          onClick={this.editImage}
                        />
                        <TowniIcons
                          name="close"
                          style={{ width: 10, marginLeft: 5 }}
                          onClick={this.removeImage}
                        />
                      </FlexInline>
                    </FlexInline>
                  </div>
                </FileContainer>
                {isImageEditing && (
                  <div style={{ width: 450, marginTop: 15 }}>
                    <TowniText
                      color="#4F4F4F"
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={16}
                      style={{ marginBottom: 15 }}
                    >
                      Crop Image
                    </TowniText>
                    <ReactCrop
                      src={curImage}
                      crop={imageCrop}
                      onChange={this.onCropChange}
                      onImageLoaded={this.onImageLoaded}
                      keepSelection
                    />
                    <FlexInline justify="flex-end">
                      <WhiteButton
                        onClick={this.onCropCancel}
                        style={{ width: 90 }}
                      >
                        Cancel
                      </WhiteButton>
                      <SimpleButton
                        onClick={this.onCropConfirm}
                        style={{ width: 90, marginLeft: 10 }}
                      >
                        Confirm
                      </SimpleButton>
                    </FlexInline>
                  </div>
                )}
              </div>
              <Alert
                visible={articleTypeText === "Alert"}
                summary_invalid={summary_invalid}
                sub_headline_invalid={sub_headline_invalid}
                body_invalid={body_invalid}
                alertLink_invalid={alertLink_invalid}
              />
              <Broadcast
                visible={articleTypeText === "Broadcast"}
                body_invalid={body_invalid}
              />
              <News
                visible={articleTypeText === "News"}
                summary_invalid={summary_invalid}
                body_invalid={body_invalid}
              />

              <div
                style={{
                  marginTop: 15,
                  display:
                    articleTypeText === "News" ||
                    (articleTypeText === "Alert" &&
                      alert_link_option === alertLinkStatus.none)
                      ? "none"
                      : "block"
                }}
              >
                <TowniText
                  color="#4F4F4F"
                  fontSize={14}
                  fontWeight={500}
                  lineHeight={16}
                >
                  Pin Post
                </TowniText>
                <FlexInline>
                  <TowniCheckBox
                    toggle
                    checked={isPin}
                    style={{ marginTop: 15, marginRight: 10 }}
                    onChange={(e, { checked }) =>
                      this.UpdateStates("isPin", checked)
                    }
                  />
                  <HelpIcon
                    style={{ marginTop: 15 }}
                    text="Selecting “Pin Post” will ensure that this broadcast will be the first displayed in the mobile app."
                  />
                </FlexInline>
              </div>
              {rolePermission !== null &&
                get_task_Permission(
                  tasks.article_special,
                  rolePermission.functionName
                ) && (
                  <div style={{ marginTop: 15 }}>
                    <TowniText
                      color="#4F4F4F"
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={16}
                    >
                      Publish Live
                    </TowniText>
                    <TowniCheckBox
                      toggle
                      checked={isPublish}
                      style={{ marginTop: 15 }}
                      onChange={(e, { checked }) => {
                        this.UpdateStates("isPublish", checked),
                          this.UpdateStates("notifyUser", checked);
                      }}
                    />
                  </div>
                )}

              <div
                style={{
                  marginTop: 15,
                  display:
                    articleTypeText === "News" || isPublish === false
                      ? "none"
                      : "block"
                }}
              >
                <TowniText
                  color="#4F4F4F"
                  fontSize={14}
                  fontWeight={500}
                  lineHeight={16}
                >
                  Notify Users
                </TowniText>
                <TowniCheckBox
                  toggle
                  checked={notifyUser}
                  style={{ marginTop: 15 }}
                  onChange={(e, { checked }) =>
                    this.UpdateStates("notifyUser", checked)
                  }
                />
              </div>
            </div>
            <FlexInline
              style={{ marginTop: articleType !== null ? 40 : 175 }}
              justify="flex-end"
            >
              <WhiteButton
                style={{ width: 160, height: 50 }}
                onClick={this.onDiscard}
              >
                Discard
              </WhiteButton>
              {articleType !== null && (
                <SimpleButton
                  style={{
                    width: 160,
                    height: 50,
                    marginLeft: 20
                  }}
                  onClick={this.onSave}
                >
                  SAVE
                </SimpleButton>
              )}
            </FlexInline>
          </TowniDialog.Content>
        </TowniDialog>
        <ConfirmModal
          visible={showConfirmModal}
          save={this.Save}
          onClose={() => this.setState({ showConfirmModal: false })}
        />
        <SuccessModal
          visible={showSuccessModal}
          onClose={this.onContinue}
          text={successModalText}
        />
      </React.Fragment>
    );
  }
}

AddPostModal.propTypes = {
  article_types: PropTypes.array,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  dispatch: PropTypes.func,
  publishDate: PropTypes.object,
  articleType: PropTypes.number,
  articleHeadline: PropTypes.string,
  thumbnail: PropTypes.string,
  heroImage: PropTypes.string,
  article_types: PropTypes.array,
  isEditing: PropTypes.bool,
  isPin: PropTypes.bool,
  isPublish: PropTypes.bool,
  notifyUser: PropTypes.bool,
  thumbnailName: PropTypes.string,
  heroImageName: PropTypes.string,
  receivers: PropTypes.array,
  department_options: PropTypes.array,
  user_list: PropTypes.array,
  rolePermission: PropTypes.object
};
function mapStateToProps(state) {
  const {
    articleType,
    articleHeadline,
    alert_link_option,
    publishDate,
    article_types,
    isEditing,
    heroImage,
    thumbnail,
    isPin,
    isPublish,
    notifyUser,
    thumbnailName,
    heroImageName,
    receiver
  } = state.article;
  const { department_options } = state.department;
  const { users } = state.user;
  const { rolePermission } = state.me;
  return {
    articleType,
    articleHeadline,
    alert_link_option,
    publishDate,
    article_types,
    isEditing,
    heroImage,
    thumbnail,
    isPin,
    isPublish,
    notifyUser,
    thumbnailName,
    heroImageName,
    receiver,
    department_options,
    user_list: users,
    rolePermission
  };
}
export default connect(mapStateToProps)(AddPostModal);
