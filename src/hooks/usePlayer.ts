import { toast } from "sonner";
import { create } from "zustand";
import { Track } from "../types";
import { getAudioUrl, getQueue, getTrackData } from "../utils/fetcher";

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

  setTrackFromButton: (id: string, listId: string) => void;

  nextTrack: () => void;
  prevTrack: () => void;
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
        const [audioUrl, queueList, _] = await Promise.all([
          getAudioUrl(id),
          getQueue(id, listId),
          getTrackData(id), // mimic create watch history for personalize recomendation
        ]);
        currentTrackUrlStream = audioUrl;
        trackQueue = queueList;
      } catch (e: any) {
        toast.error("failed to fetch this track");
        return;
      } finally {
        set({ isLoading: false });
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
        const [audioUrl, _] = await Promise.all([
          getAudioUrl(id),
          getTrackData(id), // mimic create watch history for personalize recomendation
        ]);
        currentTrackUrlStream = audioUrl;
      } catch (e: any) {
        toast.error("failed to fetch this track");
        return;
      } finally {
        set({ isLoading: false });
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

  // start play track when user click suffle, radio, play button
  async setTrackFromButton(id: string, listId: string) {
    set({
      currentTrack: {
        id,
        artists: [],
        duration: null,
        explicit: false,
        listId,
        title: "",
        thumbnail: undefined,
        currentTrackIndex: -1,
        currentTrackUrlStream: "",
      },
    });

    let currentTrackUrlStream: string | undefined,
      trackQueue: Track[],
      track: Track;
    try {
      // fetch the track url stream based on given id
      set({ isLoading: true });
      const [audioUrl, queueList, trackDetails] = await Promise.all([
        getAudioUrl(id),
        getQueue(id, listId),
        getTrackData(id), // get track detail for musicPlayerBar info
      ]);
      currentTrackUrlStream = audioUrl;
      trackQueue = queueList;
      track = { ...trackDetails, listId };
    } catch (e: any) {
      toast.error("failed to fetch this track");
      return;
    } finally {
      set({ isLoading: false });
    }

    // get track index from queue list
    const index = trackQueue.findIndex((queue) => queue.id === id);

    set({
      currentTrack: {
        ...track,
        currentTrackIndex: index,
        currentTrackUrlStream,
      },
      trackQueue,
    });
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
