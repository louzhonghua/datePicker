import { isFunction } from "lodash";
import { useState } from "react";

//useSetState用于将多个useState合并成一个
export const useSetState = (initialState = {}) => {
  const [state, setState] = useState(initialState);
  //首先我们需要明确setMergedState的作用，就是将传入的对象合并到state中，同时我们还需要考虑setMergedState
  //传入的对象可能是一个函数，这个函数的参数就是state，所以我们需要判断传入的对象是否是一个函数，如果是函数
  const setMergedState = (newState) => {
    const latestState = isFunction(newState) ? newState(state) : newState;
    setState((prevState) => Object.assign({}, prevState, latestState));
  };

  return [state, setMergedState];
};
