import { useEffect } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
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
} from "../../../store/hooks";
import { addBlock } from "../../../store/slices/blocksSlice";
import { push as pushHistory } from "../../../store/slices/historySlice";
import { useAppDispatch } from "../../../store/hooks";
import { setProjectBlocks } from "../../../hooks/useProject";
import { templates, templateCategories, type Template } from "../../../utils/templates";

import styles from "./EditorPage.module.css";

/**
 * Компонент хедера с обработчиками
 */
function EditorHeader() {
  const { saveProject } = useProject();
  const { openPreview, openTemplates } = useUI();
  const toast = useToast();

  return (
    <Header
      projectName="Мой лендинг"
      onSave={() => {
        saveProject();
        toast.success("Проект сохранен!");
      }}
      onPreview={openPreview}
      onExport={() => toast.info("Экспорт будет доступен в следующей версии")}
      onPublish={() => toast.info("Публикация будет доступна в следующей версии")}
      onNewProject={openTemplates}
    />
  );
}

/**
 * Компонент рабочей области с canvas
 */
function EditorCanvasArea() {
  const blocks = useBlocks();
  const selectedIndex = useSelectedBlockId();
  const device = useDevice();
  const zoom = useZoom();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const { selectBlock } = useBlockActions({ blocks, selectedIndex });
  const { setDevice, setZoom, undo, redo } = useUI();
  const { clearProject } = useProject();
  const toast = useToast();

  const handleClear = () => {
    if (window.confirm("Вы уверены, что хотите очистить весь проект?")) {
      clearProject();
      toast.success("Проект очищен");
    }
  };

  return (
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
          onSelect={selectBlock}
          selectedIndex={selectedIndex}
          device={device}
          zoom={zoom}
        />
      </div>
    </div>
  );
}

/**
 * Компонент правой панели
 */
function EditorPanel() {
  const blocks = useBlocks();
  const selectedIndex = useSelectedBlockId();
  const selectedBlock = useSelectedBlock();
  const activeTab = useActiveTab();

  const blockActions = useBlockActions({ blocks, selectedIndex });
  const { setActiveTab } = useUI();
  const { importProject } = useProject();

  return (
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
            onDelete={() => blockActions.deleteBlock()}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Главный компонент редактора
 * Следует принципу SRP - только координация компонентов
 */
export default function EditorPage() {
  const dispatch = useAppDispatch();
  const blocks = useBlocks();
  const selectedIndex = useSelectedBlockId();
  const isTemplatesModalOpen = useIsTemplatesModalOpen();
  const isPreviewModalOpen = useIsPreviewModalOpen();

  const blockActions = useBlockActions({ blocks, selectedIndex });
  const { closeTemplates, closePreview, undo, redo, openPreview } = useUI();
  const { saveProject, importProject } = useProject();
  const toast = useToast();

  // Обновляем reference для useProject
  useEffect(() => {
    setProjectBlocks(blocks);
  }, [blocks]);

  // Обработчики Drag-and-Drop
  const handleDragStart = () => {
    // Для новых блоков из панели
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      const activeId = active.id.toString();
      const overId = over.id.toString();

      // Сортировка блоков
      if (activeId.startsWith("block-") && overId.startsWith("block-")) {
        const fromIndex = parseInt(activeId.replace("block-", ""), 10);
        const toIndex = parseInt(overId.replace("block-", ""), 10);

        if (!isNaN(fromIndex) && !isNaN(toIndex) && fromIndex !== toIndex) {
          blockActions.moveBlock(fromIndex, toIndex);
        }
      }
      // Добавление нового блока
      else if (overId === "canvas" && !activeId.startsWith("block-")) {
        const blockData = active.data.current as { type: string; variant: string };
        if (blockData?.type && blockData?.variant) {
          dispatch(addBlock({ type: blockData.type, variant: blockData.variant, props: {} }));
          dispatch(
            pushHistory([
              ...blocks,
              { type: blockData.type, variant: blockData.variant, props: {} },
            ])
          );
          toast.success("Блок добавлен");
        }
      }
    }
  };

  // Горячие клавиши
  useHotkeys({
    onSave: () => {
      saveProject();
      toast.success("Проект сохранен!");
    },
    onUndo: () => undo(),
    onRedo: () => redo(),
    onDelete: () => blockActions.deleteBlock(),
    onPreview: () => openPreview(),
    onDuplicate: () => {
      if (blockActions.duplicateBlock()) {
        toast.success("Блок продублирован");
      }
    },
  });

  const handleSelectTemplate = (template: Template) => {
    importProject(template.blocks);
    closeTemplates();
  };

  return (
    <div className={styles.editorLayout}>
      <DndProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd} activeBlock={null}>
        <EditorHeader />

        <div className={styles.editorBody}>
          <div className={styles.sidebar}>
            <BlocksPanel />
          </div>

          <EditorCanvasArea />

          <EditorPanel />
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
