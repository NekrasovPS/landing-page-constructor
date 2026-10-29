import { describe, it, expect } from "vitest";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import blocksReducer, { addBlock, deleteBlock, updateBlock } from "../store/slices/blocksSlice";
import historyReducer, { undo, type HistoryState } from "../store/slices/historySlice";
import { listenerMiddleware } from "../store/listenerMiddleware";
import type { BlocksState } from "../store/slices/blocksSlice";
import type { BlockData } from "../type/blocks";

const rootReducer = combineReducers({ blocks: blocksReducer, history: historyReducer });

// Тестовый стор: тот же listener, что и в боевом store/index.ts.
// Тип state выводим сами — RTK выводит его из rootReducer корректно.
const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gdm) => gdm({ serializableCheck: false }).concat(listenerMiddleware.middleware),
  });

type TestState = { blocks: BlocksState; history: HistoryState };
const typedGetState = (store: ReturnType<typeof makeStore>) => store.getState() as TestState;

const newBlock = (): BlockData =>
  ({ id: "x1", type: "hero", variant: "hero-1", props: { title: "T" } }) as unknown as BlockData;

describe("listenerMiddleware — авто-снимки истории", () => {
  it("каждая мутация блоков создаёт шаг истории без ручного push", () => {
    const store = makeStore();
    store.dispatch(addBlock(newBlock()));
    let s = typedGetState(store).history;
    expect(s.past.length).toBe(1);
    expect(s.present.length).toBe(1);

    store.dispatch(updateBlock({ id: "x1", props: { title: "Changed" } }));
    s = typedGetState(store).history;
    expect(s.past.length).toBe(2);
    expect(typedGetState(store).blocks.items[0].props.title).toBe("Changed");
  });

  it("undo возвращает в present удалённый блок (sync-эффект UI подхватит его)", () => {
    const store = makeStore();
    store.dispatch(addBlock(newBlock()));
    store.dispatch(deleteBlock("x1"));
    expect(typedGetState(store).blocks.items.length).toBe(0);

    store.dispatch(undo());
    expect(typedGetState(store).history.present.length).toBe(1);
  });

  it("служебные действия history/* не создают лишних шагов", () => {
    const store = makeStore();
    store.dispatch(addBlock(newBlock()));
    const pastLen = typedGetState(store).history.past.length;
    store.dispatch(undo());
    expect(typedGetState(store).history.past.length).toBe(pastLen - 1);
  });

  it("снимки глубокие: мутация live-блока не меняет снимок в истории", () => {
    const store = makeStore();
    store.dispatch(addBlock(newBlock())); // past=[[]], present=[T]
    store.dispatch(updateBlock({ id: "x1", props: { title: "V2" } })); // past=[[T],[V2]], present=[V2]
    const snapshots = typedGetState(store).history.past;
    const firstWithBlock = snapshots.find((sn) => sn.length === 1);
    expect(firstWithBlock?.[0]?.props?.title).toBe("T");
    expect(typedGetState(store).blocks.items[0].props.title).toBe("V2");
  });
});
