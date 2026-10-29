import type { BlockData } from "../type/blocks";
import { generateId } from "./helpers";

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
    const parsed = JSON.parse(data);

    // БАГ #VALIDATION: данные из localStorage могут быть повреждены или подменены —
    // валидируем структуру, иначе некорректные блоки уходят в стор и роняют рендер.
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (b): b is BlockData =>
          !!b &&
          typeof b === "object" &&
          typeof b.type === "string" &&
          typeof b.variant === "string",
      )
      .map((b) => ({
        ...b,
        id: typeof b.id === "string" && b.id ? b.id : generateId(),
        props: (b.props && typeof b.props === "object" ? b.props : {}) as BlockData["props"],
      }));
  } catch (error) {
    console.error("Ошибка загрузки из localStorage:", error);
    return [];
  }
}

export function clearLocalStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}
