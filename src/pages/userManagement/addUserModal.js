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
  TowniCheckBox,
  MultiDropdown,
  UserModalInput
} from "../../components";
import { userStatus } from "../../constants/enum";
import { getStatudByCode } from "../../services";
import {
  updateUserDetail,
  getUsers,
  postUser,
  checkValidation,
  clearUserDetail
} from "../../redux/actions/user";

const defaultState = {
  error: false,
  role_invalid: false,
  department_invalid: false,
  firstname_invalid: false,
  lastname_invalid: false,
  email_invalid: false,
  mobile_invalid: false,
  staff_invalid: false,
  err_msg: "",
  format_errors: []
};

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  UpdateStates = (name, value) => {
    const { dispatch } = this.props;
    const obj = {};
    obj[name] = value;
    dispatch(updateUserDetail(obj));
  };
  onSave = async () => {
    const { dispatch, onSave, isEditing } = this.props;
    this.setState({ error: false, err_msg: "" });
    const res = dispatch(checkValidation());
    if (!res.success) {
      this.setState({ ...res.data, error: true });
      return;
    }
    const res_api = await dispatch(postUser());
    console.log(res_api);
    dispatch(getUsers());
    if (res_api.success) {
      onSave(isEditing);
      dispatch(clearUserDetail());
    } else this.setState({ error: true, err_msg: res_api.error.message });
  };
  onClose = () => {
    const { onClose, dispatch } = this.props;
    dispatch(clearUserDetail());
    this.setState(defaultState);
    onClose();
  };
  render() {
    const {
      visible,
      roles,
      departments,
      firstName,
      lastName,
      position,
      email,
      mobile,
      staff_id,
      isEditing,
      department_list,
      isActive,
      isShowMobile,
      status,
      roleOptions,
      isMobileSize
    } = this.props;
    const {
      error,
      err_msg,
      format_errors,
      role_invalid,
      department_invalid,
      firstname_invalid,
      lastname_invalid,
      email_invalid,
      mobile_invalid,
      staff_invalid
    } = this.state;
    const department_options = department_list.map((item, key) => ({
      key,
      value: item.departmentId,
      text: item.departmentName
    }));
    const roleOps = roleOptions.map((item, key) => ({
      key,
      value: item.roleId,
      text: item.roleName
    }));
    console.log(format_errors);
    return (
      <React.Fragment>
        <TowniDialog
          open={visible}
          onClose={this.onClose}
          style={{ maxWidth: 950 }}
        >
          <TowniDialog.Content>
            <ModalClose onClick={this.onClose}>
              <TowniIcons name="close" />
            </ModalClose>
            <TowniText
              color="#000000"
              fontSize={24}
              fontWeight={500}
              lineHeight={28}
              style={{ marginBottom: 60 }}
            >
              {isEditing ? "Edit User" : "Add New User"}
            </TowniText>
            {error && (
              <TowniText
                color="#FF0000"
                fontSize={16}
                fontWeight={500}
                lineHeight={18}
                style={{ marginBottom: 15 }}
              >
                {err_msg}
              </TowniText>
            )}
            {format_errors.map((item, key) => (
              <TowniText
                color="#FF0000"
                fontSize={16}
                fontWeight={500}
                lineHeight={18}
                style={{ marginBottom: 15 }}
                key={key}
              >
                {item}
              </TowniText>
            ))}
            <TowniText
              color="#000000"
              fontSize={20}
              fontWeight={300}
              lineHeight={23}
              style={{ marginBottom: 33 }}
            >
              User Information
            </TowniText>

            <FlexInline
              justify="space-between"
              top
              style={{ margin: "20px 60px 0" }}
            >
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  User Role*
                </TowniText>
                <MultiDropdown
                  options={roleOps}
                  value={roles}
                  invalid={role_invalid.toString()}
                  onChange={(e, { value }) => this.UpdateStates("roles", value)}
                />
              </div>
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  Member Of*
                </TowniText>
                <MultiDropdown
                  options={department_options}
                  value={departments}
                  invalid={department_invalid.toString()}
                  onChange={(e, { value }) =>
                    this.UpdateStates("departments", value)
                  }
                />
              </div>
            </FlexInline>
            <FlexInline
              justify="space-between"
              style={{ margin: "20px 60px 0" }}
            >
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  First Name*
                </TowniText>
                <UserModalInput
                  placeholder="Enter First Name"
                  value={firstName}
                  invalid={firstname_invalid.toString()}
                  onChange={(e, { value }) =>
                    this.UpdateStates("firstName", value)
                  }
                />
              </div>
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  Last Name*
                </TowniText>
                <UserModalInput
                  placeholder="Enter Last Name"
                  value={lastName}
                  invalid={lastname_invalid.toString()}
                  onChange={(e, { value }) =>
                    this.UpdateStates("lastName", value)
                  }
                />
              </div>
            </FlexInline>
            <FlexInline
              justify="space-between"
              style={{ margin: "20px 60px 0" }}
            >
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  Position
                </TowniText>
                <UserModalInput
                  placeholder="Enter position"
                  value={position}
                  onChange={(e, { value }) =>
                    this.UpdateStates("position", value)
                  }
                />
              </div>
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  Email*
                </TowniText>
                <UserModalInput
                  placeholder="Enter email address"
                  value={email}
                  disabled={isEditing}
                  invalid={email_invalid.toString()}
                  onChange={(e, { value }) => this.UpdateStates("email", value)}
                />
              </div>
            </FlexInline>
            <FlexInline
              style={{ margin: "20px 60px 0" }}
              justify="space-between"
            >
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  Mobile*
                </TowniText>
                <UserModalInput
                  placeholder="Enter mobile number"
                  value={mobile}
                  invalid={mobile_invalid.toString()}
                  onChange={(e, { value }) =>
                    this.UpdateStates("mobile", value)
                  }
                />
              </div>
              <div>
                <TowniText
                  color="#000000"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={24}
                  style={{ marginBottom: 8, marginLeft: 15 }}
                >
                  Staff ID*
                </TowniText>
                <UserModalInput
                  placeholder="Enter Staff ID"
                  value={staff_id}
                  invalid={staff_invalid.toString()}
                  onChange={(e, { value }) =>
                    this.UpdateStates("staff_id", value)
                  }
                />
              </div>
            </FlexInline>
            <FlexInline
              style={{
                marginTop: 34,
                marginLeft: 60,
                maxWidth: 350
              }}
              justify="space-between"
            >
              <TowniText
                color="#000000"
                fontSize={16}
                fontWeight={500}
                lineHeight={24}
              >
                Authorised
              </TowniText>
              <TowniCheckBox
                toggle
                checked={isActive}
                disabled={
                  isEditing && getStatudByCode(status, userStatus) !== "Pending"
                }
                onChange={(e, { checked }) =>
                  this.UpdateStates("isActive", checked)
                }
                style={{ marginLeft: 10 }}
              />
            </FlexInline>
            <FlexInline
              style={{
                marginTop: 14,
                marginLeft: 60,
                maxWidth: 350
              }}
              justify="space-between"
            >
              <TowniText
                color="#000000"
                fontSize={16}
                fontWeight={500}
                lineHeight={24}
              >
                Show Mobile Number In-App
              </TowniText>
              <TowniCheckBox
                toggle
                checked={isShowMobile}
                onChange={(e, { checked }) =>
                  this.UpdateStates("isShowMobile", checked)
                }
                style={{ marginLeft: 10 }}
              />
            </FlexInline>
            <SimpleButton
              style={{ width: 160, height: 50, margin: "40px auto 0" }}
              onClick={this.onSave}
            >
              SAVE
            </SimpleButton>
          </TowniDialog.Content>
        </TowniDialog>
      </React.Fragment>
    );
  }
}

AddUserModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  dispatch: PropTypes.func,
  roles: PropTypes.array,
  departments: PropTypes.array,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  position: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.string,
  staff_id: PropTypes.string,
  isEditing: PropTypes.bool,
  department_list: PropTypes.array,
  isActive: PropTypes.bool,
  isShowMobile: PropTypes.bool,
  roleOptions: PropTypes.array,
  isMobileSize: PropTypes.bool
};
function mapStateToProps(state) {
  const {
    roles,
    departments,
    firstName,
    lastName,
    position,
    email,
    mobile,
    staff_id,
    isEditing,
    isActive,
    isShowMobile,
    status,
    roleOptions
  } = state.user;
  const { department_list } = state.department;
  const { isMobileSize } = state.global;
  return {
    roles,
    departments,
    department_list,
    firstName,
    lastName,
    position,
    email,
    mobile,
    staff_id,
    isEditing,
    isActive,
    isShowMobile,
    status,
    roleOptions,
    isMobileSize
  };
}
export default connect(mapStateToProps)(AddUserModal);
