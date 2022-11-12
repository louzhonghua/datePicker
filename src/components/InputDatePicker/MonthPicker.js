import React from "react";
import PropTypes from "prop-types";
import { buildMonths } from "./generator";
import styled from "styled-components";
import { TertiaryButton } from "../Button";
import { selectedStyle } from "./minins";

//为table添加样式 单元格边框重合在一起 离底部3rem距离
const MonthPickerWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 3rem;
`;
//为每个单元格td添加样式
const MonthCell = styled.td`
  width: 33.3%;
  border: 1px solid #ccc;
`;

//为单元格里面的元素加上button样式,样式继承TertiaryButton 给当前月份按钮添加样式
const MonthCellButton = styled(TertiaryButton)`
  height: 5.7rem;
  width: 100%;
  padding: 0;
  font-size: 1.2rem;
  ${selectedStyle}
`;

function MonthPicker(props) {
  const { selectedMonth, onMonthChange } = props;
  //月份
  const months = buildMonths();
  return (
    <MonthPickerWrapper>
      {months.map((row, i) => (
        <tr key={i}>
          {row.map((month, _) => {
            //month是否是当前月份
            const isSelected = month.monthIndex === selectedMonth;
            return (
              <MonthCell key={month.monthIndex}>
                <MonthCellButton
                  onClick={() => onMonthChange(month.monthIndex)}
                  isSelected={isSelected}
                >
                  {month.monthName}
                </MonthCellButton>
              </MonthCell>
            );
          })}
        </tr>
      ))}
    </MonthPickerWrapper>
  );
}

MonthPicker.propTypes = {
  selectedMonth: PropTypes.number,
  onMonthChange: PropTypes.func,
};

export default MonthPicker;
