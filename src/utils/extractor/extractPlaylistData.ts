import { Track } from "../../types";

interface PlaylistData {
  title: string;
  subtitle: string;
  thumbnail: string;
  playlistStat: string;
  description: string;
  tracks: Track[];
}

export default function extractPlaylistData(playlistObject: any): PlaylistData {
  const playlist =
    playlistObject?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicResponsiveHeaderRenderer;
  let contents =
    playlistObject?.contents?.twoColumnBrowseResultsRenderer?.secondaryContents
      ?.sectionListRenderer?.contents[0]?.musicPlaylistShelfRenderer?.contents;
  return {
    title: playlist?.title?.runs[0]?.text,
    subtitle: playlist?.subtitle?.runs
      ?.map((data: any) => data?.text)
      ?.join(""),
    thumbnail:
      playlist?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[3]
        ?.url ||
      playlist?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]
        ?.url ||
      playlist?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]
        ?.url ||
      playlist?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]
        ?.url,
    playlistStat: playlist?.secondSubtitle?.runs
      ?.map((data: any) => data?.text)
      ?.join(""),
    description:
      playlist?.description?.musicDescriptionShelfRenderer?.description?.runs[0]
        ?.text,
    tracks: contents
      ?.map((data: any) => {
        const dataItem = data?.musicResponsiveListItemRenderer;
        return {
          id: dataItem?.flexColumns[0]
            ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
            ?.navigationEndpoint?.watchEndpoint?.videoId,
          title:
            dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
              ?.text?.runs[0]?.text,
          artists: dataItem?.flexColumns
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
                    browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
                  };
                },
              ),
            )
            ?.flat(100)
            ?.filter(Boolean),
          thumbnail:
            dataItem?.thumbnail?.musicThumbnailRenderer?.thumbnail
              ?.thumbnails[1]?.url ||
            dataItem?.thumbnail?.musicThumbnailRenderer?.thumbnail
              ?.thumbnails[0]?.url,
          duration:
            dataItem?.fixedColumns[0]
              ?.musicResponsiveListItemFixedColumnRenderer?.text?.runs[0]?.text,
          listId:
            dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
              ?.text?.runs[0]?.navigationEndpoint?.watchEndpoint?.playlistId,
        };
      })
      .filter((track: Track) => track.id && track.title),
  };
}
