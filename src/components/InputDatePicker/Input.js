import React, { useContext } from "react";
import PropTypes from "prop-types";
import DateContext from "./DateContext";

function Input(props) {
  const { value, onTextInputChange } = useContext(DateContext);
  return <div>
    <input type="text" value={value.textInput} onChange={onTextInputChange} />
  </div>;
}

Input.propTypes = {
    onTextInputChange: PropTypes.func,
};

export default Input;
