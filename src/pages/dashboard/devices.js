import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { TowniText, FlexInline } from "../../components";
import { DashboardSection } from "./components";

const Devices = ({ data }) => {
  const chart_data = [
    {
      name: "Android Users",
      value: data.length === 0 ? 0 : data[1]["noOfUser"]
    },
    {
      name: "IOS Users",
      value: data.length === 0 ? 0 : data[0]["noOfUser"]
    }
  ];
  const total = chart_data[0].value + chart_data[1].value;
  const percent1 = parseInt((chart_data[1].value / total) * 100);
  const percent2 = parseInt((chart_data[0].value / total) * 100);
  const color = ["#E06E12", "#1297E0"];
  return (
    <DashboardSection className="devices ">
      <TowniText
        color="#4F4F4F"
        fontSize={18}
        fontWeight={500}
        lineHeight={21}
        style={{ marginBottom: 20 }}
      >
        Devices
      </TowniText>
      <PieChart
        width={300}
        height={300}
        onMouseEnter={() => {}}
        style={{ marginTop: -100, marginLeft: "auto", marginRight: "auto" }}
      >
        <Pie
          data={chart_data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#1297E0"
          paddingAngle={0}
          dataKey="value"
        >
          <Cell fill={color[0]} />
          <Cell fill={color[1]} />
        </Pie>
      </PieChart>
      <FlexInline style={{ marginBottom: 16, marginTop: 35 }}>
        <div
          style={{
            width: 20,
            height: 20,
            background: color[0],
            marginLeft: 16
          }}
        />
        <TowniText
          color="#4F4F4F"
          fontSize={18}
          fontWeight={400}
          lineHeight={21}
          style={{ marginLeft: 16 }}
        >
          Android Users
        </TowniText>
        <TowniText
          color={color[0]}
          fontSize={18}
          fontWeight={500}
          lineHeight={21}
          style={{ marginLeft: 16 }}
        >
          {percent2}%
        </TowniText>
      </FlexInline>
      <FlexInline>
        <div
          style={{
            width: 20,
            height: 20,
            background: color[1],
            marginLeft: 16
          }}
        />
        <TowniText
          color="#4F4F4F"
          fontSize={18}
          fontWeight={400}
          lineHeight={21}
          style={{ marginLeft: 16 }}
        >
          IOS Users
        </TowniText>
        <TowniText
          color={color[1]}
          fontSize={18}
          fontWeight={500}
          lineHeight={21}
          style={{ marginLeft: 16 }}
        >
          {percent1}%
        </TowniText>
      </FlexInline>
    </DashboardSection>
  );
};
Devices.propTypes = {
  data: PropTypes.array
};
function mapStateToProps(state) {
  const { user_device } = state.report;
  return {
    data: user_device
  };
}
export default connect(mapStateToProps)(Devices);
