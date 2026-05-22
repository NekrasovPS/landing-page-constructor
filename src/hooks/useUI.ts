import { useAppDispatch } from "../store/hooks";
import {
  setDevice as setDeviceAction,
  setZoom as setZoomAction,
  setActiveTab as setActiveTabAction,
  setPreviewModalOpen as setPreviewModalOpenAction,
  setTemplatesModalOpen as setTemplatesModalOpenAction,
} from "../store/slices/uiSlice";
import { undo as undoHistory, redo as redoHistory } from "../store/slices/historySlice";
import type { DeviceType } from "../components/organisms/Toolbar/Toolbar";

/**
 * Хук для управления UI
 * Инкапсулирует всю логику управления интерфейсом
 */
export function useUI() {
  const dispatch = useAppDispatch();

  const setDevice = (device: DeviceType) => {
    dispatch(setDeviceAction(device));
  };

  const setZoom = (zoom: number) => {
    dispatch(setZoomAction(Math.max(0.5, Math.min(2, zoom))));
  };

  const setActiveTab = (tab: "properties" | "layers") => {
    dispatch(setActiveTabAction(tab));
  };

  const openPreview = () => {
    dispatch(setPreviewModalOpenAction(true));
  };

  const closePreview = () => {
    dispatch(setPreviewModalOpenAction(false));
  };

  const openTemplates = () => {
    dispatch(setTemplatesModalOpenAction(true));
  };

  const closeTemplates = () => {
    dispatch(setTemplatesModalOpenAction(false));
  };

  const undo = () => {
    dispatch(undoHistory());
  };

  const redo = () => {
    dispatch(redoHistory());
  };

  return {
    setDevice,
    setZoom,
    setActiveTab,
    openPreview,
    closePreview,
    openTemplates,
    closeTemplates,
    undo,
    redo,
  };
}
