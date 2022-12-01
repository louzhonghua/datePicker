import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Symbol from "./Symbol";
import { getDefaultTheme } from "./theme";
import "./sheep.scss";

const maxLevel = 20;

function Sheep(props) {
  //生成随机字符串
  const randomString = (length) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };
  // 随机位置、偏移量
  const randomPositionOffset = (offsetPool, range) => {
    const offset = offsetPool[Math.floor(offsetPool.length * Math.random())];
    const row = range[0] + Math.floor((range[1] - range[0]) * Math.random());
    const column = range[0] + Math.floor((range[1] - range[0]) * Math.random());
    return { offset, row, column };
  };
  //制作场景，8*8的格子
  const sceneRanges = [
    [2, 6],
    [1, 6],
    [1, 7],
    [0, 7],
    [0, 8],
  ];
  const offsets = [0, 25, -25, 50, -50];
  const makeScene = (level, icons) => {
    // 初始图标x2
    const iconPool = icons.slice(0, 2 * level);
    const offsetPool = offsets.slice(0, 1 + level);
    console.log("🚀 ~ file: Sheep.js:39 ~ makeScene ~ offsetPool", offsetPool);
    const scene = [];
    // 网格范围，随等级由中心扩满
    const range = sceneRanges[Math.min(4, level - 1)];
    console.log("🚀 ~ file: Sheep.js:42 ~ makeScene ~ range", range);
    // 在范围内随机摆放图标
    const randomSet = (icon) => {
      const { offset, row, column } = randomPositionOffset(offsetPool, range);
      console.log(
        "🚀 ~ file: Sheep.js:47 ~ randomSet ~  offset, row, column",
        offset,
        row,
        column
      );
      scene.push({
        isCover: false,
        status: 0,
        icon,
        id: randomString(6),
        x: column * 100 + offset,
        y: row * 100 + offset,
      });
    };
    // 每间隔5级别增加icon池
    let compareLevel = level;
    while (compareLevel > 0) {
      iconPool.push(...iconPool.slice(0, Math.min(10, 2 * (compareLevel - 5))));
      compareLevel -= 5;
    }
    // icon池中每个生成六张卡片
    for (const icon of iconPool) {
      for (let i = 0; i < 6; i++) {
        randomSet(icon);
      }
    }
    return scene;
  };
  const iniScene = makeScene(1, getDefaultTheme().icons);
  console.log("🚀 ~ file: Sheep.js:66 ~ Sheep ~ iniScene", iniScene);
  //初始化覆盖状态
  useEffect(() => {
    checkCover(scene);
  }, []);
  //向后检查覆盖
  const checkCover = (scene) => {
    const updateScene = scene.slice();
    for (let i = 0; i < updateScene.length; i++) {
      // 当前item对角坐标
      const cur = updateScene[i];
      cur.isCover = false;
      if (cur.status !== 0) continue;
      const { x: x1, y: y1 } = cur;
      const x2 = x1 + 100,
        y2 = y1 + 100;

      for (let j = i + 1; j < updateScene.length; j++) {
        const compare = updateScene[j];
        if (compare.status !== 0) continue;
        // 两区域有交集视为选中
        // 两区域不重叠情况取反即为交集
        const { x, y } = compare;
        if (!(y + 100 <= y1 || y >= y2 || x + 100 <= x1 || x >= x2)) {
          cur.isCover = true;
          break;
        }
      }
    }
    setScene(updateScene);
  };
  const [scene, setScene] = useState(iniScene);
  const [queue, setQueue] = useState([]);
  const [sortedQueue, setSortedQueue] = useState({});
  const [finished, setFinished] = useState(false);
  const [success, setSuccess] = useState(false);
  const [level, setLevel] = useState(1);
  console.log("🚀 ~ file: Sheep.js:101 ~ Sheep ~ sortedQueue", sortedQueue);
  //点击item
  const clickSymbol = (id) => {
    const updateScene = scene.slice();
    const symbol = updateScene[id];
    //如果当前item被覆盖，不做处理
    if (symbol.isCover || symbol.status !== 0) return;
    //将选中item的status置为1,此时该item被放入下面的队列中
    symbol.status = 1;
    //将点击项目加入队列
    let updateQueue = queue.slice();
    updateQueue.push(symbol);
    console.log(
      "🚀 ~ file: Sheep.js:109 ~ clickSymbol ~ updateQueue",
      updateQueue
    );
    setQueue(updateQueue);
    checkCover(updateScene);
    // 查找当前队列中与点击项相同的
    const filterSame = updateQueue.filter((sb) => sb.icon === symbol.icon);

    // 后续状态判断
    // 三连了
    if (filterSame.length === 3) {
      // 三连一次+3分
      updateQueue = updateQueue.filter((sb) => sb.icon !== symbol.icon);
      for (const sb of filterSame) {
        const find = updateScene.find((i) => i.id === sb.id);
        if (find) {
          find.status = 2;
        }
      }
    }

    // 输了
    if (updateQueue.length === 7) {
      setFinished(true);
      setSuccess(false);
    }

    if (!updateScene.find((s) => s.status !== 2)) {
      // 队列清空了
      if (level === maxLevel) {
        // 胜利
        setFinished(true);
        setSuccess(true);
      } else {
        // 升级
        // 通关奖励关卡对应数值分数
        setQueue([]);
        checkCover(makeScene(level + 1, getDefaultTheme().icons));
      }
    } else {
      // 更新队列
      setQueue(updateQueue);
      checkCover(updateScene);
    }
  };
  // 队列区排序
  useEffect(() => {
    const cache = {};
    // 加上索引，避免以id字典序来排
    const idx = 0;
    for (const symbol of queue) {
      if (cache[idx + symbol.icon.name]) {
        cache[idx + symbol.icon.name].push(symbol);
      } else {
        cache[idx + symbol.icon.name] = [symbol];
      }
    }
    console.log(
      "🚀 ~ file: Sheep.js:178 ~ useEffect ~ cache",
      Object.values(cache)
    );

    const temp = [];
    for (const symbols of Object.values(cache)) {
      temp.push(...symbols);
    }
    const updateSortedQueue = {};
    let x = 50;
    for (const symbol of temp) {
      updateSortedQueue[symbol.id] = x;
      x += 100;
    }
    setSortedQueue(updateSortedQueue);
  }, [queue]);
  return (
    <div>
      <div className="game">
        <div className="scene-container">
          <div className="scene-inner">
            {scene.map((item, idx) => (
              <Symbol
                key={item.id}
                {...item}
                x={
                  item.status === 0
                    ? item.x
                    : item.status === 1
                    ? sortedQueue[item.id]
                    : -1000
                }
                y={item.status === 0 ? item.y : 945}
                onClick={() => clickSymbol(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="queue-container" />
    </div>
  );
}

Sheep.propTypes = {};

export default Sheep;
