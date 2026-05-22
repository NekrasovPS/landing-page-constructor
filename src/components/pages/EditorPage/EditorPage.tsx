import { useEffect, useState, useCallback } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { BlockData } from "../../../type/blocks";
import BlocksPanel from "../../organisms/BlocksPanel/BlocksPanel";
import Canvas from "../../templates/Canvas/Canvas";
import EditPanel from "../../organisms/EditPanel/EditPanel";
import DndProvider from "../../../dnd/DndProvider";
import ProjectActions from "../../organisms/EditPanel/ProjectActions";
import Header from "../../organisms/Header/Header";
import Toolbar from "../../organisms/Toolbar/Toolbar";
import LayersPanel from "../../organisms/LayersPanel/LayersPanel";
import TemplatesModal from "../../organisms/TemplatesModal/TemplatesModal";
import PreviewModal from "../../organisms/PreviewModal/PreviewModal";
import { useHotkeys } from "../../../hooks/useHotkeys";
import { useToast } from "../../../contexts/ToastProvider";
import { useProject } from "../../../hooks/useProject";
import { useBlockActions } from "../../../hooks/useBlockActions";
import { useUI } from "../../../hooks/useUI";
import { generateId } from "../../../utils/helpers";
import {
  useBlocks,
  useSelectedBlockId,
  useSelectedBlock,
  useCanUndo,
  useCanRedo,
  useDevice,
  useZoom,
  useActiveTab,
  useIsTemplatesModalOpen,
  useIsPreviewModalOpen,
  useHistory,
} from "../../../store/hooks";
import { addBlock, setBlocks } from "../../../store/slices/blocksSlice";
import { push as pushHistory, setPresent } from "../../../store/slices/historySlice";
import { useAppDispatch } from "../../../store/hooks";
import { templates, type Template, templateCategories } from "../../../utils/templates";

import styles from "./EditorPage.module.css";

