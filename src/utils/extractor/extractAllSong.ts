import { Track } from "../../types";

export default function extractAllSong(allSongData: any): {
  title: string;
  contents: Track[];
  continuationToken: string;
} {
  const contents =
    allSongData?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicPlaylistShelfRenderer?.contents;
  console.log(contents.length);
  return {
    title: allSongData?.header?.musicHeaderRenderer?.title?.runs[0]?.text,
    contents: contents
      ?.map((content: any) => {
        const dataItem = content?.musicResponsiveListItemRenderer;
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
          explicit:
            dataItem?.badges?.some(
              (badge: any) =>
                badge?.musicInlineBadgeRenderer?.accessibilityData
                  ?.accessibilityData?.label === "Explicit",
            ) ?? false,
          listId:
            dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
              ?.text?.runs[0]?.navigationEndpoint?.watchEndpoint?.playlistId,
        };
      })
      .filter((track: Track) => track.id && track.title),
    continuationToken:
      contents[contents?.length - 1]?.continuationItemRenderer
        ?.continuationEndpoint?.continuationCommand?.token,
  };
}
