import { Link } from "react-router";

interface AlbumItemProps {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  explicit: boolean;
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
    <Link
      to={`/album/${id}`}
      className={`flex ${variant === "small" ? "w-full flex-row gap-2.5 p-1 rounded-md hover:bg-themed-card" : "w-34 flex-col gap-2"} cursor-pointer overflow-overflow-hidden`}
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
        <div className="flex items-start gap-1">
          {explicit && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="mt-0.5 w-5 shrink-0 items-start aspect-square fill-themed-text-muted"
            >
              <path d="M360-280h240v-80H440v-80h160v-80H440v-80h160v-80H360v400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
            </svg>
          )}
          <p className="text-themed-text-muted line-clamp-2" title={subtitle}>
            {variant === "small" ? "Album • " + subtitle : subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}
