import { useMemo } from "react";
import { useAppDispatch } from "../store/hooks";
import {
  deleteBlock as deleteBlockAction,
  duplicateBlock as duplicateBlockAction,
  updateBlock as updateBlockAction,
  moveBlock as moveBlockAction,
  selectBlock as selectBlockAction,
} from "../store/slices/blocksSlice";
import { useToast } from "../contexts/ToastProvider";
import type { BlockData, BlockProps } from "../type/blocks";

interface UseBlockActionsOptions {
  blocks: BlockData[];
  selectedBlockId: string | null;
}

/**
 * #1/#2: Все действия работают по стабильному id блока.
 * Снимки в историю больше НЕ собираются вручную — за это отвечает
 * listenerMiddleware, который пишет snapshot после каждой мутации блоков.
 */
export function useBlockActions({ blocks, selectedBlockId }: UseBlockActionsOptions) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  // Индекс выбранного блока — производная величина, считаем на лету (для UI-пропсов)
  const selectedIndex = useMemo(
    () => (selectedBlockId === null ? null : blocks.findIndex((b) => b.id === selectedBlockId)),
    [blocks, selectedBlockId],
  );

  const deleteBlock = (explicitId?: string) => {
    const idToDelete = explicitId ?? selectedBlockId;
    if (!idToDelete) {
      toast.warning("Выберите блок для удаления");
      return false;
    }
    dispatch(deleteBlockAction(idToDelete));
    toast.success("Блок удален");
    return true;
  };

  const duplicateBlock = () => {
    if (!selectedBlockId) {
      toast.warning("Выберите блок для дублирования");
      return false;
    }
    dispatch(duplicateBlockAction(selectedBlockId));
    toast.success("Блок продублирован");
    return true;
  };

  const updateBlock = (props: BlockProps) => {
    if (!selectedBlockId) return false;
    dispatch(updateBlockAction({ id: selectedBlockId, props }));
    return true;
  };

  const moveBlock = (fromId: string, toId: string) => {
    dispatch(moveBlockAction({ fromId, toId }));
  };

  const selectBlock = (id: string | null) => {
    dispatch(selectBlockAction(id));
  };

  return {
    selectedIndex,
    deleteBlock,
    duplicateBlock,
    updateBlock,
    moveBlock,
    selectBlock,
  };
}
