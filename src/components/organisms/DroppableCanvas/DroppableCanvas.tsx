import { useDroppable } from "@dnd-kit/core";
import { blockMap } from "../../../utils/blockMap";

interface BlockData {
  type: string;
  variant: string;
}

interface DroppableCanvasProps {
  blocks: BlockData[];
}

export default function DroppableCanvas({ blocks }: DroppableCanvasProps) {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "300px",
        border: "2px dashed #ccc",
        background: isOver ? "#e0f7fa" : "#fff",
        padding: "16px",
      }}
    >
      <p>Перетащи блок сюда</p>
      {blocks.map((block, index) => {
        const Component = blockMap[block.variant];
        return Component ? <Component key={index} /> : null;
      })}
    </div>
  );
}
