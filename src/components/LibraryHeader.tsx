import { Link } from "react-router";
import CollapsibleText from "./CollapsibleText";

interface LibraryHeaderProps {
  thumbnail: string;
  title: string;
  subtitle: string;
  stat?: string;
  description: string;
  artists?: { name: string; browseId: string }[];
}

// provide header for album dan playlist page
export default function LibraryHeader({
  thumbnail,
  title,
  subtitle,
  stat,
  description,
  artists,
  children,
}: LibraryHeaderProps & { children: React.ReactNode }) {
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
          <h1 className="font-bold text-2xl">{title}</h1>
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
          <div className="text-center">
            <p className="text-themed-text-muted leading-snug">{subtitle}</p>
            <p className="text-themed-text-muted leading-snug">{stat}</p>
          </div>
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
