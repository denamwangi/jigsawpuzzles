import type { GridConfig, clipRect, point, PuzzlePiece } from '../types';

export const drawDiamond = (
  ctx: CanvasRenderingContext2D,
  center: point,
  size: number
) => {
  ctx.beginPath();
  ctx.moveTo(center.x, center.y - size);
  ctx.lineTo(center.x + size, center.y);
  ctx.lineTo(center.x, center.y + size);
  ctx.lineTo(center.x - size, center.y);
  ctx.closePath();

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
};

export const drawTriangle = (
  ctx: CanvasRenderingContext2D,
  center: point,
  size: number
): void => {
  ctx.beginPath();
  ctx.moveTo(center.x, center.y - size);
  ctx.lineTo(center.x + size, center.y);
  ctx.lineTo(center.x - size, center.y);

  ctx.closePath();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 4;
  ctx.stroke();
};

export const circleClip = (ctx: CanvasRenderingContext2D): void => {
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI * 2);
  ctx.closePath();
};

export const drawClippedImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  clipShape: (ctx: CanvasRenderingContext2D) => void,
  sourceRect: clipRect,
  destRect: clipRect
): void => {
  ctx.save();
  clipShape(ctx);
  ctx.clip();

  ctx.drawImage(
    image,
    sourceRect.x,
    sourceRect.y,
    sourceRect.width,
    sourceRect.height,
    destRect.x,
    destRect.y,
    destRect.width,
    destRect.height
  );

  ctx.restore();
};

export const drawPuzzlePiece = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  piece: PuzzlePiece,
  config: GridConfig
): void => {
  const { sourceX, sourceY, destX, destY } = piece;
  const { pieceWidth, pieceHeight } = config;

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    pieceWidth,
    pieceHeight,
    destX,
    destY,
    pieceWidth,
    pieceHeight
  );
  ctx.strokeStyle = '#000';
  ctx.strokeRect(destX, destY, pieceWidth, pieceHeight);
};
export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  config: GridConfig
): void => {
  const { rows, cols, pieceWidth, pieceHeight } = config;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const sx = col * pieceWidth;
      const dx = col * pieceWidth;
      const sy = row * pieceHeight;
      const dy = row * pieceHeight;
      //
      ctx.drawImage(
        image,
        sx,
        sy,
        pieceWidth,
        pieceHeight,
        dx,
        dy,
        pieceWidth,
        pieceHeight
      );

      // ctx.drawImage(image,
      //   sx, sy, pieceWidth, pieceHeight,
      //   sx, sy, pieceWidth, pieceHeight,
      // );
      ctx.strokeStyle = '#000';
      ctx.strokeRect(dx, dy, pieceWidth, pieceHeight);
    }
  }
};
