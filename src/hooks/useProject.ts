import { useEffect } from "react";
import { useAppDispatch, useBlocks } from "../store/hooks";
import { setBlocks } from "../store/slices/blocksSlice";
import { push as pushHistory } from "../store/slices/historySlice";
import { loadFromLocalStorage, saveToLocalStorage, clearLocalStorage } from "../utils/localStorage";
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
    // БАГ #AUTOSAVE: раньше пустой массив игнорировался (`if (blocks.length === 0) return`),
    // из-за чего очистка проекта не сохранялась и после перезагрузки блоки «восстанавливались».
    const timer = setTimeout(() => {
      if (blocks.length === 0) {
        clearLocalStorage();
      } else {
        saveToLocalStorage(blocks);
      }
    }, 1000);

    // Очищаем таймер, если блоки изменились быстрее, чем за 1 секунду
    return () => clearTimeout(timer);
  }, [blocks]);

  const saveProject = () => {
    if (blocks.length === 0) {
      clearLocalStorage();
    } else {
      saveToLocalStorage(blocks);
    }
  };

  const importProject = (newBlocks: BlockData[]) => {
    // БАГ #IMPORT: нормализуем данные — импортированные/сохранённые блоки могут
    // не иметь id или иметь некорректную структуру, что ломает React keys и dnd-kit.
    const normalized: BlockData[] = newBlocks
      .filter((b) => b && typeof b.type === "string" && typeof b.variant === "string")
      .map((b) => ({
        ...b,
        id: b.id || Math.random().toString(36).substring(2, 9),
        props: b.props ?? {},
      }));
    dispatch(setBlocks(normalized));
    dispatch(pushHistory(normalized));
  };

  const clearProject = () => {
    dispatch(setBlocks([]));
    dispatch(pushHistory([]));
    // Немедленно убираем сохранённый проект, не полагаясь на дебаунс автосохранения
    clearLocalStorage();
  };

  return {
    saveProject,
    importProject,
    clearProject,
  };
}