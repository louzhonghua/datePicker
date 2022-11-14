import React from "react";
import PropTypes from "prop-types";
import MonthPicker from "./MonthPicker";
import ViewLayout from "./ViewLayout";
import { TertiaryIconButton, TertiaryButton } from "../Button";
import HeaderTitle from "./HeaderTitle";

function MonthYearView(props) {
  const { calendar, onMonthChange, onTitleClick, onYearChange, onTodayClick } =
    props;
  const { year, month } = calendar;
  //点击前一月按钮
  return (
    <ViewLayout
      header={{
        leftElement: (
          <TertiaryIconButton
            icon="arrowleft"
            onClick={() => onMonthChange(month - 1)}
          ></TertiaryIconButton>
        ),
        centerElement: (
          <HeaderTitle
            month={month}
            year={year}
            onTitleClick={onTitleClick}
            withYearPick
            onYearChange={onYearChange}
          />
        ),
        rightElement: (
          <TertiaryIconButton
            icon="arrowright"
            onClick={() => onMonthChange(month + 1)}
          ></TertiaryIconButton>
        ),
      }}
      bodyElement={
        <MonthPicker selectedMonth={month} onMonthChange={onMonthChange} />
      }
      footerElement={<TertiaryButton onClick={onTodayClick}>today</TertiaryButton>}
    />
  );
}

MonthYearView.propTypes = {
  calendar: PropTypes.object,
  onMonthChange: PropTypes.func,
  onTitleClick: PropTypes.func,
  onYearChange: PropTypes.func,
  onTodayClick: PropTypes.func,
};

export default MonthYearView;
