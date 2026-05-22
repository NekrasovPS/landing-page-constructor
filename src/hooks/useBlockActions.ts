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
import type { BlockProps } from "../type/blocks";

interface UseBlockActionsOptions {
  blocks: any[];
  selectedIndex: number | null;
}

/**
 * Хук для действий с блоками
 * Инкапсулирует всю логику управления блоками
 */
export function useBlockActions({ blocks, selectedIndex }: UseBlockActionsOptions) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const deleteBlock = () => {
    if (selectedIndex === null) {
      toast.warning("Выберите блок для удаления");
      return false;
    }
    dispatch(deleteBlockAction(selectedIndex));
    dispatch(pushHistory(blocks.filter((_, i) => i !== selectedIndex)));
    toast.success("Блок удален");
    return true;
  };

  const duplicateBlock = () => {
    if (selectedIndex === null) {
      toast.warning("Выберите блок для дублирования");
      return false;
    }
    dispatch(duplicateBlockAction(selectedIndex));
    toast.success("Блок продублирован");
    return true;
  };

  const updateBlock = (props: BlockProps) => {
    if (selectedIndex === null) return false;
    dispatch(updateBlockAction({ index: selectedIndex, props }));
    return true;
  };

  const moveBlock = (from: number, to: number) => {
    dispatch(moveBlockAction({ from, to }));
    dispatch(pushHistory(blocks.map((b, i) => (i === to ? blocks[from] : b))));
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
