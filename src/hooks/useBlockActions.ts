import { useAppDispatch } from "../store/hooks";
import {
  deleteBlock as deleteBlockAction,
  duplicateBlock as duplicateBlockAction,
  updateBlock as updateBlockAction,
  moveBlock as moveBlockAction,
  selectBlock as selectBlockAction,
} from "../store/slices/blocksSlice";
import { push as pushHistory } from "../store/slices/historySlice";
import { useToast } from "../contexts/ToastProvider";
import { moveArrayItem, duplicateArrayItem } from "../utils/helpers";
import type { BlockData, BlockProps } from "../type/blocks";

interface UseBlockActionsOptions {
  blocks: BlockData[]; // Исправлено с any[] на строгий тип BlockData[]
  selectedIndex: number | null;
}

export function useBlockActions({ blocks, selectedIndex }: UseBlockActionsOptions) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const deleteBlock = (explicitIndex?: number) => {
    const indexToDelete = explicitIndex ?? selectedIndex;
    if (indexToDelete === null || indexToDelete === undefined) {
      toast.warning("Выберите блок для удаления");
      return false;
    }
    
    // Формируем иммутабельный снимок состояния ДЛЯ истории ДО удаления
    const nextBlocks = blocks.filter((_, i) => i !== indexToDelete);
    
    dispatch(deleteBlockAction(indexToDelete));
    dispatch(pushHistory(nextBlocks));
    toast.success("Блок удален");
    return true;
  };

  const duplicateBlock = () => {
    if (selectedIndex === null) {
      toast.warning("Выберите блок для дублирования");
      return false;
    }
    
    dispatch(duplicateBlockAction(selectedIndex));
    
    // АРХИТЕКТУРА #2: Теперь дублирование корректно записывается в историю Undo/Redo
    const nextBlocks = duplicateArrayItem(blocks, selectedIndex);
    dispatch(pushHistory(nextBlocks));
    
    toast.success("Блок продублирован");
    return true;
  };

  const updateBlock = (props: BlockProps) => {
    if (selectedIndex === null) return false;
    dispatch(updateBlockAction({ index: selectedIndex, props }));
    // Снимок истории для инпутов пишется по onBlur в компоненте EditPanel
    return true;
  };

  const moveBlock = (from: number, to: number) => {
    dispatch(moveBlockAction({ from, to }));
    
    // БАГ #3: Исправлена некорректная формула сохранения мапы. Используем чистую утилиту.
    const updatedHistoryArray = moveArrayItem(blocks, from, to);
    dispatch(pushHistory(updatedHistoryArray));
  };

  const selectBlock = (index: number | null) => {
    dispatch(selectBlockAction(index));
  };

  return {
    deleteBlock,
    duplicateBlock,
    updateBlock,
    moveBlock,
    selectBlock,
  };
}