import React from 'react'
import PropTypes from 'prop-types'
import ViewLayout from './ViewLayout'
import DatePicker from './DatePicker'
import { TertiaryButton, TertiaryIconButton } from '../Button'

//使用ViewLayout组件，将日历头部、主体、尾部三部分组合在一起
//主体为我们之前写的DatePicker组件
function DateView(props) {
    return (
        <ViewLayout
            header={{
                leftElement: <TertiaryIconButton icon='arrowLeft'>上一月</TertiaryIconButton>,
                centerElement: <span>2019年8月</span>,
                rightElement: <TertiaryIconButton icon='arrowRight'>下一月</TertiaryIconButton>,
            }}
            bodyElement={<DatePicker
                calendar={{ year: 2022, monthIndex: 11 }}
                selectedDate={new Date(2022, 11, 11)} />}
            footerElement={<TertiaryButton>today</TertiaryButton>}
        />
    )
}

DateView.propTypes = {}

export default DateView
