import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { TertiaryButton } from "../Button";
import DropdownButton from "../DropdownButton";
import YearPick from "./YearPick";
import styled from "styled-components";
import { spacing } from "../../utils";

//该组件子元素flex布局，项目在主轴对齐
const HeaderTitleLayout = styled.div`
  display: flex;
  align-items: center;
`;
const MonthLabel = styled.span`
  margin-right: ${spacing.padding.small};
`;

function HeaderTitle(props) {
  //传入参数有年和月
  const { year, month, onTitleClick, withYearPick, onYearChange } = props;
  //当前年和月的第一天
  const firstDay = new Date(year, month);
  // 月份显示内容
  const monthText = format(firstDay, "MMMM");
  // 年份显示内容,
  const yearText = format(firstDay, "yyyy");
  //如果傳入withYearPick，則顯示年份選擇器
  if (withYearPick) {
    return (
      <HeaderTitleLayout>
        <MonthLabel><span onClick={onTitleClick}>{monthText}</span></MonthLabel>
        <DropdownButton title={yearText}>
          <YearPick selectedYear={year} onYearChange={onYearChange}/>
        </DropdownButton>
      </HeaderTitleLayout>
    );
  }
  return (
    <TertiaryButton modifiers={["small"]} onClick={() => onTitleClick()}>
      <span style={{ paddingRight: "1rem" }}>{yearText}</span>
      <span>{monthText}</span>
    </TertiaryButton>
  );
}

HeaderTitle.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onTitleClick: PropTypes.func,
  withYearPick: PropTypes.bool,
  onYearChange: PropTypes.func,
};

export default HeaderTitle;
