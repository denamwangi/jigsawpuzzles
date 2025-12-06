export interface GridConfig {
  rows: number;
  cols: number;
  pieceWidth: number;
  pieceHeight: number;
}

export interface point {
  x: number;
  y: number;
}

export interface clipRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PuzzlePiece {
  id: number;
  sourceX: number;
  sourceY: number;
  destX: number;
  destY: number;
}
