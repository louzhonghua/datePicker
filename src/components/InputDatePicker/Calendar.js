import React, { useState } from "react";
import PropTypes from "prop-types";
import DateView from "./DateView";
import { spacing } from "../../utils";
import styled from "styled-components";
import MonthYearView from "./MonthYearView";

//给布局组件外面套一层父元素，用来控制日历组件的宽和高
const PickerWrapper = styled.div`
  width: 45rem;
  height: 45rem;
  padding: ${spacing.padding.normal};
  border: 1px solid #ccc;
`;

function Calendar(props) {
  const [isDateView, setDateView] = useState(true);
  //当前日期
  const now = new Date();
  //当前年份
  const nowYear = now.getFullYear();
  //当前月份
  const nowMonth = now.getMonth();
  //日期初始年月
  const iniCalendar = { year: nowYear, month: nowMonth };
  const [calendar, setCalendar] = useState(iniCalendar);
  //当月份改变时，更新日历
  const onMonthChange = (month) => {
    setCalendar({ ...calendar, month });
  };
  //当年份改变时，更新日历
    const onYearChange = (year) => {
    setCalendar({ ...calendar, year });
    };
  //当点击年份时，切换到月份视图
  const onYearClick = () => {
    setDateView(false);
  };
  //当点击月份时，切换到日期视图
  const onMonthClick = () => {
    setDateView(true);
  };
  return (
    <div>
      <PickerWrapper>
        {isDateView ? (
          <DateView
            calendar={calendar}
            onYearMonthChange={setCalendar}
            onTitleClick={onYearClick}
          />
        ) : (
          <MonthYearView
            onMonthChange={onMonthChange}
            calendar={calendar}
            onTitleClick={onMonthClick}
            onYearChange={onYearChange}
          />
        )}
      </PickerWrapper>
    </div>
  );
}

Calendar.propTypes = {};

export default Calendar;
