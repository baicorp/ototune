import { MixContent } from "../../types";
import { contentType } from "../contentType";

export default function extractSearchData(searchDataObject: any): MixContent[] {
  let contents: any[];
  contents =
    searchDataObject?.contents?.tabbedSearchResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents;
  return contents
    .map((content: any) => {
      // get top result
      if (content?.musicCardShelfRenderer) {
        const subtitle = content?.musicCardShelfRenderer?.subtitle?.runs?.map(
          (run: any) => run?.text?.trim(),
        );
        return {
          headerTitle:
            content?.musicCardShelfRenderer?.header
              ?.musicCardShelfHeaderBasicRenderer?.title?.runs[0]?.text,
          contents: [
            {
              id:
                content?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.browseEndpoint?.browseId ||
                content?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.watchEndpoint?.videoId,
              title: content?.musicCardShelfRenderer?.title?.runs[0]?.text,
              subtitle: subtitle
                .join(" ")
                .replace(/^(Album|Playlist|Artist) • /, ""),
              thumbnail:
                content?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                content?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
              artists: content?.musicCardShelfRenderer?.subtitle?.runs
                ?.map((run: any) => {
                  if (
                    !run?.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                      "UC",
                    )
                  )
                    return undefined;
                  return {
                    name: run?.text?.trim(),
                    browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
                  };
                })
                ?.filter(Boolean),
              duration: subtitle[subtitle.length - 1] || null,
              explicit:
                ["badges", "subtitleBadges"].some((key) =>
                  content?.musicCardShelfRenderer?.[
                    key as "badges" | "subtitleBadges"
                  ]?.some(
                    (badge: any) =>
                      badge?.musicInlineBadgeRenderer?.accessibilityData
                        ?.accessibilityData?.label === "Explicit",
                  ),
                ) ?? false,
              listId: null,
              type: contentType(
                content?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.watchEndpoint?.videoId ||
                  content?.musicCardShelfRenderer?.title?.runs[0]
                    ?.navigationEndpoint?.browseEndpoint?.browseId,
              ),
            },
          ],
        };
      }
      // get related search result
      if (content?.musicShelfRenderer) {
        if (
          content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
            "podcasts" ||
          content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
            "episodes" ||
          content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
            "profiles" ||
          content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
            "last episodes"
        ) {
          return undefined;
        }

        return {
          headerTitle: content?.musicShelfRenderer?.title?.runs[0]?.text,
          contents: content?.musicShelfRenderer?.contents?.map(
            (content: any) => {
              const subtitle =
                content?.musicResponsiveListItemRenderer?.flexColumns?.map(
                  (flexColumn: any) =>
                    flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                      (run: any) => run?.text?.trim(),
                    ),
                )[1];
              return {
                id:
                  content?.musicResponsiveListItemRenderer?.navigationEndpoint
                    ?.browseEndpoint?.browseId ||
                  content?.musicResponsiveListItemRenderer?.overlay
                    ?.musicItemThumbnailOverlayRenderer?.content
                    ?.musicPlayButtonRenderer?.playNavigationEndpoint
                    ?.watchEndpoint?.videoId,
                title:
                  content?.musicResponsiveListItemRenderer?.flexColumns[0]
                    .musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                    ?.text,
                subtitle: subtitle
                  .join(" ")
                  .replace(/^(Album|Playlist|Artist) • /, ""),
                thumbnail:
                  content?.musicResponsiveListItemRenderer?.thumbnail
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                  content?.musicResponsiveListItemRenderer?.thumbnail
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                artists: content?.musicResponsiveListItemRenderer?.flexColumns
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
                  ?.filter(Boolean),
                duration: subtitle[subtitle.length - 1] || null,
                explicit:
                  ["badges", "subtitleBadges"].some((key) =>
                    content?.musicResponsiveListItemRenderer?.[
                      key as "badges" | "subtitleBadges"
                    ]?.some(
                      (badge: any) =>
                        badge?.musicInlineBadgeRenderer?.accessibilityData
                          ?.accessibilityData?.label === "Explicit",
                    ),
                  ) ?? false,
                listId: null,
                type: contentType(
                  content?.musicResponsiveListItemRenderer?.overlay
                    ?.musicItemThumbnailOverlayRenderer?.content
                    ?.musicPlayButtonRenderer?.playNavigationEndpoint
                    ?.watchEndpoint?.videoId ||
                    content?.musicResponsiveListItemRenderer?.navigationEndpoint
                      ?.browseEndpoint?.browseId,
                ),
              };
            },
          ),
        };
      }
      return undefined;
    })
    .filter((data) => data !== undefined);
}
