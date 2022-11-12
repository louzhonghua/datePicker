import React, { useState } from "react";
import Calendar from "./Calendar";
import FocusManage from "./FocusManage";

function InputDatePicker(props) {
  //控制日历组件的显示和隐藏
  const [showPicker, setShowPicker] = useState(false);
  //点击输入框时，显示日历组件
  const onInputClick = () => {
    setShowPicker(true);
  };
  //点击日历组件外面时，隐藏日历组件
  const onWrapperClick = () => {
    setShowPicker(false);
  };
  //点击输入框focus时，显示日历组件
  const onInputFocus = () => {
    onInputClick();
  };
  //点击输入框blur时，隐藏日历组件
  const onInputBlur = () => {
    onWrapperClick();
  };
  return (
    <FocusManage onFocus={onInputFocus} onBlur={onInputBlur}>
      <input />
      {
        showPicker && <Calendar />
      }
    </FocusManage>
  );
}

InputDatePicker.propTypes = {};

export default InputDatePicker;
