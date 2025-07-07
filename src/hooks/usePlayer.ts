import { toast } from "sonner";
import { create } from "zustand";
import { Track } from "../types";
import { invoke } from "@tauri-apps/api/core";
import extractQueueData from "../utils/extractor/extractQueuedata";

export interface TrackState {
  currentTrack:
    | (Track & {
        currentTrackIndex: number;
        currentTrackUrlStream: string | undefined;
      })
    | undefined;
  trackQueue: Track[];
  isLoading: boolean;

  setCurrentTrack: ({
    id,
    title,
    thumbnail,
    artists,
    duration,
    listId,
  }: Track) => void;

  nextTrack: () => void;
  prevTrack: () => void;
}

async function getAudioUrl(id: Track["id"]) {
  // fetch the track url stream based on given id (not yet implemented)
  try {
    const audioUrl = await invoke<string>("get_audio_url", {
      videoId: id,
    });
    return audioUrl;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function getQueue(id: Track["id"], listId: Track["listId"]) {
  // fetch queue list based on given id && listId(optional)
  try {
    let queueList = await invoke<ReturnType<typeof extractQueueData>>(
      "get_queue_list",
      {
        videoId: id,
        playlistId: listId,
      },
    );
    return extractQueueData(queueList);
  } catch (e: any) {
    throw new Error(e);
  }
}

const usePlayer = create<TrackState>()((set, get) => ({
  currentTrack: undefined,
  trackQueue: [],
  isLoading: false,

  async setCurrentTrack({ ...props }) {
    const { currentTrack } = get();

    set({
      currentTrack: {
        ...props,
        currentTrackIndex: -1,
        currentTrackUrlStream: "",
      },
    });

    async function fetchFreshTrack(id: Track["id"], listId: Track["listId"]) {
      let currentTrackUrlStream: Track["id"], trackQueue: Track[];

      try {
        set({ isLoading: true });
        const [audioUrl, queueList] = await Promise.all([
          getAudioUrl(id),
          getQueue(id, listId),
        ]);
        currentTrackUrlStream = audioUrl;
        trackQueue = queueList;
        set({ isLoading: false });
      } catch (e: any) {
        toast.error("failed to fetch this track");
        set({ isLoading: false });
        return;
      }

      // get track index from queue list
      const index = trackQueue.findIndex((queue) => queue.id === props.id);
      set({
        currentTrack: {
          ...props,
          currentTrackIndex: index,
          currentTrackUrlStream,
        },
        trackQueue,
      });
    }

    async function fetchUpdateTrack(id: Track["id"]) {
      const { trackQueue } = get();
      let currentTrackUrlStream: string | undefined;
      try {
        // fetch the track url stream based on given id
        set({ isLoading: true });
        const audioUrl = await invoke<string>("get_audio_url", {
          videoId: props.id,
        });
        set({ isLoading: false });
        currentTrackUrlStream = audioUrl;
      } catch (e: any) {
        toast.error("failed to fetch this track");
        set({ isLoading: false });
        return;
      }
      // get track index from queue list
      const index = trackQueue.findIndex((queue) => queue.id === id);
      set({
        currentTrack: {
          ...props,
          currentTrackIndex: index,
          currentTrackUrlStream,
        },
      });
    }

    if (!currentTrack) {
      await fetchFreshTrack(props.id, props.listId);
    } else {
      const { listId } = currentTrack;
      if (props.listId === listId) {
        await fetchUpdateTrack(props.id);
      } else {
        await fetchFreshTrack(props.id, props.listId);
      }
    }
  },

  async nextTrack() {
    const { trackQueue, currentTrack } = get();
    if (
      !currentTrack ||
      trackQueue.length === 0 ||
      currentTrack?.currentTrackIndex < 0
    ) {
      return;
    }

    const newIndex = currentTrack.currentTrackIndex + 1;
    if (newIndex >= trackQueue.length) {
      return;
    }

    set({
      currentTrack: {
        ...trackQueue[newIndex],
        currentTrackIndex: newIndex,
        currentTrackUrlStream: "",
      },
    });
    set({ isLoading: true });
    const id = trackQueue[newIndex].id;
    const audioUrl = await getAudioUrl(id);
    set({ isLoading: false });
    set({
      currentTrack: {
        ...trackQueue[newIndex],
        currentTrackIndex: newIndex,
        currentTrackUrlStream: audioUrl,
      },
    });
  },

  async prevTrack() {
    const { trackQueue, currentTrack } = get();
    if (
      !currentTrack ||
      trackQueue.length === 0 ||
      currentTrack?.currentTrackIndex < 0
    ) {
      return;
    }

    const newIndex = currentTrack.currentTrackIndex - 1;
    if (newIndex < 0) {
      return;
    }

    set({
      currentTrack: {
        ...trackQueue[newIndex],
        currentTrackUrlStream: "",
        currentTrackIndex: newIndex,
      },
    });
    set({ isLoading: true });
    const id = trackQueue[newIndex].id;
    const audioUrl = await getAudioUrl(id);
    set({ isLoading: false });
    set({
      currentTrack: {
        ...trackQueue[newIndex],
        currentTrackUrlStream: audioUrl,
        currentTrackIndex: newIndex,
      },
    });
  },
}));

export default usePlayer;
