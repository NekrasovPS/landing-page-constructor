import { memo } from "react";
import type { Template } from "../../../utils/templates";
import styles from "./TemplatesModal.module.css";

export interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
  templates: Template[];
  categories: string[];
}

export default memo(function TemplatesModal({
  isOpen,
  onClose,
  onSelectTemplate,
  templates,
  categories,
}: TemplatesModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>📋 Выбрать шаблон</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={styles.categoryBtn}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.templatesGrid}>
          {templates.map((template) => (
            <div
              key={template.id}
              className={styles.templateCard}
              onClick={() => onSelectTemplate(template)}
            >
              <div className={styles.thumbnail}>
                {template.thumbnail}
              </div>
              <div className={styles.templateInfo}>
                <h3 className={styles.templateName}>{template.name}</h3>
                <p className={styles.templateDescription}>
                  {template.description}
                </p>
                <span className={styles.templateCategory}>
                  {template.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.hint}>
            💡 Выберите шаблон или закройте окно, чтобы начать с пустого проекта
          </p>
        </div>
      </div>
    </div>
  );
});
