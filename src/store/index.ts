import { configureStore } from "@reduxjs/toolkit";
import blocksReducer from "./slices/blocksSlice";
import uiReducer from "./slices/uiSlice";
import historyReducer from "./slices/historySlice";

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    ui: uiReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем проверки для не-сериализуемых значений (например, Date)
        ignoredActions: ["history/undo", "history/redo"],
        ignoredPaths: ["history.past", "history.future"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
