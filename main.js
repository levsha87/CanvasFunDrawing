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

  const state = {
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    hue: 0,
    direction: true,
  };

  canvas.addEventListener('mousedown', (e) => {
    state.isDrawing = true;
    [state.lastX, state.lastY] = [e.offsetX, e.offsetY];
  });

  inputs.forEach((input) =>
    input.addEventListener('change', () => handleUpdate(ctx, input))
  );
  canvas.addEventListener('mousemove', (e) =>
    draw(e, manualModeCheckBox.checked, ctx, state)
  );
  canvas.addEventListener('mouseup', () => (state.isDrawing = false));
  canvas.addEventListener('mouseout', () => (state.isDrawing = false));
  manualModeCheckBox.addEventListener('click', (e) =>
    setDefaultValue(ctx, SIZE, COLOR)
  );
}

function handleUpdate(ctx, input) {
  ctx.strokeStyle = input.value;
  ctx.lineWidth = input.value;
}

function setDefaultValue(ctx, SIZE, COLOR) {
  ctx.strokeStyle = COLOR;
  ctx.lineWidth = SIZE;
}

function draw(e, isChecked, ctx, state) {
  if (isChecked) {
    drawManualMode(e, ctx, state);
  } else {
    drawRainbow(e, ctx, state);
  }
}

function drawRainbow(e, ctx, state) {
  if (!state.isDrawing) return;
  ctx.strokeStyle = `hsl(${state.hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(state.lastX, state.lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [state.lastX, state.lastY] = [e.offsetX, e.offsetY]; //define current x, y

  state.hue++;
  if (state.hue >= 360) {
    state.hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    state.direction = !state.direction;
  }

  if (state.direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

function drawManualMode(e, ctx, state) {
  if (!state.isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(state.lastX, state.lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [state.lastX, state.lastY] = [e.offsetX, e.offsetY];
}