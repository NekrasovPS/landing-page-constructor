import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";
import { blockMap } from "../../../utils/blockMap";
import type { BlockData } from "../../../type/blocks";
import styles from "./DroppableCanvas.module.css";

interface Props {
  blocks: BlockData[];
  onSelect: (index: number) => void;
  selectedIndex: number | null;
}

const SortableBlock = memo(function SortableBlock({
  block,
  index,
  onSelect,
  isSelected,
}: {
  block: BlockData;
  index: number;
  onSelect: (index: number) => void;
  isSelected: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `block-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    position: "relative" as const,
    zIndex: isDragging ? 100 : ("auto" as const),
  };

  const meta = blockMap[block.variant];
  const Component = meta?.component;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      className={`${styles.blockWrapper} ${isSelected ? styles.selected : ""}`}
    >
      <div className={styles.dragHandle} {...listeners}>
        ⋮⋮
      </div>
      <div className={styles.blockContent}>
        {Component ? <Component {...(block.props || {})} /> : null}
      </div>
    </div>
  );
});

export default function DroppableCanvas({
  blocks,
  onSelect,
  selectedIndex,
}: Props) {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.canvas} ${isOver ? styles.dropOver : ""}`}
    >
      <SortableContext
        items={blocks.map((_, i) => `block-${i}`)}
        strategy={verticalListSortingStrategy}
      >
        {blocks.map((block, index) => (
          <SortableBlock
            key={`block-${index}`}
            block={block}
            index={index}
            onSelect={onSelect}
            isSelected={index === selectedIndex}
          />
        ))}
      </SortableContext>
    </div>
  );
}
