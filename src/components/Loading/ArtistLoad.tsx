import PageWrapper from "../PageWrapper";
import { TextItemLoad } from "./TextItemLoad";
import { SongItemLoad } from "./SongItemLoad";
import CategoryListLayout from "../CategoryListLayout";

export default function ArtistPageLoad() {
  return (
    <PageWrapper>
      <div className="flex flex-col pt-32">
        <div className="py-6 flex flex-col gap-4 lg:gap-4 lg:p-8">
          <TextItemLoad variant="headerTitle" width="w-30" />
          <TextItemLoad variant="headerTitle" width="w-30" />
          <div className="w-2/3 cursor-pointer flex flex-col gap-1">
            <TextItemLoad width="w-full" />
            <TextItemLoad width="w-full" />
            <TextItemLoad width="w-full" />
          </div>
          <div className="flex gap-2 mt-1">
            <div className="animate-pulse rounded-full w-28 h-10 p-3 bg-themed-border"></div>
            <div className="animate-pulse rounded-full w-28 h-10 p-3 bg-themed-border"></div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-col gap-4">
            <TextItemLoad variant="headerTitle" width="w-30" />
            <CategoryListLayout category="song">
              {[0, 1, 2].map((_, index) => (
                <SongItemLoad key={index} />
              ))}
            </CategoryListLayout>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
