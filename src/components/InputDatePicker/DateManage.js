import React, { useState } from "react";
import PropTypes from "prop-types";
import DateContext from "./DateContext";
import { formatDate, parseDate } from "./date-ulits";

function DateManage(props) {
  const { Provider } = DateContext;
  const [calendarState, setCalendarState] = useState({
    date: null,
    textInput: "",
  });
  //用户选择日期的时候，更新calendarState
  const onDateChange = (e, date) => {
    const newCalendarState = { date, textInput: formatDate(date) };
    setCalendarState(newCalendarState);
    if (props.onDateChange) {
      props.onDateChange(e, newCalendarState);
    }
  };
  //用户输入日期的时候，更新calendarState
  const onTextInputChange = (e) => {
    const textInput = e.target.value;
    let date = null;
    let errors = [];
    //如果当前输入的日期格式不正确，会抛出错误
    if (textInput) {
      try {
        date = parseDate(textInput);
      } catch (e) {
        errors = e;
      }
    }
    const newState = { date, textInput };
    setCalendarState(newState);
    if (props.onDateChange) {
      props.onDateChange(e, { ...newState, errors });
    }
  };
  return (
    <Provider
      value={{
        value: calendarState,
        onDateChange,
        onTextInputChange,
      }}
    >
      {props.children}
    </Provider>
  );
}

DateManage.propTypes = {
  children: PropTypes.node,
  onDateChange: PropTypes.func,
};

export default DateManage;
