import React, { useState, createRef, useEffect, useContext } from "react";
import DateView from "./DateView";
import { spacing } from "../../utils";
import styled from "styled-components";
import MonthYearView from "./MonthYearView";
import DateContext from "./DateContext";
import { startOfDay } from "date-fns";

//给布局组件外面套一层父元素，用来控制日历组件的宽和高
const PickerWrapper = styled.div`
  width: 45rem;
  height: 45rem;
  padding: ${spacing.padding.normal};
  border: 1px solid #ccc;
`;

function Calendar(props) {
  const [isDateView, setDateView] = useState(true);
  const {value, onDateChange} = useContext(DateContext);
  //当前日历组件ref
  const calendarRef = createRef(null);
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

  //点击today按钮时，将日历切换到当前日期
    const onTodayClick = (e) => {
        onDateChange(e, startOfDay(new Date()));
    }

  //组件挂载和切换视图时，当前日历dom元素获取焦点，否则的话dom元素从文档中被移除，焦点会丢失
  //但是实际上发现即使没有下面的代码，日历组件也不会丢失焦点，不知道为什么
  useEffect(() => {
    calendarRef.current.focus();
  }, [isDateView]);

  //tabIndex属性，用来设置元素是否可以聚焦 0表示可以聚焦
  return (
    <div>
      <PickerWrapper tabIndex={0} ref={calendarRef}>
        {isDateView ? (
          <DateView
            calendar={calendar}
            onYearMonthChange={setCalendar}
            onTitleClick={onYearClick}
            onTodayClick={onTodayClick}
          />
        ) : (
          <MonthYearView
            onMonthChange={onMonthChange}
            calendar={calendar}
            onTitleClick={onMonthClick}
            onYearChange={onYearChange}
            onTodayClick={onTodayClick}
          />
        )}
      </PickerWrapper>
    </div>
  );
}

Calendar.propTypes = {};

export default Calendar;
