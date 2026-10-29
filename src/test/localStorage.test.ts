import { describe, it, expect, beforeEach } from "vitest";
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } from "../utils/localStorage";

describe("localStorage validation", () => {
  beforeEach(() => localStorage.clear());

  it("пустое хранилище -> []", () => {
    expect(loadFromLocalStorage()).toEqual([]);
  });

  it("битый JSON -> [] без исключения", () => {
    localStorage.setItem("landing-constructor-project", "{not json");
    expect(loadFromLocalStorage()).toEqual([]);
  });

  it("не-массив -> []", () => {
    localStorage.setItem("landing-constructor-project", JSON.stringify({ evil: true }));
    expect(loadFromLocalStorage()).toEqual([]);
  });

  it("мусорные элементы фильтруются, валидные получают id и props", () => {
    localStorage.setItem(
      "landing-constructor-project",
      JSON.stringify([null, 42, "str", { type: "hero" /* нет variant */ }, { type: "hero", variant: "hero-1" }]),
    );
    const loaded = loadFromLocalStorage();
    expect(loaded.length).toBe(1);
    expect(typeof loaded[0].id).toBe("string");
    expect(loaded[0].id.length).toBeGreaterThan(0);
    expect(loaded[0].props).toEqual({});
  });

  it("сохранение и загрузка round-trip", () => {
    const blocks = [{ id: "a", type: "hero", variant: "hero-1", props: { title: "X" } }] as never;
    saveToLocalStorage(blocks);
    expect(loadFromLocalStorage()).toEqual(blocks);
    clearLocalStorage();
    expect(loadFromLocalStorage()).toEqual([]);
  });
});
