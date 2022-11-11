import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from './DatePicker'

function InputDatePicker(props) {
  return (
    <div>
        <DatePicker calendar={{year: 2022, monthIndex: 11}} selectedDate={new Date(2022,11,5)}/>
    </div>
  )
}

InputDatePicker.propTypes = {}

export default InputDatePicker
