import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DeviceType = "desktop" | "tablet" | "mobile";

interface UIState {
  device: DeviceType;
  zoom: number;
  activeTab: "properties" | "layers";
  isTemplatesModalOpen: boolean;
  isPreviewModalOpen: boolean;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  device: "desktop",
  zoom: 1,
  activeTab: "properties",
  isTemplatesModalOpen: false,
  isPreviewModalOpen: false,
  sidebarOpen: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<DeviceType>) => {
      state.device = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = Math.max(0.5, Math.min(2, action.payload));
    },
    setActiveTab: (state, action: PayloadAction<"properties" | "layers">) => {
      state.activeTab = action.payload;
    },
    setTemplatesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isTemplatesModalOpen = action.payload;
    },
    setPreviewModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPreviewModalOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    resetUI: (state) => {
      state.device = "desktop";
      state.zoom = 1;
      state.activeTab = "properties";
      state.isTemplatesModalOpen = false;
      state.isPreviewModalOpen = false;
      state.sidebarOpen = true;
    },
  },
});

export const {
  setDevice,
  setZoom,
  setActiveTab,
  setTemplatesModalOpen,
  setPreviewModalOpen,
  toggleSidebar,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;
