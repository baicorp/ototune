import { Link } from "react-router";

interface PlaylistItemProps {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  variant?: "small";
}

export default function PlaylistItem({
  id,
  title,
  subtitle,
  thumbnail,
  variant,
}: PlaylistItemProps) {
  return (
    <Link
      to={`/playlist/${id}`}
      className={`flex ${variant === "small" ? "w-full flex-row gap-2.5" : "w-34 flex-col gap-2"} cursor-pointer overflow-overflow-hidden`}
    >
      <div className={`${variant === "small" ? "w-10" : "w-34"} aspect-square`}>
        <img
          src={thumbnail}
          loading="lazy"
          className={`w-full aspect-square object-contain object-center ${variant === "small" ? "rounded-sm" : "rounded-md"}`}
        />
      </div>
      <div className="flex flex-col justify-around">
        <p className="font-semibold line-clamp-2 leading-tight">{title}</p>
        <p className="text-themed-text-muted line-clamp-2">
          {variant === "small" ? "Playlist • " + subtitle : subtitle}
        </p>
      </div>
    </Link>
  );
}
