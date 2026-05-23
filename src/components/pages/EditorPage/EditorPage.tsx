import { useEffect, useState, useCallback } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
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
import { setBlocks } from "../../../store/slices/blocksSlice";
import { push as pushHistory, setPresent } from "../../../store/slices/historySlice";
import { useAppDispatch } from "../../../store/hooks";
import { templates, type Template, templateCategories } from "../../../utils/templates";
import type { BlockData } from "../../../type/blocks";

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

  // Локальное состояние для отображения кастомного Drag Превью (Строгая типизация без any)
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
    openTemplates 
  } = useUI();
  const { saveProject, importProject, clearProject } = useProject();
  const toast = useToast();

  // АРХИТЕКТУРА СИНХРОНИЗАЦИИ: Главный синхронизатор Undo/Redo. 
  // Перебрасывает снимки истории из history.present обратно в блоки для отрисовки холста
  useEffect(() => {
    if (historyState.present && historyState.present !== blocks) {
      dispatch(setBlocks(historyState.present));
    }
  }, [historyState.present, blocks, dispatch]);

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

    // Ищем, есть ли блок с таким ID среди существующих на холсте
    const existingBlock = blocks.find((b) => b.id === activeId);

    if (existingBlock) {
      // Сценарий 1: Сортировка существующего блока на холсте (Превью зафиксировано)
      setActiveDragBlock(existingBlock);
    } else {
      // Сценарий 2: Тащим новый блок из левой панели палитры
      const blockData = active.data.current as { type: string; variant: string };
      if (blockData?.type && blockData?.variant) {
        setActiveDragBlock({
          id: activeId, // Передаем ID варианта ("hero-1") для корректного маппинга мини-превью
          type: blockData.type,
          variant: blockData.variant,
          props: {},
        });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragBlock(null); // Всегда сбрасываем оверлей по завершению drag'а

    if (!over?.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Массив ID всех блоков, которые сейчас уже лежат на холсте
    const existingBlockIds = blocks.map((b) => b.id);

    // СЦЕНАРИЙ 1: Сортировка уже существующих на холсте блоков между собой
    if (active.id !== over.id && existingBlockIds.includes(activeId)) {
      const fromIndex = blocks.findIndex((b) => b.id === activeId);
      const toIndex = blocks.findIndex((b) => b.id === overId);

      if (fromIndex !== -1 && toIndex !== -1) {
        blockActions.moveBlock(fromIndex, toIndex);
        return;
      }
    }

    // СЦЕНАРИЙ 2: Дроп абсолютно НОВОГО блока из левой панели палитры в любую точку
    if (!existingBlockIds.includes(activeId)) {
      const blockData = active.data.current as { type: string; variant: string };
      
      if (blockData?.type && blockData?.variant) {
        const newBlock: BlockData = { 
          id: generateId(), // Генерируем уникальный стабильный ID для нового блока
          type: blockData.type, 
          variant: blockData.variant, 
          props: {},
        };

        let targetIndex = blocks.length; // По умолчанию дропаем в самый конец списка

        // ИНТЕРПОЛЯЦИЯ МЕЖДУ БЛОКАМИ:
        // Если мы отпустили новый блок НАД каким-то конкретным существующим блоком
        if (existingBlockIds.includes(overId)) {
          const overIndex = blocks.findIndex((b) => b.id === overId);
          if (overIndex !== -1) {
            targetIndex = overIndex; // Перехватываем индекс для точечного внедрения
          }
        }

        // Иммутабельно создаем новый массив с элементом на вычисленной позиции
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(targetIndex, 0, newBlock);
        
        // Обновляем глобальный стор конструктора и заносим снимок в историю изменений
        dispatch(setBlocks(updatedBlocks));
        dispatch(pushHistory(updatedBlocks));
        toast.success("Блок успешно добавлен на макет");
      }
    }
  };

  // Мемоизируем колбэки горячих клавиш, чтобы избежать инвалидации ссылок
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
        {/* Шапка редактора */}
        <Header
          projectName="Мой лендинг"
          onSave={handleSave}
          onPreview={openPreview}
          onExport={() => toast.info("Экспорт будет доступен в следующей версии")}
          onPublish={() => toast.info("Публикация будет доступна в следующей версии")}
          onNewProject={openTemplates}
        />

        <div className={styles.editorBody}>
          {/* Левая панель с доступными компонентами */}
          <div className={styles.sidebar}>
            <BlocksPanel />
          </div>

          {/* Центральная интерактивная рабочая область (Canvas) */}
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

          {/* Правая контекстная панель управления */}
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
                  onDelete={(index) => blockActions.deleteBlock(index)}
                />
              )}
            </div>
          </div>
        </div>
      </DndProvider>

      {/* Модальные окна */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={closeTemplates}
        onSelectTemplate={handleSelectTemplate}
        templates={templates}
        categories={templateCategories}
      />

      <PreviewModal 
        isOpen={isPreviewModalOpen} 
        onClose={closePreview} 
        blocks={blocks} 
      />
    </div>
  );
}