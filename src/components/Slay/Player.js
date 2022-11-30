import React, { useContext } from "react";
import PropTypes from "prop-types";
import GameContext from "./GameContext";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid pink;
  width: 10rem;
  height: 10rem;
`;
//为行动点数添加样式
const ActionPoint = styled.div`
  font-size: 20px;
  color: #ff8c00;
  margin: 0.5rem;
`;
//为hp添加样式
const Hp = styled.div`
  font-size: 24px;
  color: #00ffff;
  margin: 0.5rem;
  padding-left: 2rem;
`;
//为力量点数添加样式
const StrengthPoint = styled.div`
  font-size: 16px;
  color: #ff0000;
  margin: 0.5rem;
  padding-left: 3rem;
`;

function Player(props) {
  //玩家具有的属性: hp、properties、actionPoints、baseStrength、shieldValue,从props里面解构出
  const { hp, actionPoint, baseStrength } = useContext(GameContext);
  return (
    <Container>
      <ActionPoint>{actionPoint}</ActionPoint>
      <Hp>{hp}</Hp>
      <StrengthPoint>{baseStrength}</StrengthPoint>
    </Container>
  );
}

Player.propTypes = {
  hp: PropTypes.number.isRequired,
  properties: PropTypes.array.isRequired,
  actionPoint: PropTypes.number.isRequired,
  baseStrength: PropTypes.number.isRequired,
  shieldValue: PropTypes.number.isRequired,
};

export default Player;
