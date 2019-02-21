"use strict";

const canvas = document.createElement("canvas");
const canvas_context = canvas.getContext('2d');

const r = 200;
const d = 2*r;
const blobsize = 10;
canvas.width = 2*r + blobsize;
canvas.height = 2*r + blobsize;

const tau = 2*Math.PI;
const step = 0.01;
const radius = 150;
const multiplier = d/tau;

function drawBlob(x, y, col) {
  canvas_context.fillStyle = col;
  canvas_context.fillRect(x, y, blobsize,blobsize );
}

function drawConn(x, y, x1, y1, col) {
  canvas_context.strokeStyle = col;
  canvas_context.strokeWidth = "2";
  canvas_context.moveTo(x, y);
  canvas_context.lineTo(x1, y1);
  canvas_context.stroke();
}


function fadeContent() {
  canvas_context.fillStyle = `rgba(255,255,255,0.01)`;
  canvas_context.fillRect(0, 0, canvas.width, canvas.height);
}

let i=0;

function drawNext() {
  i += step;
  fadeContent();
  let x = r + r*Math.sin(i);
  let y = r + r*Math.cos(i);
  let axispos = i * multiplier % d;
  
  drawBlob(x, y, `purple`);

  drawBlob(axispos, y, 'blue');
  drawBlob(x, axispos, 'red');

  window.requestAnimationFrame(drawNext);
}

document.body.appendChild(canvas);
drawNext();