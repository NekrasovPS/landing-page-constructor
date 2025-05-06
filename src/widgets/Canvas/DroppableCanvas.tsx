import { useDroppable } from "@dnd-kit/core";

interface Props {
  blocks: string[];
}

export default function DroppableCanvas({ blocks }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas",
  });

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
      {blocks.map((block) => (
        <div
          key={block}
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #333",
          }}
        >
          {block}
        </div>
      ))}
    </div>
  );
}
