import SongItem from "./SongItem";

export default function SongList({
  tracks,
  variant,
}: {
  variant: "playlist" | "album";
  tracks: {
    videoId: string;
    title: string;
    artists: ({
      name: string;
      browseId: string;
    } | null)[];
    thumbnail: string[];
    duration: string;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {tracks.map((track, index) => (
        <SongItem
          key={index}
          title={track.title}
          thumbnail={variant === "playlist" ? track.thumbnail[0] : undefined}
          index={variant === "album" ? (index + 1).toString() : undefined}
          artist={track.artists[0]?.name || "null babe"}
          duration={track.duration}
          id={track.videoId}
        />
      ))}
    </div>
  );
}
