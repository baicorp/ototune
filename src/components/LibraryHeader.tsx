import { useState } from "react";
import { Link } from "react-router";

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
}: LibraryHeaderProps) {
  return (
    <div className="flex gap-4 cursor-default">
      <div className="basis-5/12 min-w-32 max-w-72 shrink-0">
        <img src={thumbnail} className="w-full" />
      </div>
      <div className="py-4">
        <h1 className="font-bold text-2xl mb-3">{title}</h1>
        <p className="text-neutral-500">{subtitle}</p>
        <p className="text-neutral-500">{stat}</p>
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
        <Description description={description} />
      </div>
    </div>
  );
}

function Description({ description }: { description: string }) {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <p
      className={`mt-4 text-neutral-500 ${isExpand ? "" : "line-clamp-3"}`}
      onClick={() => setIsExpand((prev) => !prev)}
    >
      {description}
    </p>
  );
}
