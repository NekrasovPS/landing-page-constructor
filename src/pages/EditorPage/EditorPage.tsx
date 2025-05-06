import styles from "./EditorPage.module.css";
import BlocksPanel from "../../widgets/BlocksPanel/BlocksPanel";
import Canvas from "../../widgets/Canvas/Canvas";
import EditPanel from "../../widgets/EditPanel/EditPanel";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

export default function EditorPage() {
  const [blocks, setBlocks] = useState<string[]>([]);

  const handleDrop = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id === "canvas") {
      setBlocks((prev) => [...prev, String(active.id)]);
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
