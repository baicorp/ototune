import { Track } from "../types";
import { Link } from "react-router";
import usePlayer from "../hooks/usePlayer";
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
  listId,
}: SongItemType) {
  const { setCurrentTrack, currentTrack } = usePlayer();

  function handleClick() {
    setCurrentTrack({
      id,
      title,
      thumbnail,
      artists,
      duration,
      listId,
    });
  }

  return (
    <div
      className="w-full flex items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-12 shrink-0 aspect-square relative rounded-sm overflow-hidden bg-black">
        {thumbnail && (
          <img
            src={thumbnail}
            loading="lazy"
            className="w-full aspect-square object-contain object-center"
          />
        )}
        {index && (
          <div className="h-full flex justify-center items-center font-semibold">
            {index}
          </div>
        )}
        {currentTrack?.id === id && (
          <div className="absolute bg-white/60 inset-0">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="1.5" height="8" fill="#000" rx="0.75">
                <animate
                  attributeName="height"
                  values="8;16;8"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="8;4;8"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect
                x="5"
                y="6"
                width="1.5"
                height="12"
                fill="#000000"
                rx="0.75"
              >
                <animate
                  attributeName="height"
                  values="12;20;12"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="6;2;6"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect
                x="8"
                y="4"
                width="1.5"
                height="16"
                fill="#000000"
                rx="0.75"
              >
                <animate
                  attributeName="height"
                  values="16;8;16"
                  dur="0.7s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="4;8;4"
                  dur="0.7s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect
                x="11"
                y="7"
                width="1.5"
                height="10"
                fill="#000000"
                rx="0.75"
              >
                <animate
                  attributeName="height"
                  values="10;18;10"
                  dur="1.1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="7;3;7"
                  dur="1.1s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect
                x="14"
                y="5"
                width="1.5"
                height="14"
                fill="#000000"
                rx="0.75"
              >
                <animate
                  attributeName="height"
                  values="14;6;14"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="5;9;5"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect
                x="17"
                y="9"
                width="1.5"
                height="6"
                fill="#000000"
                rx="0.75"
              >
                <animate
                  attributeName="height"
                  values="6;14;6"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="9;5;9"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect
                x="20"
                y="8"
                width="1.5"
                height="8"
                fill="#000000"
                rx="0.75"
              >
                <animate
                  attributeName="height"
                  values="8;12;8"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="8;6;8"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
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
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer text-neutral-500 text-nowrap text-sm line-clamp-1"
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
