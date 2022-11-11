import React from 'react'
import PropTypes from 'prop-types'
import DateView from './DateView'
import { spacing } from '../../utils';
import styled from 'styled-components';

//给布局组件外面套一层父元素，用来控制日历组件的宽和高
const PickerWrapper = styled.div`
    width: 45rem;
    height: 45rem;
    padding: ${spacing.padding.normal};
    border: 1px solid #ccc;
    `;
function InputDatePicker(props) {
  return (
    <PickerWrapper>
      <DateView />
    </PickerWrapper>
  )
}

InputDatePicker.propTypes = {}

export default InputDatePicker
