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

  function handleUpdate(e) {
    ctx.strokeStyle = this.value;
    ctx.lineWidth = this.value;
  }

  function getDefaultValue() {
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = SIZE;
  }

  function draw(e) {
    if (manualModeCheckBox.checked) {
      drawManualMode(e);
    } else {
      drawRainbow(e);
    }
  }

  function drawRainbow(e) {
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

    hue++;
    if (hue >= 360) {
      hue = 0;
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    if (direction) {
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
    [lastX, lastY] = [e.offsetX, e.offsetY]; 
  });

  inputs.forEach((input) => input.addEventListener('change', handleUpdate));
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => (isDrawing = false));
  canvas.addEventListener('mouseout', () => (isDrawing = false));
  manualModeCheckBox.addEventListener('click', getDefaultValue);
}

initFunCanvasApp();
