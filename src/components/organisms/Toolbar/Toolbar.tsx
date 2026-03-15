import { memo } from "react";
import styles from "./Toolbar.module.css";

export type DeviceType = "desktop" | "tablet" | "mobile";

export interface ToolbarProps {
  device: DeviceType;
  zoom: number;
  canUndo: boolean;
  canRedo: boolean;
  onDeviceChange: (device: DeviceType) => void;
  onZoomChange: (zoom: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

export default memo(function Toolbar({
  device,
  zoom,
  canUndo,
  canRedo,
  onDeviceChange,
  onZoomChange,
  onUndo,
  onRedo,
  onClear,
}: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <button
          className={styles.iconBtn}
          onClick={onUndo}
          disabled={!canUndo}
          title="Отменить (Ctrl+Z)"
        >
          ↩️
        </button>
        <button
          className={styles.iconBtn}
          onClick={onRedo}
          disabled={!canRedo}
          title="Повторить (Ctrl+Y)"
        >
          ↪️
        </button>
        <div className={styles.divider} />
        <button
          className={`${styles.iconBtn} ${device === "desktop" ? styles.active : ""}`}
          onClick={() => onDeviceChange("desktop")}
          title="Десктоп"
        >
          🖥️
        </button>
        <button
          className={`${styles.iconBtn} ${device === "tablet" ? styles.active : ""}`}
          onClick={() => onDeviceChange("tablet")}
          title="Планшет"
        >
          📱
        </button>
        <button
          className={`${styles.iconBtn} ${device === "mobile" ? styles.active : ""}`}
          onClick={() => onDeviceChange("mobile")}
          title="Мобильный"
        >
          📲
        </button>
      </div>

      <div className={styles.group}>
        <span className={styles.zoomLabel}>
          {Math.round(zoom * 100)}%
        </span>
        <button
          className={styles.iconBtn}
          onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
          title="Уменьшить"
        >
          −
        </button>
        <button
          className={styles.iconBtn}
          onClick={() => onZoomChange(Math.min(2, zoom + 0.1))}
          title="Увеличить"
        >
          +
        </button>
        <button
          className={styles.iconBtn}
          onClick={() => onZoomChange(1)}
          title="Сбросить"
        >
          ⟲
        </button>
      </div>

      <div className={styles.group}>
        <button
          className={styles.dangerBtn}
          onClick={onClear}
          title="Очистить всё"
        >
          🗑️ Очистить
        </button>
      </div>
    </div>
  );
});
