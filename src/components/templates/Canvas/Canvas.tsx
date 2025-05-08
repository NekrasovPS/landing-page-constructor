import DroppableCanvas from "../../organisms/DroppableCanvas/DroppableCanvas";

interface CanvasProps {
  blocks: string[];
}

export default function Canvas({ blocks }: CanvasProps) {
  return <DroppableCanvas blocks={blocks} />;
}
