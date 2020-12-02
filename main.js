initFunCanvasApp();

function initFunCanvasApp() {
  const canvas = document.querySelector('#myCanvas');
  const inputs = document.querySelectorAll('.control input');
  const controlPanel = document.querySelector('.control');
  const manualModeCheckBox = document.querySelector('#manualModeCheckBox');
  const ctx = canvas.getContext('2d');
  const color = document.querySelector('#lineColor').value;
  const size = document.querySelector('#lineSize').value;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - controlPanel.clientHeight;
  ctx.strokeStyle = color;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = size;
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

  controlPanel.addEventListener('change', (e) => {
    let value = e.target.closest('input').value;

    if (e.target !== e.target.closest('input')) return;
    handleUpdate(ctx, value);
  });

  canvas.addEventListener('mousemove', (e) =>
    draw(e, manualModeCheckBox.checked, ctx, state)
  );

  canvas.addEventListener('mouseup', () => (state.isDrawing = false) );
  canvas.addEventListener('mouseout', () => (state.isDrawing = false) );

  manualModeCheckBox.addEventListener('click', (e) =>
    setDefaultValue(ctx, size, color)
  );
}

function handleUpdate(ctx, value) {
  ctx.strokeStyle = value;
  ctx.lineWidth = value;
}

function setDefaultValue(ctx, size, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
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