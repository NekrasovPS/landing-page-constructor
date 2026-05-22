import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BlockData } from "../../type/blocks";

const MAX_HISTORY = 50;

interface HistoryState {
  past: BlockData[][];
  present: BlockData[];
  future: BlockData[][];
}

const initialState: HistoryState = {
  past: [],
  present: [],
  future: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setPresent: (state, action: PayloadAction<BlockData[]>) => {
      state.present = action.payload;
    },
    push: (state, action: PayloadAction<BlockData[]>) => {
      state.past.push(state.present);
      state.present = action.payload;
      state.future = [];

      // Ограничиваем размер истории
      if (state.past.length > MAX_HISTORY) {
        state.past.shift();
      }
    },
    undo: (state) => {
      if (state.past.length > 0) {
        state.future.unshift(state.present);
        state.present = state.past.pop()!;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        state.past.push(state.present);
        state.present = state.future.shift()!;
      }
    },
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    },
  },
});

export const { setPresent, push, undo, redo, clearHistory } = historySlice.actions;

export default historySlice.reducer;
