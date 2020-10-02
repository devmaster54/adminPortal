import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import { DashLayout } from "../../layout";
import { getSimplifiedDate, compareDate, utc2local } from "../../services";
import {
  getDepartmentList,
  editDepartment,
  deleteDepartment
} from "../../redux/actions/department";
import { getUsers } from "../../redux/actions/user";
import { setLoading } from "../../redux/actions/global";

import {
  PageContainer,
  PageTitle,
  TowniTable,
  TowniIcons,
  TowniPagination,
  TowniDropdown,
  TowniText,
  FlexInline,
  SearchInput,
  SuccessModal,
  SimpleButton
} from "../../components";
import ConfirmModal from "./confirmModal";
import AddGroupModal from "./AddGroupModal";

class DepartmentManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_rows: 8,
      dateRange: null,
      searchText: "",
      activePage: 1,
      deleteDepartmentID: null,
      visibleAddModal: false,
      visibleDeleteModal: false,
      visibleSuccessModal: false,
      successModalText: ""
    };
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    dispatch(getUsers());
    await dispatch(getDepartmentList());
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
  filterList = () => {
    const { searchText } = this.state;
    const { department_list } = this.props;
    department_list.sort((a, b) => compareDate(a.dateModified, b.dateModified));
    const filtered = department_list.filter(item => {
      return (
        (searchText !== "" &&
          item.departmentName
            .toUpperCase()
            .includes(searchText.toUpperCase())) ||
        searchText === ""
      );
    });
    return filtered;
  };
  getCurPage = (department_list, start, end) => {
    department_list.splice(end, department_list.length - end);
    department_list.splice(0, start - 1);
    return department_list;
  };
  onSave = () => {
    this.setState({
      visibleAddModal: false,
      visibleSuccessModal: true,
      successModalText: "Group successfully created"
    });
  };
  onAdd = () => {
    this.setState({ visibleAddModal: true });
  };
  onEdit = async id => {
    const { dispatch } = this.props;
    const res = await dispatch(editDepartment(id));
    if (res === false) return;
    this.setState({ visibleAddModal: true });
  };
  Delete = async () => {
    const { dispatch } = this.props;
    const { deleteDepartmentID } = this.state;
    this.setState({ deleteDepartmentID: null, visibleDeleteModal: false });
    dispatch(setLoading(true));
    const res = await dispatch(deleteDepartment(deleteDepartmentID));
    dispatch(setLoading(false));
    if (res.success)
      this.setState({
        visibleSuccessModal: true,
        successModalText: "Group successfully deleted"
      });
  };
  render() {
    const {
      num_rows,
      activePage,
      searchText,
      visibleAddModal,
      visibleDeleteModal,
      visibleSuccessModal,
      successModalText
    } = this.state;
    const { isMobileSize } = this.props;
    const filtered_list = this.filterList();
    const totalRecords = filtered_list.length;
    const totalPages =
      parseInt(totalRecords / num_rows) + (totalRecords % num_rows > 0 ? 1 : 0);
    const startPage = totalRecords === 0 ? 0 : (activePage - 1) * num_rows + 1;
    const lastPage =
      activePage * num_rows > totalRecords
        ? totalRecords
        : activePage * num_rows;
    this.getCurPage(filtered_list, startPage, lastPage);
    const rowsOptions = _.times(10, key => ({
      key: key,
      text: `${key + 5}`,
      value: key + 5
    }));
    return (
      <DashLayout>
        <PageContainer>
          <PageTitle>Group Management</PageTitle>
          <FlexInline justify="space-between">
            <SearchInput
              value={searchText}
              onClear={() => this.setState({ searchText: "" })}
              onChange={this.onSearchTextChanged}
              style={{
                marginTop: 10
              }}
            />
            <SimpleButton onClick={this.onAdd} style={{ marginTop: 10 }}>
              Add New Group
            </SimpleButton>
          </FlexInline>
          <TowniTable className={isMobileSize ? "center" : ""}>
            <TowniTable.Header>
              <TowniTable.Row>
                <TowniTable.HeaderCell>Name</TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Last Modified
                </TowniTable.HeaderCell>
                <TowniTable.HeaderCell>User Count</TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Description</TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Actions
                </TowniTable.HeaderCell>
              </TowniTable.Row>
            </TowniTable.Header>
            <TowniTable.Body>
              {filtered_list.map((item, key) => (
                <TowniTable.Row key={key}>
                  <TowniTable.Cell collapsing>
                    {item.departmentName}
                  </TowniTable.Cell>
                  <TowniTable.Cell collapsing className="center" collapsing>
                    {getSimplifiedDate(utc2local(item.dateModified))}
                  </TowniTable.Cell>
                  <TowniTable.Cell collapsing className="user-cell">
                    {item.users}
                  </TowniTable.Cell>
                  <TowniTable.Cell>{item.departmentDesc}</TowniTable.Cell>
                  <TowniTable.Cell collapsing className="center">
                    <TowniIcons
                      name="edit"
                      onClick={() => this.onEdit(item.departmentId)}
                    />
                    <TowniIcons
                      name="delete"
                      onClick={() =>
                        this.setState({
                          deleteDepartmentID: item.departmentId,
                          visibleDeleteModal: true
                        })
                      }
                    />
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
        <AddGroupModal
          visible={visibleAddModal}
          onClose={() => this.setState({ visibleAddModal: false })}
          onSave={this.onSave}
        />
        <ConfirmModal
          visible={visibleDeleteModal}
          onClose={() => this.setState({ visibleDeleteModal: false })}
          onButton={this.Delete}
          content="Are you sure you want to delete this group?"
          title="Delete Group"
          btn_text="Delete Group"
          icon="delete_white"
          isDeleteGroup
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

DepartmentManagementPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  department_list: PropTypes.array,
  isMobileSize: PropTypes.bool
};
function mapStateToProps(state) {
  const { department_list } = state.department;
  const { isMobileSize } = state.global;
  return { department_list, isMobileSize };
}
export default connect(mapStateToProps)(DepartmentManagementPage);
