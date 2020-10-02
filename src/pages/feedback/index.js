import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";
import { DashLayout } from "../../layout";
import {
  getSimplifiedDate,
  compareDate,
  utc2local
} from "../../services/utils";
import {
  getFeedbackList,
  getFeedbackDetail,
  deleteFeedback
} from "../../redux/actions/feedback";
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
  DateRangePicker,
  SearchInput,
  SuccessModal,
  ConfirmModal
} from "../../components";
import FeedbackModal from "./feedbackModal";

class FeedbackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_rows: 8,
      dateRange: null,
      searchText: "",
      activePage: 1,
      deleteFeedbackID: null,
      visibleDetailModal: false,
      visibleDeleteModal: false,
      visibleSuccessModal: false
    };
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    await dispatch(getFeedbackList());
    dispatch(setLoading(false));
  }
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };
  onRowsChanged = (e, { value }) => {
    this.setState({ num_rows: value, activePage: 1 });
  };
  onDateRangeChanged = dateRange => {
    this.setState({ dateRange: dateRange, activePage: 1 });
  };
  onSearchTextChanged = (e, { value }) => {
    this.setState({ searchText: value, activePage: 1 });
  };

  filterFeedback = () => {
    const { searchText, dateRange } = this.state;
    const { feedback_list } = this.props;
    const startDate = dateRange ? dayjs(dateRange[0]) : null;
    const endDate = dateRange ? dayjs(dateRange[1]) : null;
    feedback_list.sort((a, b) => compareDate(a.publishDate, b.publishDate));
    const filtered = feedback_list.filter(item => {
      return (
        ((dateRange !== null &&
          startDate.isBefore(dayjs(item.dateCreated)) &&
          dayjs(item.dateCreated).isBefore(endDate)) ||
          dateRange === null) &&
        ((searchText !== "" &&
          item.subject.toUpperCase().includes(searchText.toUpperCase())) ||
          searchText === "")
      );
    });
    return filtered;
  };
  getCurPage = (feedback_list, start, end) => {
    feedback_list.splice(end, feedback_list.length - end);
    feedback_list.splice(0, start - 1);
    return feedback_list;
  };
  onViewFeedback = async id => {
    const { dispatch } = this.props;
    const res = await dispatch(getFeedbackDetail(id));
    if (res === false) return;
    this.setState({ visibleDetailModal: true });
  };
  DeleteFeedback = async () => {
    const { dispatch } = this.props;
    const { deleteFeedbackID } = this.state;
    this.setState({ deleteFeedbackID: null, visibleDeleteModal: false });
    dispatch(setLoading(true));
    const res = await dispatch(deleteFeedback(deleteFeedbackID));
    dispatch(setLoading(false));
    if (res.success) this.setState({ visibleSuccessModal: true });
  };
  render() {
    const {
      num_rows,
      activePage,
      searchText,
      dateRange,
      visibleDetailModal,
      visibleDeleteModal,
      visibleSuccessModal
    } = this.state;
    const { isMobileSize } = this.props;
    const filtered_feedbacks = this.filterFeedback();
    const totalRecords = filtered_feedbacks.length;
    const totalPages =
      parseInt(totalRecords / num_rows) + (totalRecords % num_rows > 0 ? 1 : 0);
    const startPage = totalRecords === 0 ? 0 : (activePage - 1) * num_rows + 1;
    const lastPage =
      activePage * num_rows > totalRecords
        ? totalRecords
        : activePage * num_rows;
    this.getCurPage(filtered_feedbacks, startPage, lastPage);
    const rowsOptions = _.times(10, key => ({
      key: key,
      text: `${key + 5}`,
      value: key + 5
    }));
    return (
      <DashLayout>
        <PageContainer>
          <PageTitle>Feedback</PageTitle>
          <FlexInline>
            <DateRangePicker
              value={dateRange}
              onChange={this.onDateRangeChanged}
              right={20}
              top={10}
            />
            <SearchInput
              value={searchText}
              onChange={this.onSearchTextChanged}
              style={{ marginLeft: 20 }}
              onClear={() => this.setState({ searchText: "" })}
              style={{
                marginTop: 10
              }}
            />
          </FlexInline>

          <TowniTable className={isMobileSize ? "center" : ""}>
            <TowniTable.Header>
              <TowniTable.Row>
                <TowniTable.HeaderCell className="center">
                  Date Submitted
                </TowniTable.HeaderCell>
                <TowniTable.HeaderCell>From</TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Category</TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Subject</TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Actions
                </TowniTable.HeaderCell>
              </TowniTable.Row>
            </TowniTable.Header>
            <TowniTable.Body>
              {filtered_feedbacks.map((item, key) => (
                <TowniTable.Row key={key}>
                  <TowniTable.Cell className="center" collapsing>
                    {getSimplifiedDate(utc2local(item.dateCreated))}
                  </TowniTable.Cell>
                  <TowniTable.Cell>{item.firstName}</TowniTable.Cell>
                  <TowniTable.Cell>{item.categoryName}</TowniTable.Cell>
                  <TowniTable.Cell>{item.subject}</TowniTable.Cell>
                  <TowniTable.Cell collapsing className="center">
                    <TowniIcons
                      name="view"
                      onClick={() =>
                        this.onViewFeedback(item.orgUserFeedbackId)
                      }
                    />
                    <TowniIcons
                      name="delete"
                      onClick={() =>
                        this.setState({
                          deleteFeedbackID: item.orgUserFeedbackId,
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
              siblingRange={0}
              firstItem={{ content: "<<" }}
              prevItem={{ content: "<" }}
              nextItem={{ content: ">" }}
              lastItem={{ content: ">>" }}
              onPageChange={this.handlePaginationChange}
              style={{ marginTop: 10 }}
            />
            <FlexInline style={{ marginTop: 10 }}>
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
        <FeedbackModal
          visible={visibleDetailModal}
          onClose={() => this.setState({ visibleDetailModal: false })}
        />
        <ConfirmModal
          visible={visibleDeleteModal}
          title="Confirm Delete"
          content="Are you sure you want to delete this feedback?"
          onClose={() => this.setState({ visibleDeleteModal: false })}
          onContinue={this.DeleteFeedback}
        />
        <SuccessModal
          visible={visibleSuccessModal}
          onClose={() => this.setState({ visibleSuccessModal: false })}
          text="Feedback successfully deleted."
        />
      </DashLayout>
    );
  }
}

FeedbackPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  feedback_list: PropTypes.array,
  isMobileSize: PropTypes.bool
};
function mapStateToProps(state) {
  const { feedback_list } = state.feedback;
  const { isMobileSize } = state.global;
  return { feedback_list, isMobileSize };
}
export default connect(mapStateToProps)(FeedbackPage);
