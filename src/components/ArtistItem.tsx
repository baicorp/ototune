import { Link } from "react-router";

interface ArtistItemProps {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
}

export default function ArtistItem({
  id,
  title,
  subtitle,
  thumbnail,
}: ArtistItemProps) {
  return (
    <Link to={`/artist/${id}`}>
      <div>
        <div className="w-34 flex flex-col items-center gap-2">
          <img
            src={thumbnail}
            loading="lazy"
            className="w-34 aspect-square rounded-full"
          />
          <div>
            <p className="text-center font-semibold line-clamp-2">{title}</p>
            <p className="text-center text-neutral-500">{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
