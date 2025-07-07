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
    <Link to={`/playlist/${id}`}>
      <div
        className={`flex ${variant === "small" ? "w-full" : "w-34 flex-col"} gap-2 cursor-pointer overflow-overflow-hidden`}
      >
        <div
          className={`${variant === "small" ? "w-12" : "w-34"} aspect-square`}
        >
          <img
            src={thumbnail}
            loading="lazy"
            className={`h-full object-contain object-center ${variant === "small" ? "rounded-sm" : "rounded-md"}`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold line-clamp-2 leading-tight">{title}</p>
          <p className="text-neutral-500 line-clamp-2">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
