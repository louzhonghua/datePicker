import React from 'react'
import PropTypes from 'prop-types'
import ViewLayout from './ViewLayout'
import DatePicker from './DatePicker'
import { TertiaryButton, TertiaryIconButton } from '../Button'
import HeaderTitle from './HeaderTitle'

//使用ViewLayout组件，将日历头部、主体、尾部三部分组合在一起
//主体为我们之前写的DatePicker组件
function DateView(props) {
    const { calendar, onYearMonthChange, onTitleClick } = props;
    const { year, month } = calendar;
    //跳转到当前月的前一月
    const toPrevMonth = () => {
        if (month === 0) {
            onYearMonthChange({ year: year - 1, month: 11 })
        } else {
            onYearMonthChange({ year, month: month - 1 })
        }
    };
    //跳转到当前月的后一月
    const toNextMonth = () => {
        if (month === 11) {
            onYearMonthChange({ year: year + 1, month: 0 })
        } else {
            onYearMonthChange({ year, month: month + 1 })
        }
    };

    return (
        <ViewLayout
            header={{
                leftElement: <TertiaryIconButton icon='arrowleft' onClick={toPrevMonth} />,
                centerElement:
                    <HeaderTitle
                        year={year}
                        month={month}
                        onTitleClick={onTitleClick}
                    />,
                rightElement: <TertiaryIconButton icon='arrowright' onClick={toNextMonth} />,
            }}
            bodyElement={<DatePicker
                calendar={{ year, monthIndex: month }}
                selectedDate={new Date()} />}
            footerElement={<TertiaryButton>today</TertiaryButton>}
        />
    )
}

DateView.propTypes = {
    calendar: PropTypes.shape({
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
    }).isRequired,
    onYearMonthChange: PropTypes.func,
    onTitleClick: PropTypes.func,
}

export default DateView
