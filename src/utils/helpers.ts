/**
 * Утилита для парсинга строки в массив
 * @param str Строка с разделителями
 * @param separator Разделитель (по умолчанию запятая)
 * @returns Массив строк
 */
export function parseList(str: string, separator = ","): string[] {
  return str.split(separator).map((s) => s.trim()).filter(Boolean);
}

/**
 * Утилита для создания градиента
 * @param colors Массив цветов
 * @param direction Направление (по умолчанию 135deg)
 * @returns CSS градиент
 */
export function createGradient(colors: string[], direction = 135): string {
  return `linear-gradient(${direction}deg, ${colors.join(", ")})`;
}

/**
 * Утилита для генерации уникального ID
 * @returns Уникальный ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Утилита для клонирования объекта с глубоким копированием
 * @param obj Объект для клонирования
 * @returns Клон объекта
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Утилита для перемещения элемента в массиве
 * @param array Массив
 * @param from Индекс источника
 * @param to Индекс назначения
 * @returns Новый массив с перемещенным элементом
 */
export function moveArrayItem<T>(array: T[], from: number, to: number): T[] {
  const newArray = [...array];
  const [removed] = newArray.splice(from, 1);
  newArray.splice(to, 0, removed);
  return newArray;
}

/**
 * Утилита для дублирования элемента в массиве
 * @param array Массив
 * @param index Индекс элемента для дублирования
 * @returns Новый массив с дублированным элементом
 */
export function duplicateArrayItem<T>(array: T[], index: number): T[] {
  const newArray = [...array];
  newArray.splice(index + 1, 0, newArray[index]);
  return newArray;
}

/**
 * Утилита для debounce
 * @param func Функция для выполнения
 * @param wait Время ожидания в мс
 * @returns Debounced функция
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Утилита для throttle
 * @param func Функция для выполнения
 * @param limit Лимит в мс
 * @returns Throttled функция
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
