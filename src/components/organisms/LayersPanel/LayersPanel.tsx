import { memo } from "react";
import type { BlockData } from "../../../type/blocks";
import styles from "./LayersPanel.module.css";

export interface LayersPanelProps {
  blocks: BlockData[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}

const blockIcons: Record<string, string> = {
  hero: "🎯",
  feature: "⭐",
  benefit: "✓",
  cta: "📣",
  footer: "📍",
  pricing: "💰",
  testimonial: "💬",
  gallery: "🖼️",
  faq: "❓",
  team: "👥",
  steps: "👣",
};

export default memo(function LayersPanel({
  blocks,
  selectedIndex,
  onSelect,
  onDelete,
}: LayersPanelProps) {
  const getBlockName = (block: BlockData) => {
    const names: Record<string, string> = {
      "header-1": "Header",
      "hero-1": "Hero Classic",
      "hero-2": "Hero Gradient",
      "hero-3": "Hero Split",
      "feature-1": "Features List",
      "feature-2": "Features Grid",
      "benefit-1": "Benefits",
      "cta-1": "Call to Action",
      "gallery-1": "Галерея",
      "faq-1": "FAQ",
      "team-1": "Команда",
      "steps-1": "Шаги",
      "pricing-1": "Тарифы",
      "testimonial-1": "Отзывы",
      "footer-1": "Подвал",
    };
    return names[block.variant] || block.variant;
  };

  if (blocks.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📋</div>
        <p className={styles.emptyText}>Нет блоков</p>
        <p className={styles.emptyHint}>Добавьте блоки из панели слева</p>
      </div>
    );
  }

  return (
    <div className={styles.layers}>
      {blocks.map((block, index) => {
        const type = block.type;
        const icon = blockIcons[type] || "📦";
        const isSelected = index === selectedIndex;

        return (
          <div
            key={`${block.variant}-${index}`}
            className={`${styles.layer} ${isSelected ? styles.selected : ""}`}
            onClick={() => onSelect(index)}
          >
            <span className={styles.dragIcon}>⋮⋮</span>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.name}>{getBlockName(block)}</span>
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
              title="Удалить"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
});
