import { useState, useRef, useEffect, type MouseEvent } from 'react';
import DebugPanel from './DebugPanel';
import type { GridConfig, PuzzlePiece } from './types';
import { drawPuzzlePiece } from './utils/canvas';
import './App.css';

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [config, setConfig] = useState<GridConfig | null>(null);
  const [movingPiece, setMovingPiece] = useState<number | null>(null);
  const [pieces, setPieces] = useState<Array<PuzzlePiece> | null>(null);
  const [prevMousePos, setPrevMousePos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImage(img);

      const config: GridConfig = {
        rows: 3,
        cols: 3,
        pieceWidth: img.width / 3,
        pieceHeight: img.height / 3,
      };
      setConfig(config);
    };
    img.src = '/cat.jpg';
  }, []);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!config || !canvas) return;

    const generateInitialPieces = (): Array<PuzzlePiece> => {
      const { rows, cols, pieceWidth, pieceHeight } = config;
      const cw = canvas.width - 100;
      const ch = canvas.height - 100;
      const initialPieces = [];
      let i = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * pieceWidth;
          const y = row * pieceHeight;
          initialPieces.push({
            id: i,
            sourceX: x,
            sourceY: y,
            destX: Math.random() * cw,
            destY: Math.random() * ch,
          });
          i++;
        }
      }
      return initialPieces;
    };

    const pieces = generateInitialPieces();
    setPieces(pieces);
  }, [config]);

  // Draw puzzle pieces
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || !image || !pieces || !config) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces?.map((piece) => drawPuzzlePiece(ctx, image, piece, config));
  }, [pieces, image, config]);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (movingPiece || !canvas || !pieces || !config) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    pieces.map((piece) => {
      const { id, destX, destY } = piece;
      const { pieceWidth, pieceHeight } = config;

      const endX = destX + pieceWidth;
      const endY = destY + pieceHeight;
      if (
        destX <= mouseX &&
        mouseX <= endX &&
        destY <= mouseY &&
        mouseY <= endY
      )
        setMovingPiece(id);
    });
    setPrevMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseUp = () => {
    if (!movingPiece) return;
    setMovingPiece(null);
    setPrevMousePos(null);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!movingPiece || !canvas || !pieces || !config || !prevMousePos) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const delta = {
      x: prevMousePos.x - mouseX,
      y: prevMousePos.y - mouseY,
    };
    const updatedPieces = pieces.map((piece) =>
      piece.id == movingPiece
        ? {
            ...piece,
            destX: piece.destX - delta.x,
            destY: piece.destY - delta.y,
          }
        : piece
    );
    setPrevMousePos({ x: mouseX, y: mouseY });
    setPieces(updatedPieces);
  };

  return (
    <div>
      <h1>Jigsaw Puzzle</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <DebugPanel mousePos={prevMousePos} />
        <canvas
          ref={canvasRef}
          width={720}
          height={720}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
}

export default App;
