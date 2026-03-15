import { useState, useEffect, useCallback } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { BlockData, BlockProps } from "../../../type/blocks";
import BlocksPanel from "../../organisms/BlocksPanel/BlocksPanel";
import Canvas from "../../templates/Canvas/Canvas";
import EditPanel from "../../organisms/EditPanel/EditPanel";
import DndProvider from "../../../dnd/DndProvider";
import ProjectActions from "../../organisms/EditPanel/ProjectActions";
import Header from "../../organisms/Header/Header";
import Toolbar, { type DeviceType } from "../../organisms/Toolbar/Toolbar";
import LayersPanel from "../../organisms/LayersPanel/LayersPanel";
import TemplatesModal from "../../organisms/TemplatesModal/TemplatesModal";
import PreviewModal from "../../organisms/PreviewModal/PreviewModal";
import { useHotkeys } from "../../../hooks/useHotkeys";
import { useToast } from "../../../contexts/ToastProvider";
import {
  templates,
  templateCategories,
  type Template,
} from "../../../utils/templates";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import styles from "./EditorPage.module.css";

const MAX_HISTORY = 50;

export default function EditorPage() {
  const toast = useToast();
  const [blocks, setBlocks] = useState<BlockData[]>(() =>
    loadFromLocalStorage(),
  );
  const [activeBlock, setActiveBlock] = useState<BlockData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // History for undo/redo
  const [history, setHistory] = useState<BlockData[][]>([
    loadFromLocalStorage(),
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // UI State
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [zoom, setZoom] = useState(1);
  const [activeTab, setActiveTab] = useState<"properties" | "layers">(
    "properties",
  );
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [showTemplatesOnEmpty, setShowTemplatesOnEmpty] = useState(
    blocks.length === 0,
  );
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Save to history
  const saveToHistory = useCallback(
    (newBlocks: BlockData[]) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(newBlocks);
        if (newHistory.length > MAX_HISTORY) {
          newHistory.shift();
        }
        return newHistory;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    },
    [historyIndex],
  );

  // Автосохранение при изменении блоков
  useEffect(() => {
    saveToLocalStorage(blocks);
  }, [blocks]);

  const addToHistory = (newBlocks: BlockData[]) => {
    saveToHistory(newBlocks);
    setBlocks(newBlocks);
  };

  // Обработчики действий
  const handleDeleteBlock = () => {
    if (selectedIndex === null) return;
    const newBlocks = blocks.filter((_, i) => i !== selectedIndex);
    addToHistory(newBlocks);
    setSelectedIndex(null);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  };

  const handleSave = () => {
    saveToLocalStorage(blocks);
    toast.success("Проект сохранен!");
  };

  const handlePreview = () => {
    setIsPreviewModalOpen(true);
  };

  const handleDuplicate = () => {
    if (selectedIndex === null) {
      toast.warning("Выберите блок для дублирования");
      return;
    }
    const blockToDuplicate = blocks[selectedIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(selectedIndex + 1, 0, { ...blockToDuplicate });
    addToHistory(newBlocks);
    setSelectedIndex(selectedIndex + 1);
    toast.success("Блок продублирован");
  };

  // Горячие клавиши
  useHotkeys({
    onSave: handleSave,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onDelete: handleDeleteBlock,
    onPreview: handlePreview,
    onDuplicate: handleDuplicate,
  });

  const handleDrop = (event: DragEndEvent) => {
    const { active, over } = event;

    // Если перетаскивание внутри canvas (сортировка)
    if (over?.id && active.id !== over.id) {
      const activeId = active.id.toString();
      const overId = over.id.toString();

      // Проверяем, это сортировка блоков (block-X) или добавление нового
      if (activeId.startsWith("block-") && overId.startsWith("block-")) {
        const fromIndex = parseInt(activeId.replace("block-", ""), 10);
        const toIndex = parseInt(overId.replace("block-", ""), 10);

        if (!isNaN(fromIndex) && !isNaN(toIndex) && fromIndex !== toIndex) {
          const newBlocks = [...blocks];
          const [removed] = newBlocks.splice(fromIndex, 1);
          newBlocks.splice(toIndex, 0, removed);
          addToHistory(newBlocks);
          setSelectedIndex(toIndex);
        }
      } else if (overId === "canvas" && !activeId.startsWith("block-")) {
        // Добавление нового блока из панели
        const blockData = active.data.current as BlockData;
        const newBlocks = [...blocks, blockData];
        addToHistory(newBlocks);
      }
    }
    setActiveBlock(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const blockData = event.active.data.current as BlockData;
    setActiveBlock(blockData);
  };

  const handleSelectBlock = (index: number) => {
    setSelectedIndex(index);
    setActiveTab("properties");
  };

  const handleUpdateBlock = (updatedProps: BlockProps) => {
    if (selectedIndex === null) return;
    const newBlocks = blocks.map((block, i) =>
      i === selectedIndex
        ? { ...block, props: { ...block.props, ...updatedProps } }
        : block,
    );
    addToHistory(newBlocks);
  };

  const handleImportBlocks = (newBlocks: BlockData[]) => {
    addToHistory(newBlocks);
    setSelectedIndex(null);
  };

  const handleClear = () => {
    if (window.confirm("Вы уверены, что хотите очистить весь проект?")) {
      addToHistory([]);
      setSelectedIndex(null);
      toast.success("Проект очищен");
    }
  };

  const handleExport = () => {
    // TODO: Open export modal
    toast.info("Экспорт будет доступен в следующей версии");
  };

  const handlePublish = () => {
    // TODO: Open publish modal
    toast.info("Публикация будет доступна в следующей версии");
  };

  const handleNewProject = () => {
    setIsTemplatesModalOpen(true);
  };

  const handleSelectTemplate = (template: Template) => {
    addToHistory(template.blocks);
    setSelectedIndex(null);
    setIsTemplatesModalOpen(false);
    setShowTemplatesOnEmpty(false);
    clearLocalStorage();
  };

  const handleSkipTemplate = () => {
    setIsTemplatesModalOpen(false);
    setShowTemplatesOnEmpty(false);
  };

  return (
    <div className={styles.editorLayout}>
      <DndProvider
        onDragStart={handleDragStart}
        onDragEnd={handleDrop}
        activeBlock={activeBlock}
      >
        <Header
          projectName="Мой лендинг"
          onSave={handleSave}
          onPreview={handlePreview}
          onExport={handleExport}
          onPublish={handlePublish}
          onNewProject={handleNewProject}
        />

        <div className={styles.editorBody}>
          <div className={styles.sidebar}>
            <BlocksPanel />
          </div>

          <div className={styles.canvasArea}>
            <Toolbar
              device={device}
              zoom={zoom}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              onDeviceChange={setDevice}
              onZoomChange={setZoom}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onClear={handleClear}
            />

            <div className={styles.canvasWrapper}>
              <Canvas
                blocks={blocks}
                onSelect={handleSelectBlock}
                selectedIndex={selectedIndex}
                device={device}
                zoom={zoom}
              />
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTabs}>
              <button
                className={`${styles.tab} ${activeTab === "properties" ? styles.active : ""}`}
                onClick={() => setActiveTab("properties")}
              >
                ⚙️ Свойства
              </button>
              <button
                className={`${styles.tab} ${activeTab === "layers" ? styles.active : ""}`}
                onClick={() => setActiveTab("layers")}
              >
                📋 Слои
              </button>
            </div>

            <div className={styles.panelContent}>
              {activeTab === "properties" ? (
                <>
                  <ProjectActions
                    blocks={blocks}
                    onImport={handleImportBlocks}
                  />
                  <EditPanel
                    block={blocks[selectedIndex ?? -1]}
                    onChange={handleUpdateBlock}
                    onDelete={handleDeleteBlock}
                  />
                </>
              ) : (
                <LayersPanel
                  blocks={blocks}
                  selectedIndex={selectedIndex}
                  onSelect={handleSelectBlock}
                  onDelete={(index) => {
                    const newBlocks = blocks.filter((_, i) => i !== index);
                    addToHistory(newBlocks);
                    setSelectedIndex(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </DndProvider>

      <TemplatesModal
        isOpen={isTemplatesModalOpen || showTemplatesOnEmpty}
        onClose={handleSkipTemplate}
        onSelectTemplate={handleSelectTemplate}
        templates={templates}
        categories={templateCategories}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        blocks={blocks}
      />
    </div>
  );
}
