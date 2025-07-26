import { TextItemLoad } from "./TextItemLoad";

export function PlaylistAlbumItemLoad() {
  return (
    <div className="w-fit">
      <div className="w-34 aspect-square bg-themed-border rounded-md animate-pulse"></div>
      <div className={`flex flex-col gap-2 mt-2.5`}>
        <TextItemLoad width="w-full" />
        <TextItemLoad width="w-1/2" />
      </div>
    </div>
  );
}
