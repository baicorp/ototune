import { MixContent } from "../../types";
import { contentType } from "../contentType";

interface ArtistData {
  artistName: string;
  description: string;
  stat: string;
  suffle: { videoId: string; listId: string };
  radio: { videoId: string; listId: string };
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
    stat:
      channelObject?.header?.musicImmersiveHeaderRenderer?.monthlyListenerCount
        ?.runs[0]?.text || "",
    suffle: {
      videoId:
        channelObject?.header?.musicImmersiveHeaderRenderer?.playButton
          ?.buttonRenderer?.navigationEndpoint?.watchEndpoint?.videoId,
      listId:
        channelObject?.header?.musicImmersiveHeaderRenderer?.playButton
          ?.buttonRenderer?.navigationEndpoint?.watchEndpoint?.playlistId,
    },
    radio: {
      videoId:
        channelObject?.header?.musicImmersiveHeaderRenderer?.startRadioButton
          ?.buttonRenderer?.navigationEndpoint?.watchEndpoint?.videoId,
      listId:
        channelObject?.header?.musicImmersiveHeaderRenderer?.startRadioButton
          ?.buttonRenderer?.navigationEndpoint?.watchEndpoint?.playlistId,
    },
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
          // Song
          if (data?.musicShelfRenderer) {
            const headerTitle = data?.musicShelfRenderer?.title?.runs[0]?.text;
            return {
              headerTitle,
              moreContent: {
                id:
                  data?.musicShelfRenderer?.bottomEndpoint?.browseEndpoint
                    ?.browseId || "",
                params:
                  data?.musicShelfRenderer?.bottomEndpoint?.browseEndpoint
                    ?.params || "",
              },
              contents: data?.musicShelfRenderer?.contents?.map((data: any) => {
                return {
                  id: data?.musicResponsiveListItemRenderer?.flexColumns[0]
                    ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                    ?.navigationEndpoint?.watchEndpoint?.videoId,
                  title:
                    data?.musicResponsiveListItemRenderer?.flexColumns[0]
                      ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                      ?.text,
                  thumbnail:
                    data?.musicResponsiveListItemRenderer?.thumbnail
                      ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                    data?.musicResponsiveListItemRenderer?.thumbnail
                      ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                  subtitle: "",
                  artists:
                    data?.musicResponsiveListItemRenderer?.flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs
                      ?.map((run: any) => {
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
                      })
                      .filter(Boolean),
                  duration: null,
                  explicit:
                    data?.musicResponsiveListItemRenderer?.badges?.some(
                      (badge: any) =>
                        badge?.musicInlineBadgeRenderer?.accessibilityData
                          ?.accessibilityData?.label === "Explicit",
                    ) ?? false,
                  listId:
                    data?.musicResponsiveListItemRenderer?.flexColumns[0]
                      ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                      ?.navigationEndpoint?.watchEndpoint?.playlistId,
                  type: contentType(
                    data?.musicResponsiveListItemRenderer?.flexColumns[0]
                      ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                      ?.navigationEndpoint?.watchEndpoint?.videoId,
                  ),
                };
              }),
            };
          }
          // album | single & EP | playlist | video | artist
          if (data?.musicCarouselShelfRenderer) {
            const headerTitle =
              data?.musicCarouselShelfRenderer?.header
                ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text;
            if (
              ["podcasts", "latest episodes"].some((data) =>
                data.includes(headerTitle.toLowerCase()),
              )
            ) {
              return undefined;
            }
            return {
              headerTitle,
              moreContent: {
                id:
                  data?.musicCarouselShelfRenderer?.header
                    ?.musicCarouselShelfBasicHeaderRenderer?.moreContentButton
                    ?.buttonRenderer?.navigationEndpoint?.browseEndpoint
                    ?.browseId || "",
                params:
                  data?.musicCarouselShelfRenderer?.header
                    ?.musicCarouselShelfBasicHeaderRenderer?.moreContentButton
                    ?.buttonRenderer?.navigationEndpoint?.browseEndpoint
                    ?.params || "",
              },
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
                      .join(" ")
                      .replace(/^(Album|Playlist|Artist) • /, ""),
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
                      ?.filter(Boolean),
                    duration: null,
                    explicit:
                      data?.musicTwoRowItemRenderer?.subtitleBadges?.some(
                        (badge: any) =>
                          badge?.musicInlineBadgeRenderer?.accessibilityData
                            ?.accessibilityData?.label === "Explicit",
                      ) ?? false,
                    listId:
                      data?.musicTwoRowItemRenderer?.navigationEndpoint
                        ?.watchEndpoint?.playlistId || null,
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
