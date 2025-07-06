import { create } from "zustand";

export interface TrackState {
  isRightPanelOpen: boolean;
  isLeftPanelOpen: boolean;

  setRightPanel: () => void;
  setLeftPanel: () => void;
}

export const useLayout = create<TrackState>()((set) => ({
  isRightPanelOpen: false,
  isLeftPanelOpen: false,

  setRightPanel: () =>
    set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),
  setLeftPanel: () =>
    set((state) => ({ isLeftPanelOpen: !state.isLeftPanelOpen })),
}));
