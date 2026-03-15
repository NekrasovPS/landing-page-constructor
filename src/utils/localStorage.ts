import type { BlockData } from "../type/blocks";

const STORAGE_KEY = "landing-constructor-project";

export function saveToLocalStorage(blocks: BlockData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
}

export function loadFromLocalStorage(): BlockData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as BlockData[];
  } catch (error) {
    console.error("Ошибка загрузки из localStorage:", error);
    return [];
  }
}

export function clearLocalStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}
