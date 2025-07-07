import { MixContent } from "../../types";
import { contentType } from "../contentType";

export default function extractHomeData(data: any): MixContent[] {
  const contents =
    data?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents;
  return contents
    ?.map((data: any) => {
      const contentTypeTitle =
        data?.musicCarouselShelfRenderer?.header
          ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text;
      return {
        headerTitle: contentTypeTitle,
        contents: data?.musicCarouselShelfRenderer?.contents?.map(
          (data: any) => {
            if (data?.musicResponsiveListItemRenderer) {
              return {
                id: data?.musicResponsiveListItemRenderer?.overlay
                  ?.musicItemThumbnailOverlayRenderer?.content
                  ?.musicPlayButtonRenderer?.playNavigationEndpoint
                  ?.watchEndpoint?.videoId,
                title:
                  data?.musicResponsiveListItemRenderer?.flexColumns[0]
                    ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                    ?.text,
                subtitle: data?.musicResponsiveListItemRenderer?.flexColumns
                  ?.map((data: any) =>
                    data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                      (data: any) => data?.text?.trim(),
                    ),
                  )
                  ?.flat(100)
                  ?.filter((data: any) => data?.trim() !== ","),
                thumbnail:
                  data?.musicResponsiveListItemRenderer?.thumbnail
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                  data?.musicResponsiveListItemRenderer?.thumbnail
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                artists: data?.musicResponsiveListItemRenderer?.flexColumns
                  ?.map((data: any) =>
                    data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                      (run: any) => {
                        if (
                          !run?.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                            "UC",
                          )
                        )
                          return undefined;
                        return {
                          name: run?.text,
                          browseId:
                            run?.navigationEndpoint?.browseEndpoint?.browseId,
                        };
                      },
                    ),
                  )
                  ?.flat(100)
                  ?.filter(Boolean),
                duration: null,
                listId: null,
                type: contentType(
                  data?.musicResponsiveListItemRenderer?.overlay
                    ?.musicItemThumbnailOverlayRenderer?.content
                    ?.musicPlayButtonRenderer?.playNavigationEndpoint
                    ?.watchEndpoint?.videoId,
                ),
              };
            }
            if (data?.musicTwoRowItemRenderer) {
              return {
                id:
                  data?.musicTwoRowItemRenderer?.navigationEndpoint
                    ?.watchEndpoint?.videoId ||
                  data?.musicTwoRowItemRenderer?.navigationEndpoint
                    ?.browseEndpoint?.browseId,
                title: data?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
                subtitle: data?.musicTwoRowItemRenderer?.subtitle?.runs
                  ?.map((data: any) => data?.text?.trim())
                  .flat(100)
                  ?.filter((data: any) => data?.trim() !== ","),
                thumbnail:
                  data?.musicTwoRowItemRenderer?.thumbnailRenderer
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                  data?.musicTwoRowItemRenderer?.thumbnailRenderer
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                artists: [],
                duration: null,
                listId: null,
                type: contentType(
                  data?.musicTwoRowItemRenderer?.navigationEndpoint
                    ?.watchEndpoint?.videoId ||
                    data?.musicTwoRowItemRenderer?.navigationEndpoint
                      ?.browseEndpoint?.browseId,
                ),
              };
            }
          },
        ),
      };
    })
    .filter((data: any) => data?.headerTitle);
}
