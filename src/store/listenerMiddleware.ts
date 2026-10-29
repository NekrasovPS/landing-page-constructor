import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { BlockData } from "../type/blocks";
import { push as pushHistory } from "./slices/historySlice";

/**
 * #2 ЕДИНЫЙ СНИМОК ИСТОРИИ.
 * Раньше снимок для history.push собирали вручную в хуках (useBlockActions, useProject,
 * EditorPage) — легко было забыть dispatch(push(...)) и история рассинхронизировалась.
 * Теперь middleware перехватывает ВСЕ мутации блоков (все действия имеют тип "blocks/...")
 * и автоматически толкает актуальный иммутабельный state.blocks.items в историю сразу
 * после применения редьюсера. Служебные undo/redo/setPresent имеют другие типы и не
 * попадают под matcher — они не создают лишних шагов истории.
 */
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action) => (action as { type?: string }).type?.startsWith("blocks/") === true,
  effect: (_action, listenerApi) => {
    // Состояние берётся ПОСЛЕ применения перехваченного редьюсера блока
    const state = listenerApi.getState() as { blocks: { items: BlockData[] } };
    const items = state.blocks.items;
    // Глубокая копия: past/present не должны ссылаться на те же объекты, что и live-стейт
    const snapshot = JSON.parse(JSON.stringify(items)) as BlockData[];
    listenerApi.dispatch(pushHistory(snapshot));
  },
});
