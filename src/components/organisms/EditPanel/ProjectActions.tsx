import { useRef } from "react";
import {
  exportProject,
  exportProjectAsZip,
  importProject,
} from "../../../utils/projectExporter";
import type { BlockData } from "../../../type/blocks";

import styles from "./ProjectActions.module.css";

interface ProjectActionsProps {
  blocks: BlockData[];
  onImport: (blocks: BlockData[]) => void;
}

export default function ProjectActions({
  blocks,
  onImport,
}: ProjectActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    exportProject(blocks, "landing-project");
  };

  const handleExportZip = () => {
    exportProjectAsZip(blocks, "landing-project");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const project = await importProject(file);
      onImport(project.blocks);
    } catch {
      alert("Ошибка импорта проекта");
    }

    e.target.value = "";
  };

  return (
    <div className={styles.container}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button className={styles.button} onClick={handleImportClick}>
        📥 Импорт
      </button>
      <button className={styles.button} onClick={handleExportJson}>
        📤 JSON
      </button>
      <button className={styles.button} onClick={handleExportZip}>
        📦 ZIP
      </button>
    </div>
  );
}
