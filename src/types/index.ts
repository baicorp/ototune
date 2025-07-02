export interface Track {
  id: string;
  title: string;
  artists: { name: string; browseId: string }[];
  thumbnail?: string;
  duration: string;
}

export interface MixContent {
  headerTitle: string;
  contents: {
    id: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    artists: { name: string; browseId: string }[];
    duration: string | null;
    type: string;
  }[];
}
