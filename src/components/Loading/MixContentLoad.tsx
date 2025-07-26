import PageWrapper from "../PageWrapper";
import { TextItemLoad } from "./TextItemLoad";
import { SongItemLoad } from "./SongItemLoad";
import CategoryListLayout from "../CategoryListLayout";
import { PlaylistAlbumItemLoad } from "./PlyalistAlbumItemLoad";

export default function MixContentLoad() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <TextItemLoad variant="headerTitle" width="w-30" />
          <SongItemLoad />
        </div>
        <div className="flex flex-col gap-4">
          <TextItemLoad variant="headerTitle" width="w-30" />
          <CategoryListLayout category="song">
            {[0, 1, 2].map((_, index) => (
              <SongItemLoad key={index} />
            ))}
          </CategoryListLayout>
        </div>
        <div className="flex flex-col gap-4">
          <TextItemLoad variant="headerTitle" width="w-30" />
          <CategoryListLayout category="playlist">
            {[0, 1, 2].map((_, index) => (
              <PlaylistAlbumItemLoad key={index} />
            ))}
          </CategoryListLayout>
        </div>
      </div>
    </PageWrapper>
  );
}
