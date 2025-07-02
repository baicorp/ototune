import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import ArtistItem from "./ArtistItem";
import PlaylistItem from "./PlaylistItem";

export default function DynamicComponent({
  type,
  props,
}: {
  type: string;
  props: any;
}) {
  if (!type) return null;
  switch (type) {
    case "song":
      return <SongItem {...props} />;
    case "single":
      return <SongItem {...props} />;
    case "album":
      return <AlbumItem {...props} />;
    case "artist":
      return <ArtistItem {...props} />;
    case "playlist":
      return <PlaylistItem {...props} />;
    default:
      return <PlaylistItem {...props} />;
  }
}
