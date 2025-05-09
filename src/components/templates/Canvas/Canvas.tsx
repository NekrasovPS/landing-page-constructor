import DroppableCanvas from "../../organisms/DroppableCanvas/DroppableCanvas";
import type { BlockData } from "../../../type/blocks";

interface CanvasProps {
  blocks: BlockData[];
  onSelect: (index: number) => void;
  selectedIndex: number | null;
}

export default function Canvas({
  blocks,
  onSelect,
  selectedIndex,
}: CanvasProps) {
  return (
    <DroppableCanvas
      blocks={blocks}
      onSelect={onSelect}
      selectedIndex={selectedIndex}
    />
  );
}
