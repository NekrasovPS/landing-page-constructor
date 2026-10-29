import { memo, useEffect } from "react";
import type { BlockData } from "../../../type/blocks";
import { blockMap } from "../../../utils/blockMap";
import styles from "./PreviewModal.module.css";

export interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: BlockData[];
}

export default memo(function PreviewModal({
  isOpen,
  onClose,
  blocks,
}: PreviewModalProps) {
  // Закрытие модалки по Escape (в т.ч. из input внутри — это ожидаемое поведение модалок)
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>👁️ Предпросмотр лендинга</h2>
          <div className={styles.actions}>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕ Закрыть
            </button>
          </div>
        </div>

        <div className={styles.previewContainer}>
          <div className={styles.previewFrame}>
            {blocks.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>📄</span>
                <p>Нет блоков для предпросмотра</p>
                <p className={styles.emptyHint}>
                  Добавьте блоки из панели слева
                </p>
              </div>
            ) : (
              <div className={styles.blocksList}>
                {blocks.map((block, i) => {
                  const meta = blockMap[block.variant];
                  const Component = meta?.component;
                  if (!Component) return null;

                  const props = block.props || {};
                  return (
                    <div key={block.id || i} className={styles.previewBlock}>
                      {/* БАГ #PREVIEW: раньше пробрасывались только 4 фиксированных пропа —
                          все остальные поля (фичи прайсинга, ссылки футера и т.д.) терялись */}
                      <Component {...props} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
