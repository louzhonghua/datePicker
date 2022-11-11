import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { generateCalendarByWeek, buildDayNames } from './generator'
import { getDate, isSameDay } from 'date-fns';
import { TertiaryButton } from '../Button';
import styled, { css } from 'styled-components'
import { spacing, defaultTheme } from '../../utils';
import tint from 'polished/lib/color/tint';

const CalendarDay = styled(TertiaryButton)`
  height: 2.4rem,
  width: 2.4rem,
  padding: 0;
  line-height: 2.4rem;
  border-radius: 50%;
  border: none;
  ${props => props.isToday && css`
    background-color: ${tint(0.9, defaultTheme.primaryColor)};
    border: 1px solid ${defaultTheme.primaryColor};
  `}
  ${props => !props.isCurrentMonth && css`
    opacity: 0.5;
  `}
  ${props => props.isSelected && css`
    background-color: ${defaultTheme.primaryColor};
    color: ${defaultTheme.textColorInverted};
    `}
`

//给tr设置行高
const CalendarRow = styled.tr`
  height: 3.6rem;
  text-align: center;
  `

// 给表头添加样式
const CalendarHeader = styled.tr`
  &:after {
    content: '';
    width: 100%;
    border-bottom: 1px solid #ccc;
    position: absolute;
    left: 0;
    height: 3rem;
  }
  th {
    padding-bottom: ${spacing.padding.medium};
  }
`

// 给父元素设置相对定位
const CalendarWrapper = styled.table`
  position: relative;
`

function DatePicker(props) {
  const { calendar, selectedDate } = props;
  const { year, monthIndex } = calendar;
  const weeks = useMemo(() => generateCalendarByWeek(year, monthIndex), [year, monthIndex]);
  //将weeks按照六行七列的形式渲染出来
  const dayNames = buildDayNames(1);
  return (
    <CalendarWrapper>
      <thead>
        <CalendarHeader>
          {dayNames.map((dayName, index) => (<th key={index}>{dayName}</th>))}
        </CalendarHeader>
      </thead>
      <tbody>
        {weeks.map((week, i) => (
          <CalendarRow key={i}>
            {week.map((day, j) => {
              // 判断当前日期是否是今天
              const isToday = getDate(day) === getDate(new Date());
              // 当前日期是否在当前月份
              const isCurrentMonth = day.getMonth() === monthIndex;
              // 判断当前日期是否被选中
              const isSelected = isSameDay(day, selectedDate);
              return (
                <td key={j}>
                  <CalendarDay isToday={isToday} isCurrentMonth={isCurrentMonth} isSelected={isSelected}>
                    {getDate(day)}
                  </CalendarDay>
                </td>
              )
            })}
          </CalendarRow>
        ))}
      </tbody>
    </CalendarWrapper>
  )
}

DatePicker.propTypes = {
  calendar: PropTypes.shape({
    year: PropTypes.number,
    monthIndex: PropTypes.number,
  }),
  selectedDate: PropTypes.instanceOf(Date),
}

export default DatePicker
