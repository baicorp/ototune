import explicitIco from "../assets/explicit.svg";

interface SongItemType {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
  index?: string;
  duration: string;
  explicit?: boolean;
}

export default function SongItem({
  id,
  title,
  artist,
  thumbnail,
  index,
  duration,
  explicit,
}: SongItemType) {
  return (
    <div className="w-full flex items-center gap-2 cursor-pointer">
      <div className="w-12 aspect-square">
        {thumbnail && (
          <img
            src={thumbnail}
            className="w-full aspect-square object-contain object-center rounded-sm"
          />
        )}
        {index && (
          <div className="h-full flex justify-center items-center font-semibold">
            {index}
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <div className="flex items-center gap-2">
          {explicit && <img src={explicitIco} className="w-5" />}
          <p className="text-neutral-500">{artist}</p>
        </div>
      </div>
      <div className="ml-auto mr-2">
        <p className="text-neutral-500 font-mono">{duration}</p>
      </div>
    </div>
  );
}
