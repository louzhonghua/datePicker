import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Draggable from "./Draggable";
import SortableItem from "./SortableItem";

const Container = styled.div`
  width: 5rem;
  height: 10rem;
  border: 1px solid black;
  background-color: #f5deb3;
  margin: 0 1rem;
`;
const NameAndCost = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DetailContainer = styled.div`
  width: 5rem;
  height: 8rem;
  line-height: 8rem;
`;
const CostSpan = styled.span`
  color: red;
`;
const NameSpan = styled.span`
  background-color: #63dee5;
  color: #ffffff;
`;
function PlayerCard(props) {
  //props解构出name、detail、cost
  const { name, detail, cost, id } = props;
  return (
    <SortableItem id={id} key={id} {...props}>
      <Container>
        <NameAndCost>
          <NameSpan>{name}</NameSpan>
          <CostSpan>{cost}</CostSpan>
        </NameAndCost>
        <DetailContainer>{detail}</DetailContainer>
      </Container>
    </SortableItem>
  );
}

PlayerCard.propTypes = {
  //name、detail、cost是必须的
  name: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default PlayerCard;
