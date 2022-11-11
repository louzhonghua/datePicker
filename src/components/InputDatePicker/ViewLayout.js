import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {spacing} from '../../utils';

//日历组件分为日历头部、日历主体、日历尾部三部分
//搭建基本结构
//外层容器设置为flex布局，主轴为垂直方向
const ViewLayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
//日历头部flex布局，主轴为水平方向且两端对齐
const ViewLayoutHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
`;
//日历主体部分自适应高度
const ViewLayoutBody = styled.div`
    flex: 1;
`; 
const ViewLayoutFooter = styled.div`
    &:before {
        content: '';
        border-top: 1px solid #ccc;
        display: block;
        margin-bottom: ${spacing.padding.normal};
    }
`;

function ViewLayout(props) {
    //解构props,共分为三部分，头部、主体、尾部，头部又分为左中右三部分
    const {header, bodyElement, footerElement} = props;
    const {leftElement, centerElement, rightElement} = header;
  return (
    <ViewLayoutWrapper>
        <ViewLayoutHeader>
            <div>{leftElement}</div>
            <div>{centerElement}</div>
            <div>{rightElement}</div>
        </ViewLayoutHeader>
        <ViewLayoutBody>
            {bodyElement}
        </ViewLayoutBody>
        <ViewLayoutFooter>
            {footerElement}
        </ViewLayoutFooter>
    </ViewLayoutWrapper>
  )
}

ViewLayout.propTypes = {
    header: PropTypes.shape({ 
        leftElement: PropTypes.element,
        centerElement: PropTypes.element,
        rightElement: PropTypes.element,
    }),
    bodyElement: PropTypes.element,
    footerElement: PropTypes.element,
}

export default ViewLayout
