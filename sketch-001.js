const canvasSketch = require("canvas-sketch");
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  let x, y, w, h;
  // let  angle, rx, ry;

  const num = 20;
  const degress = -30;

  const rect =[];
  for (let i = 0; i < num; i++) {
      
    x = random.range(0, width);
    y = random.range (0, height);
    w = random.range (200,600 );
    h = random.range (40, 200);

    rect.push({ x, y, w, h})
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);


    rect.forEach(rect => {
      const {x, y, w, h} = rect;
    
      context.save();
      context.translate(x, y);
      context.strokeStyle = "black";
      
      drawSkewedRect({context, w, h, degress});
      context.stroke();
      
      context.restore();
      
    
    })
  };
};

const drawSkewedRect = ({context, w= 600 , h= 200, degress= -45}) => {
  
  angle = math.degToRad(degress);
  
  rx = Math.cos(angle) * w;
  ry = Math.sin(angle) * w;
  
  context.save();
  context.strokeStyle = "black";
  context.translate(rx* -0.5,(ry+ h) * -0.5);
  
  
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();


 context.restore();
}


canvasSketch(sketch, settings);
