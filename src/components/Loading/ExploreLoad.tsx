import PageWrapper from "../PageWrapper";
import { TextItemLoad } from "./TextItemLoad";

export default function ExplorePageLoad() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <TextItemLoad variant="headerTitle" width="w-50" />
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
              <div
                key={index}
                className="h-9 animate-pulse rounded-md bg-themed-border"
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <TextItemLoad variant="headerTitle" width="w-50" />
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {[0, 1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="h-9 animate-pulse rounded-md bg-themed-border"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
