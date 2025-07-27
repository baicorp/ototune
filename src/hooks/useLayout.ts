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
  toggleLeftPanel: () => void;
}

export const useLayout = create<TrackState>()((set) => ({
  rightPanel: {
    isOpen: false,
    content: undefined,
  },
  isLeftPanelOpen: JSON.parse(
    localStorage.getItem("isLeftPanelOpen") ?? "true",
  ),

  setRightPanel: (isOpen, content) => {
    set({
      rightPanel: {
        isOpen,
        content,
      },
    });
  },

  toggleLeftPanel: () =>
    set((state) => {
      const newState = !state.isLeftPanelOpen;
      localStorage.setItem("isLeftPanelOpen", JSON.stringify(newState));
      return { isLeftPanelOpen: newState };
    }),
}));
