import React from 'react'
import PropTypes from 'prop-types'
import DateView from './DateView'
import { spacing } from '../../utils';
import styled from 'styled-components';
import Calendar from './Calendar';


function InputDatePicker(props) {
  return (
    <Calendar />
  )
}

InputDatePicker.propTypes = {}

export default InputDatePicker
