import { Track } from "../types";
import { Link } from "react-router";
import explicitIco from "../assets/explicit.svg";

type SongItemType = Track & {
  index?: string;
  explicit?: boolean;
};

export default function SongItem({
  id,
  title,
  artists,
  thumbnail,
  index,
  duration,
  explicit,
}: SongItemType) {
  return (
    <div className="w-full flex items-center gap-2 cursor-pointer">
      <div className="w-12 shrink-0 aspect-square">
        {thumbnail && (
          <img
            src={thumbnail}
            className="w-full aspect-square object-contain object-center rounded-sm"
          />
        )}
        {index && (
          <div className="h-full flex justify-center items-center font-semibold">
            {index}
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold leading-tight line-clamp-1">{title}</p>
        <div className="flex items-center gap-2">
          {explicit && <img src={explicitIco} className="w-5" />}
          {artists.map((artist) => (
            <Link
              key={artist.browseId}
              to={`/artist/${artist.browseId}`}
              className="cursor-pointer text-neutral-500 text-nowrap line-clamp-1"
            >
              {artist.name}
            </Link>
          ))}
        </div>
      </div>
      {duration && (
        <div className="ml-auto mr-2">
          <p className="text-neutral-500 font-mono">{duration}</p>
        </div>
      )}
    </div>
  );
}
