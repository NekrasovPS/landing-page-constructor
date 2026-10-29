import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BlockData } from "../../type/blocks";
import { generateId } from "../../utils/helpers";

interface BlocksState {
  items: BlockData[];
  // #1: selectedBlockId хранит СТАБИЛЬНЫЙ id блока, а не индекс.
  // Индекс — производная величина: любое удаление/перемещение рассинхронизировало
  // выделение и приводило к удалению/редактированию «не того» блока.
  selectedBlockId: string | null;
}

const initialState: BlocksState = {
  items: [],
  selectedBlockId: null,
};

// Внутренний хелпер: индекс блока по его id (единственное место, где id→index)
const indexOfId = (items: BlockData[], id: string): number =>
  items.findIndex((b) => b.id === id);

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<BlockData[]>) => {
      state.items = action.payload;
      // Выделение сбрасываем только если выбранного блока больше нет в списке
      if (
        state.selectedBlockId !== null &&
        !action.payload.some((b) => b.id === state.selectedBlockId)
      ) {
        state.selectedBlockId = null;
      }
    },
    addBlock: (state, action: PayloadAction<BlockData>) => {
      state.items.push(action.payload);
    },
    updateBlock: (
      state,
      action: PayloadAction<{ id: string; props: Record<string, string> }>
    ) => {
      const { id, props } = action.payload;
      const index = indexOfId(state.items, id);
      if (index !== -1) {
        state.items[index].props = { ...state.items[index].props, ...props };
      }
    },
    deleteBlock: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      const index = indexOfId(state.items, idToDelete);
      if (index === -1) return;
      state.items.splice(index, 1);

      if (state.selectedBlockId === idToDelete) {
        state.selectedBlockId = null;
      }
    },
    duplicateBlock: (state, action: PayloadAction<string>) => {
      const index = indexOfId(state.items, action.payload);
      if (index !== -1) {
        // Создаем глубокую копию с НОВЫМ уникальным id, чтобы не ломать React keys
        const original = state.items[index];
        const clone: BlockData = {
          ...JSON.parse(JSON.stringify(original)),
          id: generateId(),
        };
        state.items.splice(index + 1, 0, clone);
      }
    },
    moveBlock: (state, action: PayloadAction<{ fromId: string; toId: string }>) => {
      const { fromId, toId } = action.payload;
      const from = indexOfId(state.items, fromId);
      const to = indexOfId(state.items, toId);
      if (from === -1 || to === -1 || from === to) return;
      const [removed] = state.items.splice(from, 1);
      state.items.splice(to, 0, removed);
    },
    selectBlock: (state, action: PayloadAction<string | null>) => {
      state.selectedBlockId = action.payload;
    },
    clearBlocks: (state) => {
      state.items = [];
      state.selectedBlockId = null;
    },
  },
});

export const {
  setBlocks,
  addBlock,
  updateBlock,
  deleteBlock,
  duplicateBlock,
  moveBlock,
  selectBlock,
  clearBlocks,
} = blocksSlice.actions;

export default blocksSlice.reducer;
