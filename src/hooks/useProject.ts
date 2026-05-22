import { useEffect } from "react";
import { useAppDispatch, useBlocks } from "../store/hooks";
import { setBlocks } from "../store/slices/blocksSlice";
import { push as pushHistory } from "../store/slices/historySlice";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import type { BlockData } from "../type/blocks";

/**
 * Хук для управления проектом.
 * Отвечает за загрузку, автосохранение и очистку стейта проекта.
 */
export function useProject() {
  const dispatch = useAppDispatch();
  const blocks = useBlocks(); // Получаем актуальные блоки напрямую из Redux

  // Загрузка проекта при первичном монтировании приложения
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved && saved.length > 0) {
      dispatch(setBlocks(saved));
    }
  }, [dispatch]);

  // Автосохранение в localStorage с дебаунсом в 1 секунду при изменении блоков
  useEffect(() => {
    if (blocks.length === 0) return;

    const timer = setTimeout(() => {
      saveToLocalStorage(blocks);
    }, 1000);

    // Очищаем таймер, если блоки изменились быстрее, чем за 1 секунду
    return () => clearTimeout(timer);
  }, [blocks]);

  const saveProject = () => {
    saveToLocalStorage(blocks);
  };

  const importProject = (newBlocks: BlockData[]) => {
    dispatch(setBlocks(newBlocks));
    dispatch(pushHistory(newBlocks));
  };

  const clearProject = () => {
    dispatch(setBlocks([]));
    dispatch(pushHistory([]));
  };

  return {
    saveProject,
    importProject,
    clearProject,
  };
}