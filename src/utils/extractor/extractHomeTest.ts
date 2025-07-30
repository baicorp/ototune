import { MixContent } from "../../types";
import { contentType } from "../contentType";

export default function extractHomeDataTest(object: any): MixContent[] {
  let contents: any[];
  contents =
    object?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents;
  return contents
    .map((content: any) => {
      if (
        content?.musicCarouselShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "podcasts" ||
        content?.musicCarouselShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "episodes" ||
        content?.musicCarouselShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "profiles" ||
        content?.musicCarouselShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "last episodes"
      ) {
        return {
          headerTitle: undefined,
          moreContent: { id: "", params: "" },
          contents: [],
        };
      }

      return {
        headerTitle:
          content?.musicCarouselShelfRenderer?.header
            ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text,
        moreContent: { id: "", params: "" },
        contents: content?.musicCarouselShelfRenderer?.contents?.map(
          (content: any) => {
            return {
              id:
                content?.musicTwoRowItemRenderer?.navigationEndpoint
                  ?.browseEndpoint?.browseId ||
                content?.musicResponsiveListItemRenderer?.overlay
                  ?.musicItemThumbnailOverlayRenderer?.content
                  ?.musicPlayButtonRenderer?.playNavigationEndpoint
                  ?.watchEndpoint?.videoId,
              title:
                content?.musicTwoRowItemRenderer?.title?.runs[0]?.text ||
                content?.musicResponsiveListItemRenderer?.flexColumns[0]
                  .musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                  ?.text,
              subtitle:
                content?.musicTwoRowItemRenderer?.subtitle?.runs
                  ?.map((run: any) => run?.text)
                  ?.join(" ") || "",
              thumbnail:
                content?.musicResponsiveListItemRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url ||
                content?.musicTwoRowItemRenderer?.thumbnailRenderer
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
              artists:
                content?.musicResponsiveListItemRenderer?.flexColumns
                  ?.map((flexColumn: any) =>
                    flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                      (run: any) => {
                        if (
                          !run?.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                            "UC",
                          )
                        )
                          return undefined;
                        return {
                          name: run?.text?.trim(),
                          browseId:
                            run?.navigationEndpoint?.browseEndpoint?.browseId,
                        };
                      },
                    ),
                  )
                  ?.flat(100)
                  ?.filter(Boolean) || [],
              duration: null,
              explicit: (() => {
                const renderers = [
                  content?.musicResponsiveListItemRenderer,
                  content?.musicTwoRowItemRenderer,
                ];

                return renderers.some((renderer) =>
                  ["badges", "subtitleBadges"].some((key) =>
                    renderer?.[key as "badges" | "subtitleBadges"]?.some(
                      (badge: any) =>
                        badge?.musicInlineBadgeRenderer?.accessibilityData
                          ?.accessibilityData?.label === "Explicit",
                    ),
                  ),
                );
              })(),
              listId: null,
              type: contentType(
                content?.musicTwoRowItemRenderer?.navigationEndpoint
                  ?.browseEndpoint?.browseId ||
                  content?.musicResponsiveListItemRenderer?.overlay
                    ?.musicItemThumbnailOverlayRenderer?.content
                    ?.musicPlayButtonRenderer?.playNavigationEndpoint
                    ?.watchEndpoint?.videoId,
              ),
            };
          },
        ),
      };
    })
    .filter((data: any) => data?.headerTitle !== undefined);
}
