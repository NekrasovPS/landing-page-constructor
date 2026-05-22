import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  setBlocks as setBlocksAction,
  addBlock as addBlockAction,
  updateBlock as updateBlockAction,
  deleteBlock as deleteBlockAction,
  duplicateBlock as duplicateBlockAction,
  moveBlock as moveBlockAction,
  selectBlock as selectBlockAction,
  clearBlocks as clearBlocksAction,
} from "./slices/blocksSlice";
import {
  setDevice as setDeviceAction,
  setZoom as setZoomAction,
  setActiveTab as setActiveTabAction,
  setTemplatesModalOpen as setTemplatesModalOpenAction,
  setPreviewModalOpen as setPreviewModalOpenAction,
} from "./slices/uiSlice";
import {
  push as pushHistoryAction,
  undo as undoHistoryAction,
  redo as redoHistoryAction,
} from "./slices/historySlice";

// Типизированные хуки
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Селекторы для blocks
export const useBlocks = () => useAppSelector((state) => state.blocks.items);
export const useSelectedBlockId = () => useAppSelector((state) => state.blocks.selectedId);
export const useSelectedBlock = () => {
  const blocks = useBlocks();
  const selectedId = useSelectedBlockId();
  return selectedId !== null ? blocks[selectedId] : null;
};

// Селекторы для UI
export const useDevice = () => useAppSelector((state) => state.ui.device);
export const useZoom = () => useAppSelector((state) => state.ui.zoom);
export const useActiveTab = () => useAppSelector((state) => state.ui.activeTab);
export const useIsTemplatesModalOpen = () =>
  useAppSelector((state) => state.ui.isTemplatesModalOpen);
export const useIsPreviewModalOpen = () => useAppSelector((state) => state.ui.isPreviewModalOpen);

// Селекторы для history
export const useCanUndo = () => useAppSelector((state) => state.history.past.length > 0);
export const useCanRedo = () => useAppSelector((state) => state.history.future.length > 0);
export const useHistory = () => useAppSelector((state) => state.history);

// Action creators для экспорта
export const addBlock = addBlockAction;
export const updateBlock = updateBlockAction;
export const deleteBlock = deleteBlockAction;
export const duplicateBlock = duplicateBlockAction;
export const moveBlock = moveBlockAction;
export const selectBlock = selectBlockAction;
export const setBlocks = setBlocksAction;
export const clearBlocks = clearBlocksAction;
export const setDevice = setDeviceAction;
export const setZoom = setZoomAction;
export const setActiveTab = setActiveTabAction;
export const setTemplatesModalOpen = setTemplatesModalOpenAction;
export const setPreviewModalOpen = setPreviewModalOpenAction;
export const push = pushHistoryAction;
export const undo = undoHistoryAction;
export const redo = redoHistoryAction;
