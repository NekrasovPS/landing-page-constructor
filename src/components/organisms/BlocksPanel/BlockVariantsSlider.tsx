import DraggableBlock from "../../molecules/DraggableBlock/DraggableBlock";
import styles from "./BlockVariantsSlider.module.css";

interface Props {
  isOpen: boolean;
  title: string;
  blocks: { id: string; type: string; variant: string }[];
  onClose: () => void;
}

// Senior Mapping: Полный реестр иконок для всех 26 вариантов блоков
const blockIcons: Record<string, string> = {
  "hero-1": "🎯",
  "hero-2": "✨",
  "hero-3": "🖼️",
  "hero-4": "🔥",
  "hero-5": "💎",
  "hero-6": "🎬",
  "hero-7": "⚪",
  "hero-8": "📝",
  "hero-9": "🔤",
  "hero-10": "🌙",
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
  "statistics-1": "📈",
  "logos-1": "🏢",
  "video-1": "🎥",
  "newsletter-1": "📧",
  "contact-1": "✉️",
  "app-1": "📱",
};

// Senior Mapping: Полный реестр локализованных названий для корректного UX
const blockLabels: Record<string, string> = {
  "hero-1": "Классический Hero",
  "hero-2": "Градиент Hero",
  "hero-3": "Hero с фото",
  "hero-4": "Разделенный экран",
  "hero-5": "Центрированный Hero",
  "hero-6": "Hero с видео-фоном",
  "hero-7": "Минималистичный Hero",
  "hero-8": "Hero с формой захвата",
  "hero-9": "Типографический Hero",
  "hero-10": "Темный неоновый Hero",
  "feature-1": "Список особенностей",
  "feature-2": "Сетка преимуществ",
  "benefit-1": "Наши преимущества",
  "pricing-1": "Тарифные планы",
  "testimonial-1": "Отзывы клиентов",
  "cta-1": "Призыв к действию",
  "footer-1": "Подвал сайта",
  "gallery-1": "Галерея работ",
  "faq-1": "Вопросы и ответы (FAQ)",
  "team-1": "Наша команда",
  "steps-1": "Этапы работы",
  "statistics-1": "Блок статистики",
  "logos-1": "Логотипы партнеров",
  "video-1": "Видео-презентация",
  "newsletter-1": "Подписка на рассылку",
  "contact-1": "Форма контактов",
  "app-1": "Скачивание приложения",
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
        <button onClick={onClose} aria-label="Закрыть панель">✕</button>
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