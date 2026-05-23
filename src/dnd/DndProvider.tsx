import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { ReactNode } from "react";
import type { BlockData } from "../type/blocks";
import styles from "./DndOverlay.module.css";

interface DndProviderProps {
  children: ReactNode;
  activeBlock: BlockData | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

/**
 * Мини-превью для перетаскиваемого блока
 */
function renderMiniPreview(block: BlockData) {
  const blockInfo: Record<string, { icon: string; label: string }> = {
    "hero-1": { icon: "🎯", label: "Классический Hero" },
    "hero-2": { icon: "✨", label: "Градиент Hero" },
    "hero-3": { icon: "🖼️", label: "Hero с фото" },
    "hero-4": { icon: "🔥", label: "Разделенный экран" },
    "hero-5": { icon: "💎", label: "Центрированный Hero" },
    "hero-6": { icon: "🎬", label: "Hero с видео-фоном" },
    "hero-7": { icon: "⚪", label: "Минималистичный Hero" },
    "hero-8": { icon: "📝", label: "Hero с формой захвата" },
    "hero-9": { icon: "🔤", label: "Типографический Hero" },
    "hero-10": { icon: "🌙", label: "Темный неоновый Hero" },
    "feature-1": { icon: "⭐", label: "Список особенностей" },
    "feature-2": { icon: "📊", label: "Сетка преимуществ" },
    "benefit-1": { icon: "✓", label: "Наши преимущества" },
    "pricing-1": { icon: "💰", label: "Тарифные планы" },
    "testimonial-1": { icon: "💬", label: "Отзывы клиентов" },
    "cta-1": { icon: "📣", label: "Призыв к действию" },
    "footer-1": { icon: "📍", label: "Подвал сайта" },
    "gallery-1": { icon: "🖼️", label: "Галерея работ" },
    "faq-1": { icon: "❓", label: "Вопросы и ответы (FAQ)" },
    "team-1": { icon: "👥", label: "Наша команда" },
    "steps-1": { icon: "👣", label: "Этапы работы" },
    "statistics-1": { icon: "📈", label: "Блок статистики" },
    "logos-1": { icon: "🏢", label: "Логотипы партнеров" },
    "video-1": { icon: "🎥", label: "Видео-презентация" },
    "newsletter-1": { icon: "📧", label: "Подписка на рассылку" },
    "contact-1": { icon: "✉️", label: "Форма контактов" },
    "app-1": { icon: "📱", label: "Скачивание приложения" },
  };

  const info = blockInfo[block.variant] || { icon: "📦", label: block.variant };

  return (
    <div className={styles.miniBlock}>
      <span className={styles.miniIcon}>{info.icon}</span>
      <span className={styles.miniLabel}>{info.label}</span>
    </div>
  );
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
      <DragOverlay dropAnimation={{ duration: 200 }}>
        {activeBlock ? renderMiniPreview(activeBlock) : null}
      </DragOverlay>
    </DndContext>
  );
}