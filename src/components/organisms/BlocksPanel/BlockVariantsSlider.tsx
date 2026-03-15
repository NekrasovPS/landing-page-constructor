import DraggableBlock from "../../molecules/DraggableBlock/DraggableBlock";
import styles from "./BlockVariantsSlider.module.css";

interface Props {
  isOpen: boolean;
  title: string;
  blocks: { id: string; type: string; variant: string }[];
  onClose: () => void;
}

const blockIcons: Record<string, string> = {
  "hero-1": "🎯",
  "hero-2": "✨",
  "hero-3": "🖼️",
  "feature-1": "⭐",
  "feature-2": "📊",
  "benefit-1": "✓",
  "pricing-1": "💰",
  "testimonial-1": "💬",
  "cta-1": "📣",
  "footer-1": "📍",
  "gallery-1": "🖼️",
  "faq-1": "❓",
  "team-1": "👥",
  "steps-1": "👣",
};

const blockLabels: Record<string, string> = {
  "hero-1": "Классический Hero",
  "hero-2": "Градиент Hero",
  "hero-3": "Hero с фото",
  "feature-1": "Список особенностей",
  "feature-2": "Сетка преимуществ",
  "benefit-1": "Наши преимущества",
  "pricing-1": "Тарифы",
  "testimonial-1": "Отзывы",
  "cta-1": "Призыв к действию",
  "footer-1": "Подвал",
  "gallery-1": "Галерея",
  "faq-1": "Вопросы и ответы",
  "team-1": "Команда",
  "steps-1": "Этапы работы",
};

export default function BlockVariantsSlider({
  isOpen,
  title,
  blocks,
  onClose,
}: Props) {
  return (
    <div
      className={`${styles.wrapper} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.header}>
        <strong>{title}</strong>
        <button onClick={onClose}>✕</button>
      </div>

      {blocks.map((block) => (
        <DraggableBlock
          key={block.id}
          id={block.id}
          label={blockLabels[block.variant] || block.variant}
          icon={blockIcons[block.variant] || "📦"}
          data={{ type: block.type, variant: block.variant }}
        />
      ))}
    </div>
  );
}
