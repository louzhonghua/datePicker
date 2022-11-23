import React, { useState } from 'react'
import PropTypes from 'prop-types'
import options from './data'
import styled from 'styled-components'

//为textarea添加样式
const Textarea = styled.textarea`
  position: relative;
  top: 2rem;
`
//该组件分为三级，每一级都是一个下拉框，每一级的下拉框的选项都是根据上一级的选项来确定的
function Cascader(props) {
  //控制第二级下拉框的显示项
  const [secondOptions, setSecondOptions] = useState('hangzhou')
  //控制第三级下拉框的显示项
  const [thirdOptions, setThirdOptions] = useState('xihu')
  //找出options中第一级的选项
  const firstOptions = options.map((item) => {
    return {
      value: item.value,
      label: item.label
    }
  })
  firstOptions.unshift({ value: '', label: '请选择' })
  //找到第一级选项中被选中的选项下面的children的方法
  const findChildren = (value) => {
    const item = options.find((item) => item.value === value)
    if (item?.children) {
      return prepend(item.children, { value: '', label: '请选择' })
    } else {
      return []
    }
  }
  function prepend(arr, item) {
    var newArr = arr.concat()
    newArr.unshift(item)
    return newArr
  }
  //通过选项的value值通过递归的方法找到options对应item的children
  function deepQuery(tree, value) {
    var retNode = null
    if (!value) {
      return []
    }
    function deepSearch(tree, value) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i].children && tree[i].children.length > 0) {
          deepSearch(tree[i].children, value)
        }
        if (value === tree[i].value) {
          retNode = tree[i]
          break
        }
      }
    }
    deepSearch(tree, value)
    return retNode?.children || []
  }

  console.log(
    '🚀 ~ file: Cascader.js ~ line 101 ~ { ~ thirdOptions',
    deepQuery(options, 'sasasass')
  )
  //将第一级选项使用下拉框展示出来，同时将第一级选项中被选中的选项下面的children作为第二级选项
  return (
    <div>
      <select
        onChange={(e) => {
          setSecondOptions(e.target.value)
          setThirdOptions('')
        }}>
        {firstOptions?.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
      <select onChange={(e) => setThirdOptions(e.target.value)}>
        {findChildren(secondOptions)?.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
      {deepQuery(options, thirdOptions).map((item) => {
        return <Textarea key={item.value}>{item.label}</Textarea>
      })}
    </div>
  )
}

Cascader.propTypes = {}

export default Cascader
