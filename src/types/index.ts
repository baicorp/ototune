export interface Track {
  id: string;
  title: string;
  artists: { name: string; browseId: string }[];
  thumbnail?: string;
  duration: string | null;
  listId: string | null;
}

export interface MixContent {
  headerTitle: string;
  contents: Track &
    {
      subtitle: string;
      type: string;
    }[];
}
