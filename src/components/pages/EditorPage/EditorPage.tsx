import styles from "./EditorPage.module.css";
import BlocksPanel from "../../organisms/BlocksPanel/BlocksPanel";
import Canvas from "../../templates/Canvas/Canvas";
import EditPanel from "../../organisms/EditPanel/EditPanel";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

interface BlockData {
  type: string;
  variant: string;
}

export default function EditorPage() {
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  const handleDrop = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id === "canvas") {
      const blockData = active.data.current as BlockData;
      setBlocks((prev) => [...prev, blockData]);
    }
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className={styles.wrapper}>
        <div className={styles.leftPanel}>
          <BlocksPanel />
        </div>
        <div className={styles.canvas}>
          <Canvas blocks={blocks} />
        </div>
        <div className={styles.rightPanel}>
          <EditPanel />
        </div>
      </div>
    </DndContext>
  );
}
