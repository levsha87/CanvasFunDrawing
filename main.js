initFunCanvasApp();

function initFunCanvasApp() {
  const canvas = document.querySelector('#myCanvas');
  const inputs = document.querySelectorAll('.control input');
  const manualModeCheckBox = document.querySelector('#manualModeCheckBox');
  const ctx = canvas.getContext('2d');
  const COLOR = document.querySelector('#lineColor').value;
  const SIZE = document.querySelector('#lineSize').value;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 40;
  ctx.strokeStyle = COLOR;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = SIZE;
  ctx.globalCompositeOperation = 'source-over';

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  
  let hue = 0;
  let direction = true;

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  
  inputs.forEach((input) => input.addEventListener('change', handleUpdate));
  canvas.addEventListener('mousemove', (e) => draw(e, manualModeCheckBox.checked, ctx, isDrawing, hue, direction));
  canvas.addEventListener('mouseup', () => (isDrawing = false));
  canvas.addEventListener('mouseout', () => (isDrawing = false));
  manualModeCheckBox.addEventListener('click', (e) => setDefaultValue(ctx, SIZE, COLOR));
}

function handleUpdate(ctx) {
  ctx.strokeStyle = this.value;
  ctx.lineWidth = this.value;
}

function setDefaultValue(ctx, SIZE, COLOR) {
  ctx.strokeStyle = COLOR;
  ctx.lineWidth = SIZE;
  console.log(ctx.strokeStyle, ctx.lineWidth);
}

function draw(e, isChecked, ctx, isDrawing, hue, direction, lastX, lastY) {
  if (isChecked) {
    drawManualMode(e, ctx, isDrawing, lastX, lastY);
  } else {
    drawRainbow(e, ctx, isDrawing, hue, direction, lastX, lastY);
  }
}

function drawRainbow(e, ctx, isDrawing, hue, direction, lastX, lastY) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  //HSL Color Calculator
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; //define current x, y
console.log(hue);
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  console.log(hue);

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

function drawManualMode(e, ctx, isDrawing, lastX, lastY) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}