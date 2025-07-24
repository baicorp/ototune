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
      className={`${variant === "small" ? "w-full" : "w-34"}`}
    >
      <div
        className={`flex ${variant === "small" ? "w-10 flex-row gap-2.5" : "w-34 flex-col gap-2"} aspect-square items-center`}
      >
        <img
          src={thumbnail}
          loading="lazy"
          className="w-full aspect-square object-cover rounded-full"
        />
        <div>
          <p className="text-center font-semibold line-clamp-2">{title}</p>
          <p className="text-center leading-tight text-themed-text-muted">
            {variant === "small" ? "Artist" : subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}
