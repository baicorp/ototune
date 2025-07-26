import PageWrapper from "../PageWrapper";
import { SongItemLoad } from "./SongItemLoad";
import { TextItemLoad } from "./TextItemLoad";

export default function PlaylistAlbumLoad() {
  return (
    <PageWrapper>
      <header className="flex flex-col items-center gap-3 cursor-default mt-4 mb-6">
        <div className="w-52 h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64 aspect-square bg-themed-border animate-pulse rounded-lg"></div>
        <div className="flex flex-col items-center gap-2">
          <TextItemLoad variant="headerTitle" width="w-40" />
          <TextItemLoad width="w-20" />
          <div className="flex flex-col items-center gap-2">
            <TextItemLoad width="w-30" />
            <TextItemLoad width="w-30" />
          </div>
          <div className="bg-themed-border animate-pulse rounded-full w-16 aspect-square"></div>
        </div>
      </header>
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <SongItemLoad key={index} />
        ))}
      </div>
    </PageWrapper>
  );
}
