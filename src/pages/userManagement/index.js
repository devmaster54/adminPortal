import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";
import { DashLayout } from "../../layout";
import {
  getSimplifiedDate,
  getAttrValueFromUser,
  compareString,
  getStatudByCode,
  getRoleNameByID,
  utc2local
} from "../../services";
import { userStatus } from "../../constants/enum";
import {
  getUsers,
  getRoleOptions,
  deleteUser,
  editUser,
  releaseUser,
  disableUser,
  approveUser,
  suspendUser
} from "../../redux/actions/user";
import { getDepartmentList } from "../../redux/actions/department";
import { setLoading } from "../../redux/actions/global";
import {
  PageContainer,
  PageTitle,
  TowniTable,
  TowniIcons,
  UserStatus,
  TowniPagination,
  TowniDropdown,
  TowniText,
  FlexInline,
  SearchInput,
  SimpleButton,
  SuccessModal
} from "../../components";
import AddUserModal from "./addUserModal";
import ConfirmModal from "./confirmModal";

class UserManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_rows: 8,
      searchStatus: "all",
      searchRole: "all",
      searchText: "",
      activePage: 1,
      selectedUser: null,
      visibleAddModal: false,
      actionType: "delete",
      visibleConfirmModal: false,
      visibleSuccessModal: false,
      successModalText: ""
    };
    this.userActionStatus = {
      activate: {
        icon: "unlock_white",
        title: "Activate User",
        content: "Are you sure you want to activate this user?",
        btn_text: "Activate user",
        successText: "User successfully activated"
      },
      disable: {
        icon: "lock_white",
        title: "Disable User",
        content: "Are you sure you want to disable this user?",
        btn_text: "Disable user",
        successText: "User successfully disabled"
      },
      suspend: {
        icon: "lock_white",
        title: "Suspend User",
        content: "Are you sure you want to suspend this user?",
        btn_text: "Suspend user",
        successText: "User successfully suspended"
      },
      delete: {
        icon: "delete_white",
        title: "Delete User",
        content: "Are you sure you want to delete this user?",
        btn_text: "Delete user",
        successText: "User successfully deleted"
      },
      release: {
        icon: "key_white",
        title: "Release User",
        content: "Are you sure you want to release this user?",
        btn_text: "Release user",
        successText: "User successfully released"
      }
    };
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    dispatch(getDepartmentList());
    dispatch(getRoleOptions());
    await dispatch(getUsers());
    dispatch(setLoading(false));
  }
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };
  onRowsChanged = (e, { value }) => {
    this.setState({ num_rows: value, activePage: 1 });
  };
  onSearchTextChanged = (e, { value }) => {
    this.setState({ searchText: value, activePage: 1 });
  };

  filterUsers = () => {
    const { searchText, searchRole, searchStatus } = this.state;
    const { users_list, roleOptions } = this.props;
    users_list.sort((a, b) =>
      compareString(
        a.firstName + " " + a.lastName,
        b.firstName + " " + b.lastName
      )
    );
    const filtered = users_list.filter(item => {
      return (
        ((searchRole !== "all" &&
          item.role.includes(getRoleNameByID(searchRole, roleOptions))) ||
          searchRole === "all") &&
        ((searchStatus !== "all" && item.status === searchStatus) ||
          searchStatus === "all") &&
        ((searchText.trim() !== "" &&
          (item.firstName + " " + item.lastName)
            .toUpperCase()
            .includes(searchText.trim().toUpperCase())) ||
          searchText.trim() === "")
      );
    });
    return filtered;
  };
  getCurPage = (users, start, end) => {
    users.splice(end, users.length - end);
    users.splice(0, start - 1);
    return users;
  };
  onAddUser = () => {
    this.setState({ visibleAddModal: true });
  };
  onSaveAddModal = edit => {
    this.setState({
      visibleAddModal: false,
      visibleSuccessModal: true,
      successModalText: edit
        ? "User successfully updated"
        : "User successfully created"
    });
  };
  onCloseAddModal = () => {
    this.setState({ visibleAddModal: false });
  };
  onEdit = async (status, userKey) => {
    if (
      getStatudByCode(status, userStatus) === "Disabled" ||
      getStatudByCode(status, userStatus) === "Suspended"
    )
      return;
    const { dispatch } = this.props;
    const res = await dispatch(editUser(userKey));
    if (res === false) return;
    this.setState({ visibleAddModal: true });
  };
  onLock = (status, userKey) => {
    if (getStatudByCode(status, userStatus) === "Pending") return;
    if (getStatudByCode(status, userStatus) === "Authorised")
      this.setState({
        actionType: "disable",
        selectedUser: userKey,
        visibleConfirmModal: true
      });
    else if (getStatudByCode(status, userStatus) === "Disabled")
      this.setState({
        actionType: "activate",
        selectedUser: userKey,
        visibleConfirmModal: true
      });
  };
  onSuspend = userKey => {
    this.setState({
      actionType: "suspend",
      selectedUser: userKey,
      visibleConfirmModal: true
    });
  };
  onDelete = userKey => {
    this.setState({
      actionType: "delete",
      selectedUser: userKey,
      visibleConfirmModal: true
    });
  };
  onRelease = userKey => {
    this.setState({
      actionType: "release",
      selectedUser: userKey,
      visibleConfirmModal: true
    });
  };
  onConfirm = async () => {
    const { dispatch } = this.props;
    const { selectedUser, actionType } = this.state;
    this.setState({ visibleConfirmModal: false });
    dispatch(setLoading(true));
    let res;
    if (actionType === "disable")
      res = await dispatch(disableUser(selectedUser));
    else if (actionType === "activate")
      res = await dispatch(approveUser(selectedUser));
    else if (actionType === "suspend")
      res = await dispatch(suspendUser(selectedUser));
    else if (actionType === "delete")
      res = await dispatch(deleteUser(selectedUser));
    else if (actionType === "release")
      res = await dispatch(releaseUser(selectedUser));
    dispatch(setLoading(false));
    if (res.success)
      this.setState({
        visibleSuccessModal: true,
        successModalText: this.userActionStatus[actionType].successText
      });
  };
  render() {
    const {
      num_rows,
      activePage,
      searchRole,
      searchStatus,
      searchText,
      visibleAddModal,
      visibleConfirmModal,
      visibleSuccessModal,
      successModalText,
      actionType
    } = this.state;
    const { roleOptions, isMobileSize } = this.props;

    const filtered_users = this.filterUsers();
    const totalRecords = filtered_users.length;
    const totalPages =
      parseInt(totalRecords / num_rows) + (totalRecords % num_rows > 0 ? 1 : 0);
    const startPage = totalRecords === 0 ? 0 : (activePage - 1) * num_rows + 1;
    const lastPage =
      activePage * num_rows > totalRecords
        ? totalRecords
        : activePage * num_rows;
    this.getCurPage(filtered_users, startPage, lastPage);
    const statusOptions = [
      { key: -1, text: "All", value: "all" },
      ...userStatus.map((item, key) => ({
        key: key,
        text: item.text,
        value: item.code
      }))
    ];
    const roleOps = [
      { key: -1, text: "All", value: "all" },
      ...roleOptions.map((item, key) => ({
        key: key,
        text: item.roleName,
        value: item.roleId
      }))
    ];
    const rowsOptions = _.times(10, key => ({
      key: key,
      text: `${key + 5}`,
      value: key + 5
    }));

    return (
      <DashLayout>
        <PageContainer>
          <PageTitle>User Management</PageTitle>
          <FlexInline justify="space-between">
            <FlexInline>
              <TowniDropdown
                selection
                options={roleOps}
                value={searchRole}
                onChange={(e, { value }) =>
                  this.setState({ searchRole: value })
                }
                style={{
                  width: 250,
                  height: 40,
                  marginRight: 20,
                  marginTop: 10
                }}
              />
              <TowniDropdown
                selection
                options={statusOptions}
                value={searchStatus}
                onChange={(e, { value }) =>
                  this.setState({ searchStatus: value })
                }
                style={{
                  width: 250,
                  marginRight: 20,
                  marginTop: 10,
                  height: 40
                }}
              />
              <SearchInput
                value={searchText}
                onChange={this.onSearchTextChanged}
                onClear={() => this.setState({ searchText: "" })}
                style={{ marginTop: 10 }}
              />
            </FlexInline>
            <SimpleButton onClick={this.onAddUser} style={{ marginTop: 10 }}>
              Add New User
            </SimpleButton>
          </FlexInline>

          <TowniTable className={isMobileSize ? "center" : ""}>
            <TowniTable.Header>
              <TowniTable.Row>
                <TowniTable.HeaderCell>Name</TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Last Modified
                </TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Groups</TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Position</TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Role</TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Status
                </TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Actions
                </TowniTable.HeaderCell>
              </TowniTable.Row>
            </TowniTable.Header>
            <TowniTable.Body>
              {filtered_users.map((item, key) => (
                <TowniTable.Row key={key}>
                  <TowniTable.Cell>
                    {item.firstName + " " + item.lastName}
                  </TowniTable.Cell>
                  <TowniTable.Cell className="center" collapsing>
                    {getSimplifiedDate(utc2local(item.dateModified))}
                  </TowniTable.Cell>
                  <TowniTable.Cell>{item.department}</TowniTable.Cell>
                  <TowniTable.Cell>
                    {getAttrValueFromUser(item, "Position")}
                  </TowniTable.Cell>
                  <TowniTable.Cell>{item.role}</TowniTable.Cell>
                  <TowniTable.Cell>
                    <UserStatus status={item.status} />
                  </TowniTable.Cell>
                  <TowniTable.Cell collapsing className="center">
                    <TowniIcons
                      name={
                        getStatudByCode(item.status, userStatus) ===
                          "Disabled" ||
                        getStatudByCode(item.status, userStatus) === "Suspended"
                          ? "edit_grey"
                          : "edit"
                      }
                      onClick={() => this.onEdit(item.status, item.userKey)}
                    />
                    <TowniIcons
                      name={
                        getStatudByCode(item.status, userStatus) ===
                          "Pending" ||
                        getStatudByCode(item.status, userStatus) === "Suspended"
                          ? "lock_grey"
                          : "lock"
                      }
                      onClick={() => this.onLock(item.status, item.userKey)}
                    />
                    <TowniIcons
                      name="delete"
                      onClick={() => this.onDelete(item.userKey)}
                    />
                    {getStatudByCode(item.status, userStatus) ===
                      "Suspended" && (
                      <TowniIcons
                        name="key"
                        onClick={() => this.onRelease(item.userKey)}
                      />
                    )}
                  </TowniTable.Cell>
                </TowniTable.Row>
              ))}
            </TowniTable.Body>
          </TowniTable>
          <FlexInline justify="space-between">
            <TowniPagination
              activePage={activePage}
              totalPages={totalPages}
              boundaryRange={0}
              siblingRange={1}
              firstItem={{ content: "<<" }}
              prevItem={{ content: "<" }}
              nextItem={{ content: ">" }}
              lastItem={{ content: ">>" }}
              onPageChange={this.handlePaginationChange}
            />
            <FlexInline>
              <TowniText>
                Displaying {startPage} - {lastPage} of {totalRecords} records
              </TowniText>
              <TowniDropdown
                selection
                options={rowsOptions}
                value={num_rows}
                onChange={this.onRowsChanged}
                style={{ marginLeft: 20, width: 80 }}
              />
            </FlexInline>
          </FlexInline>
        </PageContainer>
        <AddUserModal
          visible={visibleAddModal}
          onClose={this.onCloseAddModal}
          onSave={this.onSaveAddModal}
        />
        <ConfirmModal
          visible={visibleConfirmModal}
          onClose={() => this.setState({ visibleConfirmModal: false })}
          onButton={this.onConfirm}
          content={this.userActionStatus[actionType].content}
          title={this.userActionStatus[actionType].title}
          btn_text={this.userActionStatus[actionType].btn_text}
          icon={this.userActionStatus[actionType].icon}
        />
        <SuccessModal
          visible={visibleSuccessModal}
          onClose={() => this.setState({ visibleSuccessModal: false })}
          text={successModalText}
        />
      </DashLayout>
    );
  }
}

UserManagementPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  users_list: PropTypes.array,
  roleOptions: PropTypes.array,
  isMobileSize: PropTypes.bool
};
function mapStateToProps(state) {
  const { users, roleOptions } = state.user;
  const { isMobileSize } = state.global;
  return { users_list: users, roleOptions, isMobileSize };
}
export default connect(mapStateToProps)(UserManagementPage);
