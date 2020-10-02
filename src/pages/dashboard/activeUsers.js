import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { connect } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FlexInline, TowniText, TowniDropdown } from "../../components";
import { DashboardSection } from "./components";
import { getDocViewDate, compareDate } from "../../services";

dayjs.extend(isBetween);
// const CustomTooltip = ({ active, payload, label }) => {
//     if (active) {
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{`${label} : ${payload[0].value}`}</p>
//           <p className="intro">{getIntroOfPage(label)}</p>
//           <p className="desc">Anything you want can be displayed here.</p>
//         </div>
//       );
//     }

//     return null;
// };
class ActiveUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 1
    };
  }
  getTotalUsers = (day1, day2, data) => {
    return data
      .filter(a => dayjs(a.loginDate).isBetween(day1, day2))
      .reduce((a, b) => a + b.noOfUser, 0);
  };
  getChartData = () => {
    const { data } = this.props;
    const { duration } = this.state;
    const now = dayjs();
    data.sort((a, b) => compareDate(b.loginDate, a.loginDate));
    let chartData;
    if (duration == 1) {
      const curMonth = dayjs(
        `${now.year()}-${now.month() + 1 - (duration - 1)}-01`
      );
      const res = data.filter(item => dayjs(item.loginDate).isAfter(curMonth));
      chartData = res.map(item => ({
        name: getDocViewDate(item.loginDate),
        users: item.noOfUser
      }));
    } else {
      chartData = _.times(duration, key => {
        const day1 = dayjs(
          `${now.year()}-${now.month() + 1 - (duration - key - 1)}-01`
        );
        const day2 = day1.endOf("month");
        return {
          name: day1.format("MMM, YYYY"),
          users: this.getTotalUsers(day1, day2, data)
        };
      });
    }
    return chartData;
  };
  render() {
    const { duration } = this.state;
    const chart_data = this.getChartData();
    const options = _.times(5, key => ({
      key: key,
      text: `Last ${key + 1} ${key == 0 ? "Month" : "Months"}`,
      value: key + 1
    }));
    return (
      <DashboardSection className="activeUser">
        <FlexInline justify="space-between" style={{ marginBottom: 20 }}>
          <TowniText
            color="#4F4F4F"
            fontSize={18}
            fontWeight={500}
            lineHeight={21}
          >
            Active Users
          </TowniText>
          <TowniDropdown
            selection
            options={options}
            value={duration}
            onChange={(e, { value }) => this.setState({ duration: value })}
            style={{ width: 180, height: 30 }}
          />
        </FlexInline>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            width={650}
            height={300}
            data={chart_data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#1297E0"
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardSection>
    );
  }
}

ActiveUsers.propTypes = {
  data: PropTypes.array
};
function mapStateToProps(state) {
  const { login_activity } = state.report;
  return {
    data: login_activity
  };
}
export default connect(mapStateToProps)(ActiveUsers);
