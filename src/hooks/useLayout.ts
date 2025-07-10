import { create } from "zustand";

export interface TrackState {
  rightPanel: {
    isOpen: boolean;
    content: "queue" | "lyrics" | undefined;
  };
  isLeftPanelOpen: boolean;

  setRightPanel: (
    isOpen: boolean,
    content: "queue" | "lyrics" | undefined,
  ) => void;
  setLeftPanel: () => void;
}

export const useLayout = create<TrackState>()((set) => ({
  rightPanel: {
    isOpen: false,
    content: undefined,
  },
  isLeftPanelOpen: false,

  setRightPanel: (isOpen: boolean, content: "queue" | "lyrics" | undefined) => {
    set({
      rightPanel: {
        isOpen,
        content,
      },
    });
  },
  setLeftPanel: () =>
    set((state) => ({ isLeftPanelOpen: !state.isLeftPanelOpen })),
}));
