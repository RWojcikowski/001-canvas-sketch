const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const Color = require("canvas-sketch-util/color");
const risoColors = require("riso-colors");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  let x, y, w, h, fill, stroke, blend ;
  // let  angle, rx, ry;

  const num = 40;
  const degress = -30;

  const rect = [];

  const rectColors = [
    random.pick(risoColors),
    random.pick(risoColors),
    random.pick(risoColors),
  ];

  const bgColor = random.pick(risoColors).hex;

  for (let i = 0; i < num; i++) {
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(200, width);
    h = random.range(40, 200);

    fill = random.pick(rectColors).hex;
    stroke = random.pick(rectColors).hex;

    blend = ( random.value() > 0.5) ? 'overlay' : 'source-over';

    rect.push({ x, y, w, h, fill, stroke, blend });
  }

  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    rect.forEach((rect) => {
      const { x, y, w, h, fill, stroke, blend } = rect;
      let shadowColor;

      context.save();
      context.translate(x, y);
      context.strokeStyle = stroke;
      context.fillStyle = fill;
      context.lineWidth = 10;

      context.globalCompositeOperation = blend ;
      

      drawSkewedRect({ context, w, h, degress });

      shadowColor = Color.offsetHSL(fill, 0, 0, -20);
      shadowColor.rgba[3] = 0.5;

      context.shadowColor = Color.style(shadowColor.rgba);
      context.shadowOffsetX = -10;
      context.shadowOffsetY = 20;

      context.fill();
      context.shadowColor = null;

      context.globalCompositeOperation = 'source-over';

      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.stroke();

      context.stroke();

      context.restore();
    });
  };
};

const drawSkewedRect = ({ context, w = 600, h = 200, degress = -45 }) => {
  angle = math.degToRad(degress);

  rx = Math.cos(angle) * w;
  ry = Math.sin(angle) * w;

  context.save();
  context.strokeStyle = "black";
  context.translate(rx * -0.5, (ry + h) * -0.5);

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();

  context.restore();
};

canvasSketch(sketch, settings);
