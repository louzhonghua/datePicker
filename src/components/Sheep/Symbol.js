import React from "react";
import PropTypes from "prop-types";
import "./symbol.scss";
//对应的icon组件
function Symbol(props) {
  const { x, y, icon, isCover, status, onClick } = props;
  return (
    <div
      className="symbol"
      style={{
        transform: `translateX(${x}%) translateY(${y}%)`,
        backgroundColor: isCover ? "#999" : "white",
        opacity: status < 2 ? 1 : 0,
      }}
      onClick={onClick}
    >
      <div className="symbol-inner" style={{ opacity: isCover ? 0.4 : 1 }}>
        {typeof icon.content === "string" ? (
          icon.content.startsWith("data:") ||
          icon.content.startsWith("/") ||
          icon.content.startsWith("http") ? (
            /*图片地址*/
            <img src={icon.content} alt="" />
          ) : (
            /*字符表情*/
            <i>{icon.content}</i>
          )
        ) : (
          /*ReactNode*/
          icon.content
        )}
      </div>
    </div>
  );
}

Symbol.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  isCover: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Symbol;
