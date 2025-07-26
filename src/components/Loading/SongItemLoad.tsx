import { TextItemLoad } from "./TextItemLoad";

export function SongItemLoad({ variant }: { variant?: "small" }) {
  return (
    <div className="flex gap-2.5">
      <div
        className={`${variant === "small" ? "w-10" : "w-12"} bg-themed-border aspect-square rounded-md animate-pulse`}
      ></div>
      <div className={`flex flex-col justify-around`}>
        <TextItemLoad width="w-50" />
        <TextItemLoad width="w-30" />
      </div>
    </div>
  );
}
