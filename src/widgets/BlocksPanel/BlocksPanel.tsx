import { useDraggable } from "@dnd-kit/core";

function DraggableBlock({ id }: { id: string }) {
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

export default function BlocksPanel() {
  return (
    <div>
      <DraggableBlock id="block-1" />
      <DraggableBlock id="block-2" />
      <DraggableBlock id="block-3" />
    </div>
  );
}
