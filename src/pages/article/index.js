import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";
import { DashLayout } from "../../layout";
import {
  getSimplifiedDate,
  compareDate,
  getArticleTypeByID,
  utc2local
} from "../../services/utils";
import {
  getArticleTypes,
  getArticles,
  deleteArticle,
  editArticle,
  clearArticleDetail,
  updateArticleDetail
} from "../../redux/actions/article";
import { getDepartmentOptions } from "../../redux/actions/department";
import { getUsers } from "../../redux/actions/user";
import { setLoading } from "../../redux/actions/global";
import { get_task_Permission } from "../../services/permission";
import { tasks } from "../../constants/permission";
import {
  PageContainer,
  PageTitle,
  TowniTable,
  TowniIcons,
  ArticleStatus,
  TowniPagination,
  TowniDropdown,
  TowniText,
  FlexInline,
  DateRangePicker,
  SearchInput,
  SimpleButton,
  SuccessModal,
  ConfirmModal
} from "../../components";
import AddPostModal from "./AddPostModal";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_rows: 8,
      dateRange: null,
      searchType: "all",
      searchText: "",
      activePage: 1,
      deleteArticleID: null,
      visibleAddModal: false,
      visibleDeleteModal: false,
      visibleSuccessModal: false
    };
  }
  async componentDidMount() {
    const { dispatch, openModal, articleID } = this.props;
    dispatch(setLoading(true));
    dispatch(getDepartmentOptions());
    dispatch(getUsers());
    dispatch(getArticleTypes());
    await dispatch(getArticles());
    dispatch(setLoading(false));
    console.log(openModal);
    if (openModal) {
      this.onEditArticle(articleID);
    }
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
  onTypeChanged = (e, { value }) => {
    this.setState({ searchType: value, activePage: 1 });
  };
  onSearchTextChanged = (e, { value }) => {
    this.setState({ searchText: value, activePage: 1 });
  };

  filterArticles = () => {
    const { searchText, searchType, dateRange } = this.state;
    const { articles } = this.props;
    const startDate = dateRange ? dayjs(dateRange[0]) : null;
    const endDate = dateRange ? dayjs(dateRange[1]) : null;
    articles.sort((a, b) => compareDate(a.publishDate, b.publishDate));
    const filtered = articles.filter(item => {
      return (
        ((dateRange !== null &&
          startDate.isBefore(dayjs(item.publishDate)) &&
          dayjs(item.publishDate).isBefore(endDate)) ||
          dateRange === null) &&
        ((searchType !== "all" && item.articleType === searchType) ||
          searchType === "all") &&
        ((searchText !== "" &&
          item.articleHeadline
            .toUpperCase()
            .includes(searchText.toUpperCase())) ||
          searchText === "")
      );
    });
    return filtered;
  };
  getCurPage = (articles, start, end) => {
    articles.splice(end, articles.length - end);
    articles.splice(0, start - 1);
    return articles;
  };
  onAddPost = () => {
    const { dispatch } = this.props;
    dispatch(clearArticleDetail());
    this.setState({ visibleAddModal: true });
  };
  onCloseAddModal = () => {
    this.setState({ visibleAddModal: false });
  };
  onEditArticle = async id => {
    const { dispatch } = this.props;
    const res = await dispatch(editArticle(id));
    this.setState({ visibleAddModal: true });
    console.log("Adfasfasdf");
  };
  DeleteArticle = async () => {
    const { dispatch } = this.props;
    const { deleteArticleID } = this.state;
    this.setState({ deleteArticleID: null, visibleDeleteModal: false });
    dispatch(setLoading(true));
    const res = await dispatch(deleteArticle(deleteArticleID));
    dispatch(setLoading(false));
    if (res.success) this.setState({ visibleSuccessModal: true });
  };
  render() {
    const {
      num_rows,
      activePage,
      searchType,
      searchText,
      dateRange,
      visibleAddModal,
      visibleDeleteModal,
      visibleSuccessModal
    } = this.state;
    const { article_types, rolePermission, isMobileSize } = this.props;
    const filtered_articles = this.filterArticles();
    const totalRecords = filtered_articles.length;
    const totalPages =
      parseInt(totalRecords / num_rows) + (totalRecords % num_rows > 0 ? 1 : 0);
    const startPage = totalRecords === 0 ? 0 : (activePage - 1) * num_rows + 1;
    const lastPage =
      activePage * num_rows > totalRecords
        ? totalRecords
        : activePage * num_rows;
    this.getCurPage(filtered_articles, startPage, lastPage);
    const typeOptions = [
      { key: -1, text: "All", value: "all" },
      ...article_types.map((item, key) => ({
        key: key,
        text: item.typeValue,
        value: item.typeId
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
          <PageTitle>News & Alerts</PageTitle>
          <FlexInline justify="space-between">
            <FlexInline>
              <DateRangePicker
                value={dateRange}
                onChange={this.onDateRangeChanged}
                right={20}
                top={10}
              />
              <TowniDropdown
                selection
                options={typeOptions}
                value={searchType}
                onChange={this.onTypeChanged}
                style={{
                  width: 120,
                  marginRight: 20,
                  marginTop: 10,
                  height: 40
                }}
              />
              <SearchInput
                value={searchText}
                onChange={this.onSearchTextChanged}
                onClear={() => this.setState({ searchText: "" })}
                style={{ marginRight: 20, marginTop: 10 }}
              />
            </FlexInline>
            <SimpleButton onClick={this.onAddPost} style={{ marginTop: 10 }}>
              Add New Post
            </SimpleButton>
          </FlexInline>

          <TowniTable className={isMobileSize ? "center" : ""}>
            <TowniTable.Header>
              <TowniTable.Row>
                <TowniTable.HeaderCell className="center">
                  Display Date
                </TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Type</TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Receiver</TowniTable.HeaderCell>
                <TowniTable.HeaderCell>Headline Text</TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Status
                </TowniTable.HeaderCell>
                <TowniTable.HeaderCell className="center">
                  Actions
                </TowniTable.HeaderCell>
              </TowniTable.Row>
            </TowniTable.Header>
            <TowniTable.Body>
              {filtered_articles.map((item, key) => (
                <TowniTable.Row key={key}>
                  <TowniTable.Cell className="center date-cell" collapsing>
                    {getSimplifiedDate(utc2local(item.publishDate))}
                  </TowniTable.Cell>
                  <TowniTable.Cell className="type-cell">
                    {getArticleTypeByID(item.articleType, article_types)}
                  </TowniTable.Cell>
                  <TowniTable.Cell className="receiver-cell">
                    {item.deptList}
                  </TowniTable.Cell>
                  <TowniTable.Cell>{item.articleHeadline}</TowniTable.Cell>
                  <TowniTable.Cell collapsing>
                    <ArticleStatus status={item.status} />
                  </TowniTable.Cell>
                  <TowniTable.Cell collapsing className="center">
                    <TowniIcons
                      name="edit"
                      onClick={() => this.onEditArticle(item.articleId)}
                    />
                    {rolePermission !== null &&
                      get_task_Permission(
                        tasks.article_delete,
                        rolePermission.functionName
                      ) && (
                        <TowniIcons
                          name="delete"
                          onClick={() =>
                            this.setState({
                              deleteArticleID: item.articleId,
                              visibleDeleteModal: true
                            })
                          }
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
        <AddPostModal
          visible={visibleAddModal}
          onClose={this.onCloseAddModal}
        />
        <ConfirmModal
          visible={visibleDeleteModal}
          title="Confirm Delete"
          content="Are you sure you want to delete this post?"
          onClose={() => this.setState({ visibleDeleteModal: false })}
          onContinue={this.DeleteArticle}
        />
        <SuccessModal
          visible={visibleSuccessModal}
          onClose={() => this.setState({ visibleSuccessModal: false })}
          text="Post successfully deleted."
        />
      </DashLayout>
    );
  }
}

ArticlePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  articles: PropTypes.array,
  article_types: PropTypes.array,
  isMobileSize: PropTypes.bool,
  openModal: PropTypes.bool,
  articleID: PropTypes.number
};
function mapStateToProps(state) {
  const { articles, article_types, openModal, articleID } = state.article;
  const { isMobileSize } = state.global;
  const { rolePermission } = state.me;
  return {
    articles,
    article_types,
    rolePermission,
    isMobileSize,
    openModal,
    articleID
  };
}
export default connect(mapStateToProps)(ArticlePage);
