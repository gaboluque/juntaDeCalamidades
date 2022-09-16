import { useEffect, useRef, useState } from "react";
import { addPixel, getBoard } from "../../services/jdcServer";

let PIXEL_SIZE = 20;
const X_OFFSET = 0;
const Y_OFFSET = 0;

export const PixelBoard = () => {
  let ready = useRef(false);
  let circlePos = useRef({ x: 0, y: 0 });
  const bgRef = useRef(null);
  const fgRef = useRef(null);
  let bg = useRef(null);
  let fg = useRef(null);
  let pixelColor = useRef("#000000");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bgCanvas = bgRef.current;
    bg.current = bgCanvas.getContext("2d");

    const fgCanvas = fgRef.current;
    fg.current = fgCanvas.getContext("2d");

    fgCanvas.addEventListener('mousemove', onMouseMove);
    fgCanvas.addEventListener('click', drawPixel);

    return () => {
      fgCanvas.removeEventListener('mousemove', onMouseMove);
      fgCanvas.removeEventListener('click', drawPixel);
    }
  }, []);

  useEffect(() => {
    if (bg.current && fg.current && !ready.current) {
      loadCanvas(100, 100);
      ready.current = true;
    }
  }, [bg, fg, ready]);

  useEffect(() => {
    // Get board every 10 seconds
    const interval = setInterval(() => {
      fetchBoard(false);
    }, 3000);
    fetchBoard(true);
    return () => clearInterval(interval);
  }, []);

  function fetchBoard(withLoad) {
    if(withLoad) setLoading(true);
    getBoard().then((board) => {
      paintBoard(board.pixels);
      if(withLoad) setLoading(false);
    });
  }

  function onMouseMove(event) {
    if (!fg || !bg) return;

    let p = getMousePos(fgRef.current, event);
    let x = Math.floor((p.x) / PIXEL_SIZE + 1);
    let y = Math.floor((p.y - Y_OFFSET) / PIXEL_SIZE);

    fg.current.clearRect(0, 0, fg.current.canvas.width, fg.current.canvas.height);

    if (y < 0) return;

    fg.current.lineWidth = 4;

    let circle_x = x * PIXEL_SIZE + PIXEL_SIZE / 2;
    let circle_y = y * PIXEL_SIZE + Y_OFFSET + PIXEL_SIZE / 2;

    circlePos.current = ({ x: circle_x, y: circle_y });

    drawPointer(circle_x, circle_y, 'red', PIXEL_SIZE - 6);
    drawPointer(circle_x, circle_y, 'white', PIXEL_SIZE - 4);
    drawPointer(circle_x, circle_y, 'black', PIXEL_SIZE);
  }

  function drawPointer(x, y, color, radius) {
    if (!fg) return;
    fg.current.beginPath();
    fg.current.strokeStyle = color;
    fg.current.arc(x, y, radius, 0, 2 * Math.PI, false);
    fg.current.stroke();
  }


  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left - 20) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  }

  function drawPixel() {
    if (!fg.current || !bg.current) return;
    const x = circlePos.current.x - PIXEL_SIZE / 2;
    const y = circlePos.current.y - PIXEL_SIZE / 2;

    addPixel(x, y, pixelColor.current).then((correct) => {
      if (correct) {
        bg.current.fillStyle = pixelColor.current;
        bg.current.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
      }
    })
  }

  function paintBoard(boardPixels) {
    if (!bg.current) return;
    // bg.current.clearRect(0, 0, bg.current.canvas.width, bg.current.canvas.height);

    boardPixels.forEach((pixel) => {
      bg.current.fillStyle = pixel.color;
      bg.current.fillRect(pixel.x, pixel.y, PIXEL_SIZE, PIXEL_SIZE);
    });
  }

  function drawGrid(x_0, y_0, x_max, y_max, ctx) {
    for (let x = x_0; x <= x_max; x += PIXEL_SIZE) {
      ctx.moveTo(x, y_0);
      ctx.lineTo(x, y_max);
      for (let y = y_0; y <= y_max; y += PIXEL_SIZE) {
        ctx.moveTo(x_0, y);
        ctx.lineTo(x_max, y);
      }
    }
    ctx.strokeStyle = '#bbbbbb';
    ctx.stroke();
  }

  function loadCanvas(width, height) {
    if (!bg.current || !fg.current) return;
    const w = width * PIXEL_SIZE;
    const h = height * PIXEL_SIZE;

    bg.current.canvas.width = w + X_OFFSET;
    bg.current.canvas.height = h + 2 * Y_OFFSET;

    fg.current.canvas.width = bg.current.canvas.width;
    fg.current.canvas.height = bg.current.canvas.height;

    drawGrid(0, Y_OFFSET, w, h + Y_OFFSET, bg.current)
  }

  const onPixelColorChange = (e) => {
    pixelColor.current = e.target.value;
  }

  return (
    <div className="board-container">
      {loading && <div className="loading-screen">Cargando...</div>}
      <input value={pixelColor.current} onChange={onPixelColorChange} type="color"/>
      <div className="board">
        <canvas ref={bgRef} id="canvas_background" width="800" height="500"></canvas>
        <canvas ref={fgRef} id="canvas_foreground" width="800" height="500"></canvas>
      </div>
    </div>
  );
}