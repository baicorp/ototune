import { Track } from "../types";
import { Link } from "react-router";
import usePlayer from "../hooks/usePlayer";
import CollapsibleText from "./CollapsibleText";

export interface LibraryProps {
  title: string;
  subtitle: string;
  thumbnail: string;
  stat?: string;
  description: string;
  explicit: boolean;
  play: string;
  artists?: { name: string; browseId: string }[];
  tracks: Track[];
}

// provide header for album dan playlist page
export default function LibraryHeader({
  thumbnail,
  title,
  subtitle,
  stat,
  description,
  explicit,
  artists,
  tracks,
  play,
  children,
}: LibraryProps & { children: React.ReactNode }) {
  return (
    <>
      <header className="flex flex-col items-center gap-3 cursor-default mt-4 mb-6">
        <div className="w-52 h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64">
          <img
            src={thumbnail}
            className="rounded-md w-full h-full shadow shadow-themed-text-muted"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-2xl text-center">{title}</h1>
          <div className="flex justify-center gap-2">
            {artists &&
              artists.map((artist) => (
                <Link
                  key={artist.browseId}
                  to={`/artist/${artist.browseId}`}
                  className="cursor-pointer"
                >
                  {artist.name}
                </Link>
              ))}
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5 items-center">
              {explicit && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="w-5 shrink-0 aspect-square fill-themed-text-muted"
                >
                  <path d="M360-280h240v-80H440v-80h160v-80H440v-80h160v-80H360v400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
                </svg>
              )}
              <p className="text-themed-text-muted leading-snug">{subtitle}</p>
            </div>
            <p className="text-themed-text-muted leading-snug">{stat}</p>
          </div>
          <Play id={tracks[0].id} play={play} />
        </div>
      </header>
      <section>{children}</section>
      {description && (
        <footer className="mt-6 flex flex-col gap-2">
          <h2 className="font-bold text-xl">About</h2>
          <CollapsibleText>{description}</CollapsibleText>
        </footer>
      )}
    </>
  );
}

function Play({ id, play }: { id: string; play: string }) {
  const { setTrackFromButton } = usePlayer();
  return (
    <button
      title="play"
      onClick={() => {
        setTrackFromButton(id, play);
      }}
      className="p-4 rounded-full bg-white hover:bg-white/95 text-themed-bg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        className="w-8 aspect-square fill-themed-bg"
      >
        <path d="M320-200v-560l440 280-440 280Z" />
      </svg>
    </button>
  );
}
