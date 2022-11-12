import React from 'react'
import PropTypes from 'prop-types'

function FocusManage(props) {
    let timeOutId = null;
    //当focus时，在定时器中执行传入的focus函数
    const onFocus = (e) => {
        if (timeOutId !== null) {
            clearTimeout(timeOutId);
        }
        props.onFocus(e);
    }
    //当blur时，在定时器中执行传入的blur函数
    const onBlur = (e) => {
        //如果想要异步访问时间属性，你需要再事件上调用event.persist()，这样事件就会被从池中移除，允许用户代码保留对事件的引用。
        e.persist();
        timeOutId = setTimeout(() => {
            props.onBlur(e);
        }, 0);
    }
  return (
    <div onFocus={onFocus} onBlur={onBlur}>
        {props.children}
    </div>
  )
}

FocusManage.propTypes = {
    children: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
}

export default FocusManage
