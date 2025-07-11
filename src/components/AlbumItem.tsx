import { Link } from "react-router";
import explicitIco from "../assets/explicit.svg";

interface AlbumItemProps {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  explicit?: boolean;
  variant?: "small";
}

export default function AlbumItem({
  id,
  title,
  subtitle,
  thumbnail,
  explicit,
  variant,
}: AlbumItemProps) {
  return (
    <Link to={`/album/${id}`}>
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
          <div className="flex gap-1 items-center">
            {explicit && <img src={explicitIco} className="w-5" />}
            <p className="text-themed-text-muted line-clamp-2">{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
