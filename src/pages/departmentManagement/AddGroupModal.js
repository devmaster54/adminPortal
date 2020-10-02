import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  TowniDialog,
  ModalClose,
  TowniIcons,
  TowniText,
  SearchInput,
  SimpleButton,
  UserModalInput,
  GroupUserContainer,
  GroupUserTable,
  UserTableContainer
} from "../../components";
import { getAttrValueFromUser } from "../../services";
import {
  updateDepartmentDetail,
  getDepartmentList,
  postDepartment,
  clearDepartmentDetail,
  checkValidation
} from "../../redux/actions/department";

const defaultState = {
  error: false,
  searchText: "",
  name_invalid: false,
  desc_invalid: false,
  err_msg: ""
};

class AddGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  UpdateStates = (name, value) => {
    const { dispatch } = this.props;
    const obj = {};
    obj[name] = value;
    dispatch(updateDepartmentDetail(obj));
  };
  onSave = async () => {
    const { dispatch, onSave, onClose, isEditing } = this.props;
    this.setState({ error: false, err_msg: "" });
    const res = dispatch(checkValidation());
    if (!res.success) {
      this.setState({ ...res.data, error: true });
      return;
    }
    const res_api = await dispatch(postDepartment());
    dispatch(getDepartmentList());
    if (res_api.success) {
      if (isEditing) onClose();
      else onSave();
      dispatch(clearDepartmentDetail());
    } else this.setState({ error: true, err_msg: res_api.error.message });
  };
  onClose = () => {
    const { onClose, dispatch } = this.props;
    dispatch(clearDepartmentDetail());
    this.setState(defaultState);
    onClose();
  };
  getUserList = () => {
    const { searchText } = this.state;
    const { user_list, total_users } = this.props;
    let users = [];
    if (searchText.trim().length > 0)
      users = total_users.filter(
        item =>
          item.firstName
            .toUpperCase()
            .includes(searchText.trim().toUpperCase()) &&
          user_list.find(i => i.orgUserId === item.orgUserId) === undefined
      );
    else users = [...user_list];
    return users;
  };
  onUserDelete = orgUserId => {
    const { user_list } = this.props;
    const new_list = user_list.filter(item => item.orgUserId !== orgUserId);
    this.UpdateStates("user_list", new_list);
  };
  onUserAdd = user => {
    const { user_list } = this.props;
    const new_list = [...user_list, user];
    this.UpdateStates("user_list", new_list);
  };
  render() {
    const {
      searchText,
      error,
      err_msg,
      name_invalid,
      desc_invalid
    } = this.state;
    const { visible, isEditing, departmentName, departmentDesc } = this.props;
    const user_list = this.getUserList();
    return (
      <React.Fragment>
        <TowniDialog
          open={visible}
          onClose={this.onClose}
          style={{ Width: 930, maxWidth: 930, padding: "20px 80px" }}
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
              {isEditing ? "Edit" : "Add"} Group
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
            <TowniText
              color="#000000"
              fontSize={16}
              fontWeight={500}
              lineHeight={24}
              style={{ margin: "0 0 5px 24px" }}
            >
              Group Name*
            </TowniText>
            <UserModalInput
              placeholder="Type group name"
              value={departmentName}
              invalid={name_invalid.toString()}
              onChange={(e, { value }) =>
                this.UpdateStates("departmentName", value)
              }
            />
            <TowniText
              color="#000000"
              fontSize={16}
              fontWeight={500}
              lineHeight={24}
              style={{ margin: "24px 0 5px 24px" }}
            >
              Group Description*
            </TowniText>
            <UserModalInput
              placeholder="Type group description"
              value={departmentDesc}
              invalid={desc_invalid.toString()}
              onChange={(e, { value }) =>
                this.UpdateStates("departmentDesc", value)
              }
            />
            <TowniText
              color="#000000"
              fontSize={20}
              fontWeight={300}
              lineHeight={23}
              style={{ marginTop: 26 }}
            >
              Members
            </TowniText>
            <GroupUserContainer style={{ marginTop: 17 }}>
              <SearchInput
                value={searchText}
                onClear={() => this.setState({ searchText: "" })}
                onChange={(e, { value }) =>
                  this.setState({ searchText: value })
                }
              />
              <UserTableContainer style={{ marginTop: 10 }}>
                <GroupUserTable>
                  <GroupUserTable.Header>
                    <GroupUserTable.Row>
                      <GroupUserTable.HeaderCell>
                        User
                      </GroupUserTable.HeaderCell>
                      <GroupUserTable.HeaderCell>
                        Email
                      </GroupUserTable.HeaderCell>
                      <GroupUserTable.HeaderCell>
                        Position
                      </GroupUserTable.HeaderCell>
                      <GroupUserTable.HeaderCell></GroupUserTable.HeaderCell>
                    </GroupUserTable.Row>
                  </GroupUserTable.Header>
                  <GroupUserTable.Body>
                    {user_list.map((item, key) => (
                      <GroupUserTable.Row key={key}>
                        <GroupUserTable.Cell className="name">
                          {item.firstName}
                        </GroupUserTable.Cell>
                        <GroupUserTable.Cell className="email">
                          {item.email}
                        </GroupUserTable.Cell>
                        <GroupUserTable.Cell>
                          {getAttrValueFromUser(item, "Position")}
                        </GroupUserTable.Cell>
                        <GroupUserTable.Cell collapsing>
                          {searchText.trim() === "" && (
                            <TowniIcons
                              name="user_delete"
                              onClick={() => this.onUserDelete(item.orgUserId)}
                            />
                          )}
                          {searchText.trim() !== "" && (
                            <TowniIcons
                              name="user_add"
                              onClick={() => this.onUserAdd(item)}
                            />
                          )}
                        </GroupUserTable.Cell>
                      </GroupUserTable.Row>
                    ))}
                  </GroupUserTable.Body>
                </GroupUserTable>
              </UserTableContainer>
            </GroupUserContainer>

            <SimpleButton
              style={{ width: 160, height: 50, margin: "20px auto 0" }}
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

AddGroupModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  departmentName: PropTypes.string,
  departmentDesc: PropTypes.string,
  user_list: PropTypes.array,
  total_users: PropTypes.array,
  isEditing: PropTypes.bool
};
function mapStateToProps(state) {
  const {
    departmentName,
    departmentDesc,
    user_list,
    isEditing
  } = state.department;
  const { users } = state.user;
  return {
    departmentName,
    departmentDesc,
    user_list,
    isEditing,
    total_users: users
  };
}
export default connect(mapStateToProps)(AddGroupModal);
