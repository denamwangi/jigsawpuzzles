import { useState, useRef, useEffect } from 'react'
import './App.css'


function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() =>{
    const img = new Image();
    img.onload = ()=>{
      setImage(img);
    };
    img.src = '/cat.jpg';
  }, [])

  interface GridConfig {
    rows: number;
    cols: number;
    pieceWidth: number;
    pieceHeight: number;
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, config: GridConfig): void => {
    const { rows, cols, pieceWidth, pieceHeight } = config;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const sx = col * pieceWidth;
        const dx = col * pieceWidth;
        const sy = row * pieceHeight;
        const dy = row * pieceHeight;

        ctx.drawImage(image, 
          sx, sy, pieceWidth, pieceHeight,
          dx, dy, pieceWidth, pieceHeight,
        );

        // ctx.drawImage(image, 
        //   sx, sy, pieceWidth, pieceHeight,
        //   sx, sy, pieceWidth, pieceHeight,
        // );
        ctx.strokeStyle = '#000';
        ctx.strokeRect(dx, dy, pieceWidth, pieceHeight);
      }
    }
    

  }
  interface point {
    x: number,
    y: number,
  };
  interface clipRect {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  const drawDiamond = (ctx: CanvasRenderingContext2D, center: point, size: number) => {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y - size);
    ctx.lineTo(center.x+size, center.y);
    ctx.lineTo(center.x, center.y+size);
    ctx.lineTo(center.x-size, center.y);
    ctx.closePath();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const drawTriangle = (ctx: CanvasRenderingContext2D, center: point, size: number): void => {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y - size);
    ctx.lineTo(center.x+size, center.y);
    ctx.lineTo(center.x-size, center.y);
    
    ctx.closePath();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.stroke();
  }



  const circleClip = (ctx: CanvasRenderingContext2D): void => {
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI * 2);
    ctx.closePath();
  };



  useEffect(()=>{

  const drawClippedImage = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    clipShape: (ctx: CanvasRenderingContext2D) => void,
    sourceRect: clipRect,
    destRect: clipRect,
  ): void => {
    ctx.save();


    clipShape(ctx);
    ctx.clip();

    ctx.drawImage(
      image, 
      sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
      destRect.x, destRect.y, destRect.width, destRect.height,
    );


    ctx.restore();

  };
    console.log('have image!');
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || !image) return;

    const config: GridConfig = {
      rows: 3,
      cols: 3,
      pieceWidth: image.width / 3,
      pieceHeight: image.height / 3,
    }
    // drawGrid(ctx, image, config);
    // drawDiamond(ctx, {x: 100, y: 100}, 50);
    // drawTriangle(ctx, {x: 200, y: 400}, 200);
    drawClippedImage(
        ctx,
        image, 
        circleClip,
        {x: 0, y: 0, width: 300, height: 300},
        {x: 50, y: 50, width: 200, height: 200}
      )
  }, [image])

  return (
    <div>
      <h1>Jigsaw Puzzle</h1>
      <canvas
        ref={canvasRef}
        width={720}
        height={720}
        // style={{ border: '2px solid #333'}}
      />
    </div>
  )
}

export default App
