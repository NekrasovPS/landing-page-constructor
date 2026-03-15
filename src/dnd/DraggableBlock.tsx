import { useDraggable } from "@dnd-kit/core";

interface DraggableBlockProps {
  id: string;
  data: {
    type: string;
    variant: string;
  };
}

export default function DraggableBlock({ id, data }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data,
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
