import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { TowniText, TowniIcons } from "../../components";
import { DashCardItem } from "./components";

const DashCard = ({ data, history }) => {
  const onCardItem = () => {
    history.push(data.link);
  };
  return (
    <DashCardItem
      backImg={data.back_img}
      backColor={data.back_color}
      onClick={onCardItem}
    >
      <div className="img-section">
        <div className="back-img">
          {_.times(30, key => (
            <img src={data.back_img} key={key} />
          ))}
        </div>
        <TowniIcons name={data.icon} />
      </div>
      <div className="text-section">
        <TowniText
          color="#FFFFFF"
          fontSize={24}
          fontWeight={500}
          lineHeight={28}
          style={{ marginBottom: 30 }}
        >
          {data.text}
        </TowniText>
        <TowniText
          color="#FFFFFF"
          fontSize={14}
          fontWeight={500}
          lineHeight={16}
          style={{ marginBottom: 20 }}
        >
          {data.sub_text}
        </TowniText>
      </div>
    </DashCardItem>
  );
};
DashCard.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object
};
export default withRouter(DashCard);
