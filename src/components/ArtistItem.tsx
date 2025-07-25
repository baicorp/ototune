import { Link } from "react-router";

interface ArtistItemProps {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  variant?: "small";
}

export default function ArtistItem({
  id,
  title,
  subtitle,
  thumbnail,
  variant,
}: ArtistItemProps) {
  return (
    <Link
      to={`/artist/${id}`}
      className={`flex ${variant === "small" ? "w-full flex-row gap-2.5 p-1 rounded-md hover:bg-themed-card" : "w-34 flex-col gap-2"} items-center`}
    >
      <div className={`${variant === "small" ? "w-10" : "w-34"}`}>
        <img
          src={thumbnail}
          loading="lazy"
          className="w-full aspect-square object-cover rounded-full"
        />
      </div>
      <div>
        <p className="text-center font-semibold line-clamp-2">{title}</p>
        <p
          className={`${variant === "small" ? "text-start" : "text-center"} leading-tight text-themed-text-muted`}
        >
          {variant === "small" ? "Artist" : subtitle}
        </p>
      </div>
    </Link>
  );
}
