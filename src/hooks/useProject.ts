import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setBlocks } from "../store/slices/blocksSlice";
import { push as pushHistory } from "../store/slices/historySlice";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import type { BlockData } from "../type/blocks";

// Временное решение для доступа к blocks в useEffect
let currentBlocks = [] as BlockData[];

export function setProjectBlocks(blocks: BlockData[]) {
  currentBlocks = blocks;
}

/**
 * Хук для управления проектом
 * Отвечает за загрузку, сохранение, экспорт/импорт
 */
export function useProject() {
  const dispatch = useAppDispatch();

  // Загрузка проекта при монтировании
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved.length > 0) {
      dispatch(setBlocks(saved));
    }
  }, [dispatch]);

  // Автосохранение при изменении блоков
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(currentBlocks);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const saveProject = () => {
    saveToLocalStorage(currentBlocks);
  };

  const importProject = (blocks: BlockData[]) => {
    dispatch(setBlocks(blocks));
    dispatch(pushHistory(blocks));
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
