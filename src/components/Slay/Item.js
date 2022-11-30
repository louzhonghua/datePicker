import React from "react";
import PropTypes from "prop-types";

import "./Item.css";

const Item = ({ id, dragOverlay }) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div style={style} className="item">
      Item {id}
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  dragOverlay: PropTypes.bool,
};

export default Item;
