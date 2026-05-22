import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BlockData } from "../../type/blocks";

interface BlocksState {
  items: BlockData[];
  selectedId: number | null; // Индекс выбранного блока в массиве
}

const initialState: BlocksState = {
  items: [],
  selectedId: null,
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<BlockData[]>) => {
      state.items = action.payload;
    },
    addBlock: (state, action: PayloadAction<BlockData>) => {
      state.items.push(action.payload);
    },
    updateBlock: (
      state,
      action: PayloadAction<{ index: number; props: Record<string, string> }>
    ) => {
      const { index, props } = action.payload;
      if (state.items[index]) {
        state.items[index].props = { ...state.items[index].props, ...props };
      }
    },
    deleteBlock: (state, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      state.items.splice(indexToDelete, 1);
      
      if (state.selectedId === indexToDelete) {
        state.selectedId = null;
      } else if (state.selectedId !== null && indexToDelete < state.selectedId) {
        state.selectedId--;
      }
    },
    duplicateBlock: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.items[index]) {
        // Создаем глубокую копию с НОВЫМ уникальным id, чтобы не ломать React keys
        const original = state.items[index];
        const clone: BlockData = {
          ...JSON.parse(JSON.stringify(original)),
          id: Math.random().toString(36).substring(2, 9), // Генерация нового стабильного ID
        };
        state.items.splice(index + 1, 0, clone);
      }
    },
    moveBlock: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [removed] = state.items.splice(from, 1);
      state.items.splice(to, 0, removed);
      if (state.selectedId === from) {
        state.selectedId = to;
      }
    },
    selectBlock: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload;
    },
    clearBlocks: (state) => {
      state.items = [];
      state.selectedId = null;
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