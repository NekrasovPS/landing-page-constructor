import styles from "./EditorPage.module.css";
import BlocksPanel from "../../organisms/BlocksPanel/BlocksPanel";
import Canvas from "../../templates/Canvas/Canvas";
import EditPanel from "../../organisms/EditPanel/EditPanel";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { blockMap } from "../../../utils/blockMap";
import type { BlockData, BlockProps } from "../../../type/blocks";

export default function EditorPage() {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [activeBlock, setActiveBlock] = useState<BlockData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDrop = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id === "canvas") {
      const blockData = active.data.current as BlockData;
      setBlocks((prev) => [...prev, blockData]);
    }
    setActiveBlock(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const blockData = event.active.data.current as BlockData;
    setActiveBlock(blockData);
  };

  const handleSelectBlock = (index: number) => {
    setSelectedIndex(index);
  };

  const handleUpdateBlock = (updatedProps: BlockProps) => {
    if (selectedIndex === null) return;
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === selectedIndex
          ? { ...block, props: { ...block.props, ...updatedProps } }
          : block
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDrop} onDragStart={handleDragStart}>
      <div className={styles.wrapper}>
        <div className={styles.leftPanel}>
          <BlocksPanel />
        </div>
        <div className={styles.canvas}>
          <Canvas
            blocks={blocks}
            onSelect={handleSelectBlock}
            selectedIndex={selectedIndex}
          />
        </div>
        <div className={styles.rightPanel}>
          <EditPanel
            block={blocks[selectedIndex ?? -1]}
            onChange={handleUpdateBlock}
          />
        </div>
      </div>

      <DragOverlay>
        {activeBlock ? renderPreview(activeBlock) : null}
      </DragOverlay>
    </DndContext>
  );
}

function renderPreview(block: BlockData) {
  const Component = blockMap[block.variant];
  return Component ? <Component {...block.props} /> : null;
}
