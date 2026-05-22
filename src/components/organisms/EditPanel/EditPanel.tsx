import styles from "./EditPanel.module.css";
import type { BlockData, BlockProps } from "../../../type/blocks";
import { blockMap } from "../../../utils/blockMap";
import { memo, useState, useEffect } from "react";

interface EditPanelProps {
  block?: BlockData;
  onChange: (updated: BlockProps) => void;
  onDelete: () => void;
}

export default memo(function EditPanel({ block, onChange, onDelete }: EditPanelProps) {
  // Локальный стейт для изоляции ввода текста от ререндера Canvas
  const [localProps, setLocalProps] = useState<Record<string, string>>({});

  // Синхронизируем локальный стейт только при смене выбранного блока или его внешних пропсов
  useEffect(() => {
    if (block?.props) {
      setLocalProps(block.props as Record<string, string>);
    } else {
      setLocalProps({});
    }
  }, [block?.variant, block?.props]);

  if (!block) {
    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>
            <span className={styles.panelIcon}>⚙️</span> Свойства
          </h3>
        </div>
        <div className={styles.panelContent}>
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>👈</span>
            <p className={styles.emptyText}>Выберите блок</p>
            <p className={styles.emptyHint}>Кликните на блок в холсте или на панели слоёв</p>
          </div>
        </div>
      </div>
    );
  }

  const meta = blockMap[block.variant];
  if (!meta) {
    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>
            <span className={styles.panelIcon}>⚙️</span> Свойства
          </h3>
          <span className={styles.blockVariant}>{block.variant}</span>
        </div>
        <div className={styles.panelContent}>
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>⚠️</span>
            <p className={styles.emptyText}>Нет настроек</p>
            <p className={styles.emptyHint}>Для этого блока нет редактируемых полей</p>
          </div>
        </div>
      </div>
    );
  }

  // Обработчик локального изменения (работает мгновенно)
  const handleLocalChange = (fieldName: string, value: string) => {
    setLocalProps((prev) => ({ ...prev, [fieldName]: value }));
  };

  // Пушим данные в глобальный Redux только при потере фокуса (onBlur)
  const handlePushToStore = (fieldName: string) => {
    onChange({ [fieldName]: localProps[fieldName] });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>
          <span className={styles.panelIcon}>⚙️</span> Свойства
        </h3>
        <span className={styles.blockVariant}>{block.variant}</span>
      </div>

      <div className={styles.panelContent}>
        {meta.editableFields.length > 0 ? (
          <>
            {meta.editableFields.map((field) => {
              // Принудительно кастим к string, убирая потенциальный number из keyof BlockProps
              const fieldName = field.name as string;

              return (
                <div className={styles.field} key={fieldName}>
                  <label className={styles.fieldLabel}>{field.label}</label>
                  {field.type === "text" || field.type === "number" ? (
                    <input
                      className={styles.fieldInput}
                      type={field.type}
                      value={localProps[fieldName] || ""}
                      onChange={(e) => handleLocalChange(fieldName, e.target.value)}
                      onBlur={() => handlePushToStore(fieldName)}
                      placeholder={`Введите ${field.label.toLowerCase()}`}
                    />
                  ) : field.type === "textarea" ? (
                    <textarea
                      className={`${styles.fieldInput} ${styles.textarea}`}
                      value={localProps[fieldName] || ""}
                      onChange={(e) => handleLocalChange(fieldName, e.target.value)}
                      onBlur={() => handlePushToStore(fieldName)}
                      placeholder={`Введите ${field.label.toLowerCase()}`}
                      rows={4}
                    />
                  ) : null}
                </div>
              );
            })}

            <div className={styles.deleteSection}>
              <button className={styles.deleteButton} onClick={onDelete}>
                <span>🗑️</span>
                <span>Удалить блок</span>
              </button>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📝</span>
            <p className={styles.emptyText}>Нет полей</p>
            <p className={styles.emptyHint}>Этот блок не имеет редактируемых полей</p>
          </div>
        )}
      </div>
    </div>
  );
});
