
import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { ReactNode } from "react";
import type { BlockData } from "../type/blocks";
import { blockMap } from "../utils/blockMap";

interface DndProviderProps {
  children: ReactNode;
  activeBlock: BlockData | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

function renderPreview(block: BlockData) {
  const meta = blockMap[block.variant];
  const Component = meta?.component;
  return Component ? <Component {...(block.props || {})} /> : null;
}

export default function DndProvider({
  children,
  activeBlock,
  onDragStart,
  onDragEnd,
}: DndProviderProps) {
  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
      <DragOverlay>{activeBlock ? renderPreview(activeBlock) : null}</DragOverlay>
    </DndContext>
  );
}
