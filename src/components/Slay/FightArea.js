import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Droppable from "./Dropable";

//创建一个高为50rem的div，背景色为#f5deb3
const Container = styled.div`
  width: 100%;
  height: 50rem;
  background-color: #f5deb3;
`;

function FightArea(props) {
  return (
    <Droppable id={"1"}>
      <Container>FightArea</Container>
    </Droppable>
  );
}

FightArea.propTypes = {};

export default FightArea;
