import { useEffect } from "react";

interface UseHotkeysOptions {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
  onDuplicate?: () => void;
}

export function useHotkeys({
  onSave,
  onUndo,
  onRedo,
  onDelete,
  onPreview,
  onDuplicate,
}: UseHotkeysOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Игнорируем, если фокус в input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Ctrl+S / Cmd+S - Сохранить
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        onSave?.();
      }

      // Ctrl+Z / Cmd+Z - Отменить
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        onUndo?.();
      }

      // Ctrl+Y / Cmd+Shift+Z / Ctrl+Shift+Z - Повторить
      if (
        (e.ctrlKey || e.metaKey) &&
        ((e.key === "y") || (e.shiftKey && e.key === "z"))
      ) {
        e.preventDefault();
        onRedo?.();
      }

      // Delete / Backspace - Удалить (если есть выделенный блок)
      if (e.key === "Delete" || e.key === "Backspace") {
        onDelete?.();
      }

      // Ctrl+D / Cmd+D - Дублировать
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        onDuplicate?.();
      }

      // Ctrl+P / Cmd+P - Предпросмотр
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        onPreview?.();
      }

      // Escape - Снять выделение
      if (e.key === "Escape") {
        // Можно добавить callback для снятия выделения
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSave, onUndo, onRedo, onDelete, onPreview, onDuplicate]);
}
