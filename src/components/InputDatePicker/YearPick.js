import React, { useState } from "react";
import PropTypes from "prop-types";
import { buildYears } from "./generator";
import { TertiaryButton, TertiaryIconButton } from "../Button";
import styled from "styled-components";

const YearPickLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconButton = styled(TertiaryIconButton)`
  width: 100%;
`;

const YearList = styled.ul`
  list-style: none;
  width: 100%;
`;

function YearPick(props) {
  const { selectedYear, onYearChange } = props;
  const years = buildYears(selectedYear);
  const [yearsWindow, setYearsWindow] = useState(years);

  const getMiddleYears = () => {
    const middleIndex = Math.floor(yearsWindow.length / 2);
    return yearsWindow[middleIndex];
  };

  //接收每次点击前一年按钮或后一年按钮时传入的参数，生成新的yearsWindow
  const scroll = (pageSize) => {
    setYearsWindow(buildYears(getMiddleYears() + pageSize));
  };

  //点击前一年按钮，年份列表中的年份减一
  const handleUpClick = (e) => {
    //阻止事件冒泡
    e.stopPropagation();
    scroll(-1);
  };
  //点击后一年按钮，年份列表中的年份加一
  const handleDownClick = (e) => {
    e.stopPropagation();
    scroll(1);
  };

  //给列表添加滚动事件
  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //该属性为滚动距离，向上滚动为负，向下滚动为正
    const delta = e.deltaY;
    //给滚动距离取绝对值，并且对齐取对数后四舍五入取整
    const pageSize = Math.round(Math.log(Math.abs(delta)));
    //滚动方向
    const direction = delta > 0 ? 1 : -1;
    //pageSize大于五的时候，对滚动的距离做对半处理
    scroll(pageSize > 5 ? (pageSize / 2) * direction : direction);
  };

  //点击年份的时候，更新视图中的年份
    const handleYearClick = (year) => {
    onYearChange(year);
    }

  //將years渲染在ul中
  return (
    <YearPickLayout onWheel={handleWheel}>
      <IconButton icon="arrowup" onClick={handleUpClick}></IconButton>
      <YearList>
        {yearsWindow.map((year) => (
          <li key={year}>
            <TertiaryButton onClick={() => handleYearClick(year)}>{year}</TertiaryButton>
          </li>
        ))}
      </YearList>
      <IconButton icon="arrowdown" onClick={handleDownClick}></IconButton>
    </YearPickLayout>
  );
}

YearPick.propTypes = {
  selectedYear: PropTypes.number,
    onYearChange: PropTypes.func,
};

export default YearPick;
