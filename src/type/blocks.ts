export type DeviceType = "desktop" | "tablet" | "mobile"; // Единственный источник правды для девайсов

export type BlockProps = {
  title?: string;
  description?: string;
  backgroundImage?: string;
  buttonText?: string;
  [key: string]: string | undefined;
};

export interface BlockData {
  id: string; // Уникальный стабильный ID (UUID / Сгенерированный хеш)
  type: string; // "hero" | "feature" | "pricing" | ...
  variant: string; // "hero-1" | "hero-2" | ...
  props?: BlockProps;
}
