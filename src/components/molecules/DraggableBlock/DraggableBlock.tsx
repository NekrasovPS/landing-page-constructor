import { useDraggable } from "@dnd-kit/core";

interface DraggableBlockProps {
  id: string;
}

export default function DraggableBlock({ id }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "12px",
        marginBottom: "10px",
        border: "1px solid #333",
        background: isDragging ? "#ddd" : "#fff",
        cursor: "grab",
      }}
    >
      {id}
    </div>
  );
}
