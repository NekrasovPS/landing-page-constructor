import { describe, it, expect } from "vitest";
import reducer, { push, undo, redo, setPresent, clearHistory } from "../store/slices/historySlice";
import type { BlockData } from "../type/blocks";

const block = (id: string): BlockData => ({ id, type: "hero", variant: "hero-1", props: {} } as BlockData);

describe("historySlice", () => {
  it("undo возвращает предыдущий снимок, redo — следующий", () => {
    let state = reducer(undefined, setPresent([block("a")]));
    state = reducer(state, push([block("a"), block("b")]));
    expect(state.present.map((b) => b.id)).toEqual(["a", "b"]);

    state = reducer(state, undo());
    expect(state.present.map((b) => b.id)).toEqual(["a"]);
    expect(state.future.length).toBe(1);

    state = reducer(state, redo());
    expect(state.present.map((b) => b.id)).toEqual(["a", "b"]);
    expect(state.future.length).toBe(0);
  });

  it("undo/redo на пустой истории — no-op (не падает)", () => {
    const state = reducer(undefined, setPresent([block("a")]));
    expect(reducer(state, undo())).toEqual(state);
    expect(reducer(state, redo())).toEqual(state);
  });

  it("push идентичного снимка — фантомный шаг не создаётся (guard сравнивает id+props)", () => {
    const present = [block("a")];
    // setPresent фиксирует present, затем push с ЭКВИВАЛЕНТНЫМ по содержимому массивом
    let state = reducer(undefined, setPresent(present));
    state = reducer(state, push([{ ...present[0] }])); // тот же id и props, другой объект
    expect(state.past.length).toBe(0);

    // а реальный состав блоков — толкает шаг
    state = reducer(state, push([block("a"), block("b")]));
    expect(state.past.length).toBe(1);
  });

  it("новый push очищает future (ветвление истории невозможно)", () => {
    let state = reducer(undefined, setPresent([]));
    state = reducer(state, push([block("a")]));
    state = reducer(state, push([block("a"), block("b")]));
    state = reducer(state, undo());
    expect(state.future.length).toBe(1);
    state = reducer(state, push([block("c")]));
    expect(state.future.length).toBe(0);
  });

  it("история ограничена MAX_HISTORY=50 шагов", () => {
    let state = reducer(undefined, setPresent([]));
    for (let i = 0; i < 60; i++) state = reducer(state, push([block(`b${i}`)]));
    expect(state.past.length).toBeLessThanOrEqual(50);
  });

  it("clearHistory обнуляет past/future, но оставляет present", () => {
    let state = reducer(undefined, setPresent([block("a")]));
    state = reducer(state, push([block("b")]));
    state = reducer(state, clearHistory());
    expect(state.past).toEqual([]);
    expect(state.future).toEqual([]);
    expect(state.present.map((b) => b.id)).toEqual(["b"]);
  });
});
