import { useDroppable } from "@dnd-kit/core";
import { blockMap } from "../../../utils/blockMap";

interface DroppableCanvasProps {
  blocks: string[];
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
      {blocks.map((blockId, index) => {
        const BlockComponent = blockMap[blockId];
        if (!BlockComponent) return null;
        return (
          <div key={`${blockId}-${index}`} style={{ marginBottom: "16px" }}>
            <BlockComponent />
          </div>
        );
      })}
    </div>
  );
}
