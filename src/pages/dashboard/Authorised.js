import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { TowniText, FlexInline } from "../../components";
import { DashboardSection } from "./components";

const Authroised = ({ data }) => {
  const char_data = [
    {
      name: "",
      "Authorised Users": data.length === 0 ? 0 : data[0]["noOfUser"],
      "Non Authorised Users": data.length === 0 ? 0 : data[1]["noOfUser"]
    }
  ];
  return (
    <DashboardSection className="authorised">
      <TowniText
        color="#4F4F4F"
        fontSize={18}
        fontWeight={500}
        lineHeight={21}
        style={{ marginBottom: 20 }}
      >
        Authorised
      </TowniText>

      <BarChart
        width={360}
        height={230}
        data={char_data}
        style={{ margin: "0 auto" }}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="10 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Authorised Users" fill="#1297E0" barSize={20} />
        <Bar dataKey="Non Authorised Users" fill="#5AD146" barSize={20} />
      </BarChart>
      <FlexInline style={{ marginBottom: 16, marginTop: 10 }}>
        <div
          style={{
            width: 20,
            height: 20,
            background: "#1297E0",
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
          Authorised Users
        </TowniText>
      </FlexInline>
      <FlexInline>
        <div
          style={{
            width: 20,
            height: 20,
            background: "#5AD146",
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
          Non Activated Users
        </TowniText>
      </FlexInline>
    </DashboardSection>
  );
};
Authroised.propTypes = {
  data: PropTypes.array
};
function mapStateToProps(state) {
  const { user_state } = state.report;
  return {
    data: user_state
  };
}
export default connect(mapStateToProps)(Authroised);
