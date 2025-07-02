import { MixContent } from "../../types";
import { contentType } from "../contentType";

interface ArtistData {
  artistName: string;
  description: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  avatar: string;
  contents: MixContent[];
}

export default function extractArtistData(channelObject: any): ArtistData {
  return {
    artistName:
      channelObject?.header?.musicImmersiveHeaderRenderer?.title?.runs[0]
        ?.text ||
      channelObject?.header?.musicVisualHeaderRenderer?.title?.runs[0]?.text,
    description:
      channelObject?.header?.musicImmersiveHeaderRenderer?.description?.runs[0]
        ?.text,
    thumbnail:
      channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 2
      ]?.url ||
      channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 3
      ]?.url,
    thumbnailWidth:
      channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 2
      ]?.width ||
      channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 3
      ]?.width,
    thumbnailHeight:
      channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 2
      ]?.height ||
      channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 3
      ]?.height,
    avatar:
      channelObject?.header?.musicVisualHeaderRenderer?.foregroundThumbnail
        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]?.url,
    contents:
      channelObject?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents
        ?.map((data: any) => {
          if (data?.musicShelfRenderer) {
            return {
              headerTitle: data?.musicShelfRenderer?.title?.runs[0]?.text,
              contents: data?.musicShelfRenderer?.contents?.map((data: any) => {
                return {
                  id: data?.musicResponsiveListItemRenderer?.overlay
                    ?.musicItemThumbnailOverlayRenderer?.content
                    ?.musicPlayButtonRenderer?.playNavigationEndpoint
                    ?.watchEndpoint?.videoId,
                  title:
                    data?.musicResponsiveListItemRenderer?.flexColumns[0]
                      ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                      ?.text,
                  thumbnail:
                    data?.musicResponsiveListItemRenderer?.thumbnail
                      ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                    data?.musicResponsiveListItemRenderer?.thumbnail
                      ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                  subtitle: data?.musicResponsiveListItemRenderer?.flexColumns
                    ?.map((data: any) =>
                      data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                        (data: any) => data?.text?.trim(),
                      ),
                    )
                    ?.flat(100)
                    ?.filter((data: any) => data?.trim() !== ","),
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
                  type: contentType(
                    data?.musicResponsiveListItemRenderer?.overlay
                      ?.musicItemThumbnailOverlayRenderer?.content
                      ?.musicPlayButtonRenderer?.playNavigationEndpoint
                      ?.watchEndpoint?.videoId,
                  ),
                };
              }),
            };
          }
          if (data?.musicCarouselShelfRenderer) {
            return {
              headerTitle:
                data?.musicCarouselShelfRenderer?.header
                  ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text,
              contents: data?.musicCarouselShelfRenderer?.contents?.map(
                (data: any) => {
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
                      ?.filter((data: any) => data.trim() !== ","),
                    thumbnail:
                      data?.musicTwoRowItemRenderer?.thumbnailRenderer
                        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]
                        ?.url ||
                      data?.musicTwoRowItemRenderer?.thumbnailRenderer
                        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                    artists: data?.musicTwoRowItemRenderer?.subtitle?.runs
                      ?.map((run: any) => {
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
                      })
                      .flat(100)
                      ?.filter(Boolean),
                    duration: null,
                    type: contentType(
                      data?.musicTwoRowItemRenderer?.navigationEndpoint
                        ?.browseEndpoint?.browseId ||
                        data?.musicTwoRowItemRenderer?.navigationEndpoint
                          ?.watchEndpoint?.videoId,
                    ),
                  };
                },
              ),
            };
          }
        })
        .filter(Boolean),
  };
}
