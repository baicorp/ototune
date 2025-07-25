import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import ArtistItem from "./ArtistItem";
import PlaylistItem from "./PlaylistItem";
import SuggestionTextItem from "./SuggestionTextItem";

export default function DynamicComponent({
  type,
  props,
  variant,
}: {
  type: string;
  props: any;
  variant?: "small";
}) {
  if (!type) return null;
  switch (type) {
    case "song":
      return <SongItem variant={variant} {...props} />;
    case "single":
      return <SongItem variant={variant} {...props} />;
    case "album":
      return <AlbumItem variant={variant} {...props} />;
    case "artist":
      return <ArtistItem variant={variant} {...props} />;
    case "playlist":
      return <PlaylistItem variant={variant} {...props} />;
    case "query":
      return <SuggestionTextItem {...props} />;
    default:
      return <PlaylistItem variant={variant} {...props} />;
  }
}
