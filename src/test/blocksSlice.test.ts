import { describe, it, expect } from "vitest";
import reducer, { deleteBlock, duplicateBlock, moveBlock, selectBlock, updateBlock, setBlocks } from "../store/slices/blocksSlice";
import type { BlockData } from "../type/blocks";

const mk = (id: string): BlockData => ({ id, type: "hero", variant: "hero-1", props: { title: id } }) as unknown as BlockData;

describe("blocksSlice — выделение по стабильному id (#1)", () => {
  it("deleteBlock удаляет именно блок с указанным id, а не по индексу", () => {
    let state = reducer(undefined, setBlocks([mk("a"), mk("b"), mk("c")]));
    state = reducer(state, selectBlock("b"));
    expect(state.selectedBlockId).toBe("b");
    state = reducer(state, deleteBlock("b"));
    expect(state.items.map((b) => b.id)).toEqual(["a", "c"]);
    expect(state.selectedBlockId).toBeNull();
  });

  it("удаление блока перед выбранным НЕ сбивает выделение (индекс плывёт, id — нет)", () => {
    let state = reducer(undefined, setBlocks([mk("a"), mk("b"), mk("c")]));
    state = reducer(state, selectBlock("c"));
    state = reducer(state, deleteBlock("a"));
    expect(state.selectedBlockId).toBe("c");
    state = reducer(state, deleteBlock("c")); // удалится именно 'c', несмотря на новый индекс 1
    expect(state.items.map((b) => b.id)).toEqual(["b"]);
  });

  it("duplicateBlock создаёт копию с новым id и глубокими props (без shared reference)", () => {
    let state = reducer(undefined, setBlocks([mk("a")]));
    state = reducer(state, duplicateBlock("a"));
    expect(state.items.length).toBe(2);
    const orig = state.items[0];
    const copy = state.items[1];
    expect(copy.id).not.toBe(orig.id);
    expect(copy.props).toEqual(orig.props);
    // глубокая копия: props копии — отдельный объект (в immer-черновике сравниваем через finishDraft-результат)
    state = reducer(state, updateBlock({ id: copy.id, props: { title: "MUTATED" } }));
    expect(state.items[0].props.title).toBe("a"); // оригинал не затронут
  });

  it("moveBlock переставляет по id из→к", () => {
    let state = reducer(undefined, setBlocks([mk("a"), mk("b"), mk("c")]));
    state = reducer(state, moveBlock({ fromId: "a", toId: "c" }));
    expect(state.items.map((b) => b.id)).toEqual(["b", "c", "a"]);
  });

  it("updateBlock по несуществующему id — no-op без падения", () => {
    let state = reducer(undefined, setBlocks([mk("a")]));
    state = reducer(state, updateBlock({ id: "ghost", props: { title: "x" } }));
    expect(state.items[0].props.title).toBe("a");
  });
});
