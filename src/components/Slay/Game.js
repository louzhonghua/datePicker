import React from "react";
import PropTypes from "prop-types";
import GameContext from "./GameContext";
import Slay from "./Slay";
import Player from "./Player";
import { useSetState } from "../UseSetState/hooks";
import DragAndDrop from "./DragAndDrop";
import LessonTable from "./LessonTable";

function Game(props) {
  const { Provider } = GameContext;
  const initHp = 80;
  const initStrength = 1;
  const initActionPoints = 3;
  const [userState, setUserState] = useSetState({
    hp: initHp,
    actionPoint: initActionPoints,
    baseStrength: initStrength,
  });

  //改变用户血量
  const changeHp = (props) =>
    setUserState((state) => ({ hp: state.hp + props }));
  //改变用户攻击力
  const changeStrength = (props) =>
    setUserState((state) => ({ baseStrength: state.baseStrength + props }));
  //改变用户行动力
  const changeActionPoint = (props) =>
    setUserState((state) => ({ actionPoint: state.actionPoint + props }));

  return (
    <Provider
      value={{ ...userState, changeHp, changeStrength, changeActionPoint }}
    >
      <Player></Player>
      <Slay></Slay>
      <LessonTable />
    </Provider>
    // <DragAndDrop></DragAndDrop>
  );
}

Game.propTypes = {};

export default Game;
