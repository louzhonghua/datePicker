import React from "react";
import { useDroppable } from "@dnd-kit/core";
import PropTypes from "prop-types";

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "1",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

Droppable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Droppable;
