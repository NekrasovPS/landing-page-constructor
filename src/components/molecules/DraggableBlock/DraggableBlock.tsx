import { useDraggable } from "@dnd-kit/core";
import styles from "./DraggableBlock.module.css";

interface DraggableBlockProps {
  id: string;
  label: string;
  icon?: string;
  data: {
    type: string;
    variant: string;
  };
}

export default function DraggableBlock({
  id,
  label,
  icon = "📦",
  data,
}: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.block} ${isDragging ? styles.dragging : ""}`}
      {...listeners}
      {...attributes}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