export default function EditorPage() {
  const dispatch = useAppDispatch();
  const blocks = useBlocks();
  const selectedIndex = useSelectedBlockId();
  const selectedBlock = useSelectedBlock();
  const activeTab = useActiveTab();
  const device = useDevice();
  const zoom = useZoom();
  const historyState = useHistory();

  const isTemplatesModalOpen = useIsTemplatesModalOpen();
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  // БАГ #2: Локальное состояние для отображения кастомного Drag Превью (any заменен на BlockData)
  const [activeDragBlock, setActiveDragBlock] = useState<BlockData | null>(null);

  const blockActions = useBlockActions({ blocks, selectedIndex });
  const {
    closeTemplates,
    closePreview,
    undo,
    redo,
    openPreview,
    setDevice,
    setZoom,
    setActiveTab,
    openTemplates,
  } = useUI();
  const { saveProject, importProject, clearProject } = useProject();
  const toast = useToast();

  // АРХИТЕКТУРА #4: Главный синхронизатор Undo/Redo.
  // Перебрасывает снимки истории из history.present обратно в блоки для отрисовки холста
  useEffect(() => {
    if (historyState.present && historyState.present !== blocks) {
      dispatch(setBlocks(historyState.present));
    }
  }, [historyState.present, dispatch, blocks]);

  // Первичный запуск — заносим дефолтные блоки в историю
  useEffect(() => {
    if (blocks.length > 0 && historyState.present.length === 0) {
      dispatch(setPresent(blocks));
    }
  }, [blocks, dispatch, historyState.present.length]);

  // Обработчики Drag-and-Drop
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id.toString();

    // Если тащим из левой панели (создание нового блока)
    if (!activeId.startsWith("block-")) {
      const blockData = active.data.current as { type: string; variant: string };
      if (blockData) {
        setActiveDragBlock({
          id: "temp-drag-id",
          type: blockData.type,
          variant: blockData.variant,
          props: {},
        });
      }
    } else {
      // Если сортируем существующие блоки на холсте
      const index = parseInt(activeId.replace("block-", ""), 10);
      if (!isNaN(index) && blocks[index]) {
        setActiveDragBlock(blocks[index]);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragBlock(null); // Всегда сбрасываем оверлей по завершению drag'а

    if (!over?.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // 1. Сценарий сортировки на холсте (по стабильным ID)
    if (active.id !== over.id && !blocks.map((b) => b.id).includes(activeId)) {
      const fromIndex = blocks.findIndex((b) => b.id === active.id);
      const toIndex = blocks.findIndex((b) => b.id === over.id);

      if (fromIndex !== -1 && toIndex !== -1) {
        blockActions.moveBlock(fromIndex, toIndex);
        return;
      }
    }

    // 2. Сценарий дропа нового блока из левой панели на холст
    if (overId === "canvas") {
      const blockData = active.data.current as { type: string; variant: string };
      if (blockData?.type && blockData?.variant) {
        const newBlock = {
          id: generateId(), // Стабильный ID вместо индексов
          type: blockData.type,
          variant: blockData.variant,
          props: {},
        };

        dispatch(addBlock(newBlock));
        dispatch(pushHistory([...blocks, newBlock]));
        toast.success("Блок добавлен");
      }
    }
  };

  // Мемоизируем колбэки горячих клавиш, чтобы не плодить подписки вuseHotkeys
  const handleSave = useCallback(() => {
    saveProject();
    toast.success("Проект сохранен!");
  }, [saveProject, toast]);

  const handleClear = useCallback(() => {
    if (window.confirm("Вы уверены, что хотите очистить весь проект?")) {
      clearProject();
      toast.success("Проект очищен");
    }
  }, [clearProject, toast]);

  useHotkeys({
    onSave: handleSave,
    onUndo: useCallback(() => undo(), [undo]),
    onRedo: useCallback(() => redo(), [redo]),
    onDelete: useCallback(() => blockActions.deleteBlock(), [blockActions]),
    onPreview: useCallback(() => openPreview(), [openPreview]),
    onDuplicate: useCallback(() => blockActions.duplicateBlock(), [blockActions]),
  });

  const handleSelectTemplate = (template: Template) => {
    importProject(template.blocks);
    closeTemplates();
  };

  return (
    <div className={styles.editorLayout}>
      <DndProvider
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        activeBlock={activeDragBlock}
      >
        {/* Хедер разметки */}
        <Header
          projectName="Мой лендинг"
          onSave={handleSave}
          onPreview={openPreview}
          onExport={() => toast.info("Экспорт будет доступен в следующей версии")}
          onPublish={() => toast.info("Публикация будет доступна в следующей версии")}
          onNewProject={openTemplates}
        />

        <div className={styles.editorBody}>
          <div className={styles.sidebar}>
            <BlocksPanel />
          </div>

          {/* Рабочая область Canvas */}
          <div className={styles.canvasArea}>
            <Toolbar
              device={device}
              zoom={zoom}
              canUndo={canUndo}
              canRedo={canRedo}
              onDeviceChange={setDevice}
              onZoomChange={setZoom}
              onUndo={undo}
              onRedo={redo}
              onClear={handleClear}
            />
            <div className={styles.canvasWrapper}>
              <Canvas
                blocks={blocks}
                onSelect={blockActions.selectBlock}
                selectedIndex={selectedIndex}
                device={device}
                zoom={zoom}
              />
            </div>
          </div>

          {/* Правая панель управления */}
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
                  <ProjectActions blocks={blocks} onImport={importProject} />
                  <EditPanel
                    block={selectedBlock || undefined}
                    onChange={blockActions.updateBlock}
                    onDelete={blockActions.deleteBlock}
                  />
                </>
              ) : (
                <LayersPanel
                  blocks={blocks}
                  selectedIndex={selectedIndex}
                  onSelect={blockActions.selectBlock}
                  onDelete={(index) => blockActions.deleteBlock(index)} // БАГ #1: Исправлено — теперь прокидываем индекс конкретного слоя
                />
              )}
            </div>
          </div>
        </div>
      </DndProvider>

      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={closeTemplates}
        onSelectTemplate={handleSelectTemplate}
        templates={templates}
        categories={templateCategories}
      />

      <PreviewModal isOpen={isPreviewModalOpen} onClose={closePreview} blocks={blocks} />
    </div>
  );
}
