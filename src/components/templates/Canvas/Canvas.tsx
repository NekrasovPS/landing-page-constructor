import DroppableCanvas from "../../organisms/DroppableCanvas/DroppableCanvas";

interface BlockData {
  type: string;
  variant: string;
}

interface CanvasProps {
  blocks: BlockData[];
}

export default function Canvas({ blocks }: CanvasProps) {
  return <DroppableCanvas blocks={blocks} />;
}
