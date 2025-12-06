interface DebugProps {
  mousePos: {
    x: number;
    y: number;
  };
}
export default function DebugPanel(props: DebugProps) {
  const { mousePos } = props;
  return (
    <div>
      <h3>Debug Panel</h3>
      <p>x: {mousePos?.x ? Math.round(mousePos?.x) : ' n/a'}</p>
      <p>y: {mousePos?.y ? Math.round(mousePos?.y) : ' n/a'}</p>
    </div>
  );
}
