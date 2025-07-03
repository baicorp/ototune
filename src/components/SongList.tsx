import { Track } from "../types";
import SongItem from "./SongItem";

export default function SongList({
  tracks,
  variant,
}: {
  variant: "playlist" | "album" | "queue";
  tracks: Track[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {tracks.map((track, index) => (
        <SongItem
          key={index}
          title={track.title}
          thumbnail={
            variant === "playlist" || variant === "queue"
              ? track.thumbnail
              : undefined
          }
          index={variant === "album" ? (index + 1).toString() : undefined}
          artists={track.artists}
          duration={variant === "queue" ? null : track.duration}
          id={track.id}
        />
      ))}
    </div>
  );
}
