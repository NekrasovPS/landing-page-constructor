import DroppableCanvas from "./DroppableCanvas";

interface CanvasProps {
  blocks: string[];
}



export default function Canvas({ blocks }: CanvasProps) {
  return <DroppableCanvas blocks={blocks} />;
}
