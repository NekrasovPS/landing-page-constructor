import { memo } from "react";
import styles from "./Header.module.css";

export interface HeaderProps {
  projectName: string;
  onSave: () => void;
  onPreview: () => void;
  onExport: () => void;
  onPublish: () => void;
  onNewProject: () => void;
}

export default memo(function Header({
  projectName,
  onSave,
  onPreview,
  onExport,
  onPublish,
  onNewProject,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🎨</span>
        <h1 className={styles.title}>Landing Builder</h1>
      </div>

      <div className={styles.projectInfo}>
        <span className={styles.projectName}>{projectName}</span>
        <span className={styles.status}>🟢 Сохранено</span>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.btn}
          onClick={onNewProject}
          title="Новый проект"
        >
          <span className={styles.btnIcon}>📄</span>
          <span>Новый</span>
        </button>
        <button
          className={styles.btn}
          onClick={onSave}
          title="Сохранить (Ctrl+S)"
        >
          <span className={styles.btnIcon}>💾</span>
          <span>Сохранить</span>
        </button>
        <button
          className={styles.btnPrimary}
          onClick={onPreview}
          title="Предпросмотр"
        >
          <span className={styles.btnIcon}>👁️</span>
          <span>Предпросмотр</span>
        </button>
        <button className={styles.btn} onClick={onExport} title="Экспорт">
          <span className={styles.btnIcon}>📤</span>
          <span>Экспорт</span>
        </button>
        <button
          className={styles.btnPublish}
          onClick={onPublish}
          title="Опубликовать"
        >
          <span className={styles.btnIcon}>🚀</span>
          <span>Опубликовать</span>
        </button>
      </div>
    </header>
  );
});
