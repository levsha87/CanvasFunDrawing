const canvas = document.querySelector('#myCanvas'); //get canvas from doc
const inputs = document.querySelectorAll(".control input");
const manualModeOn = document.querySelector('#manualModeOn');


const ctx = canvas.getContext('2d'); //create a drawing object
let color = '#BADA55';
let size = 2;
canvas.width = window.innerWidth; //get all width not includes scrollWidth
canvas.height = window.innerHeight - 30; // get all width not includes scrollWidth
ctx.strokeStyle = color; //set color for strokes when does not set with hsl calculator
ctx.lineJoin = 'round'; //Creates a rounded corner when the two lines meet
ctx.lineCap = 'round'; // Draw a line with rounded end caps
ctx.lineWidth = size; //The lineWidth property sets  the current line width, in pixels.
ctx.globalCompositeOperation = 'source-over';

let isDrawing = false; //default means
let lastX = 0; //default means
let lastY = 0; //default means
let hue = 0; //default means (one of the main properties (called color appearance parameters) of a color 0-360)
let direction = true; //demind for check condition for iteration;

function handleUpdate(e) {
  ctx.strokeStyle = this.value;
  ctx.lineWidth = this.value;
}

function defaultValue (){
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
}

function draw (e){
  if(manualModeOn.checked){
    drawManualMode(e);
  } else {
    drawRainbow(e);
  } 
}

function drawRainbow(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  //HSL Color Calculator
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; //define current x, y

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
    if(direction) {
    ctx.lineWidth++;
    } else {
    ctx.lineWidth--;
  }
}

function drawManualMode(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true; 
  [lastX, lastY] = [e.offsetX, e.offsetY]; //set x and y in the moment down (remind 0,0);
});

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
manualModeOn.addEventListener('click', defaultValue);