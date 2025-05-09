import { useDroppable } from "@dnd-kit/core";
import { blockMap } from "../../../utils/blockMap";
import type { BlockData } from "../../../type/blocks";

interface Props {
  blocks: BlockData[];
  onSelect: (index: number) => void;
  selectedIndex: number | null;
}

export default function DroppableCanvas({
  blocks,
  onSelect,
  selectedIndex,
}: Props) {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "400px",
        border: "2px dashed #ccc",
        background: isOver ? "#e0f7fa" : "#fff",
        padding: "16px",
      }}
    >
      {blocks.map((block, index) => {
        const Component = blockMap[block.variant];
        const isSelected = index === selectedIndex;

        return (
          <div
            key={index}
            onClick={() => onSelect(index)}
            style={{
              border: isSelected ? "2px solid #00b894" : "1px solid #ccc",
              marginBottom: "16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {Component ? <Component {...(block.props || {})} /> : null}
          </div>
        );
      })}
    </div>
  );
}
