import DroppableCanvas from "../../organisms/DroppableCanvas/DroppableCanvas";
import type { BlockData } from "../../../type/blocks";
import type { DeviceType } from "../../organisms/Toolbar/Toolbar";

import styles from "./Canvas.module.css";

interface CanvasProps {
  blocks: BlockData[];
  onSelect: (id: string) => void;
  selectedBlockId: string | null;
  device: DeviceType;
  zoom: number;
}

export default function Canvas({
  blocks,
  onSelect,
  selectedBlockId,
  device,
  zoom,
}: CanvasProps) {
  return (
    <div
      className={styles.canvasContainer}
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top center",
      }}
    >
      <div className={styles.canvas} data-device={device}>
        <DroppableCanvas
          blocks={blocks}
          onSelect={onSelect}
          selectedBlockId={selectedBlockId}
        />
      </div>
    </div>
  );
}
