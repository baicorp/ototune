export interface Track {
  id: string;
  title: string;
  artists: { name: string; browseId: string }[];
  thumbnail?: string;
  explicit: boolean;
  duration: string | null;
  listId: string | null;
}

export interface MixContent {
  headerTitle: string;
  moreContent: { id: string; params: string };
  contents: (Track & {
    subtitle: string;
    type: string;
  })[];
}
