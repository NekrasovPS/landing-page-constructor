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
    "hero-4": { icon: "🔥", label: "Split Screen" },
    "hero-5": { icon: "💎", label: "Centered" },
    "hero-6": { icon: "🎬", label: "Video BG" },
    "hero-7": { icon: "⚪", label: "Minimalist" },
    "hero-8": { icon: "📝", label: "With Form" },
    "hero-9": { icon: "🔤", label: "Typographic" },
    "hero-10": { icon: "🌙", label: "Dark Mode" },
    "feature-1": { icon: "⭐", label: "Список особенностей" },
    "feature-2": { icon: "📊", label: "Сетка преимуществ" },
    "benefit-1": { icon: "✓", label: "Наши преимущества" },
    "pricing-1": { icon: "💰", label: "Тарифы" },
    "testimonial-1": { icon: "💬", label: "Отзывы" },
    "cta-1": { icon: "📣", label: "Призыв к действию" },
    "footer-1": { icon: "📍", label: "Подвал" },
    "gallery-1": { icon: "🖼️", label: "Галерея" },
    "faq-1": { icon: "❓", label: "Вопросы и ответы" },
    "team-1": { icon: "👥", label: "Команда" },
    "steps-1": { icon: "👣", label: "Этапы работы" },
    "statistics-1": { icon: "📊", label: "Статистика" },
    "logos-1": { icon: "🏢", label: "Логотипы" },
    "video-1": { icon: "🎬", label: "Видео" },
    "newsletter-1": { icon: "📧", label: "Рассылка" },
    "contact-1": { icon: "✉️", label: "Контакты" },
    "app-1": { icon: "📱", label: "Приложение" },
  };

  const info = blockInfo[block.variant] || { icon: "📦", label: block.variant };

  return (
    <div className={styles.miniBlock}>
      <span className={styles.miniIcon}>{info.icon}</span>
      <span className={styles.miniLabel}>{info.label}</span>
    </div>
  );
}

/**
 * DndProvider - обертка для drag-and-drop
 * KISS: только необходимая логика
 */
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
