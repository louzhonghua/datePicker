import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
/*
 * Canvas component
 */
function Canvas(props) {
  const canvasRef = useRef(null);
  const draw = () => {
    let ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 100, 100);
    ctx.clearRect(25, 25, 50, 50);
    ctx.strokeRect(50, 50, 20, 20);
  };
  //绘制一个三角形
  const drawTriangle = () => {
    let ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  };
  //绘制一个圆
  const drawCircle = () => {
    let ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    //TODO 这块应该怎么理解，为什么一定要到圆弧起点才能，首先我们需要明白一个概念就是
    //moveto是将一个新的子路径的起点移动到对应的xy点，如果起点在（40,75）的话，那么因为终点
    //在(110, 75)这个位置，那么ctx会多画一条线到起点
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    // ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    ctx.stroke();
  };
  useEffect(() => {
    // draw();
  }, []);
  return (
    <div>
      <canvas id="canvas" width={200} height={200} ref={canvasRef} />
      <button onClick={drawTriangle}>绘制三角形</button>
      <button onClick={drawCircle}>绘制笑脸</button>
    </div>
  );
}

Canvas.propTypes = {};

export default Canvas;
