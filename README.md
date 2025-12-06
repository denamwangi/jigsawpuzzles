# Jigsaw Puzzle

An interactive jigsaw puzzle game built with React, TypeScript, and Vite. Drag and drop puzzle pieces to solve the puzzle!

## Features

- Interactive drag-and-drop puzzle pieces
- 3x3 grid puzzle layout
- Canvas-based rendering
- Debug panel for development

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## How to Play

1. The puzzle image is automatically loaded and split into 9 pieces (3x3 grid)
2. Click and drag puzzle pieces to move them around
3. Try to reassemble the puzzle by placing pieces in their correct positions

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Canvas API** - Puzzle piece rendering

## Project Structure

```
src/
  ├── App.tsx          # Main application component
  ├── DebugPanel.tsx   # Debug information panel
  ├── types.ts         # TypeScript type definitions
  └── utils/
      ├── canvas.ts    # Canvas drawing utilities
      └── puzzle.ts    # Puzzle logic utilities
```

## Todos

- Use bezier curves to make puzzle pieces
- Add upload file functionality
