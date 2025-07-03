import { Track } from "../../types";

export default function extractQueueData(queueData: any): Track[] {
  queueData =
    queueData?.contents?.singleColumnMusicWatchNextResultsRenderer
      ?.tabbedRenderer?.watchNextTabbedResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.musicQueueRenderer?.content?.playlistPanelRenderer?.contents;
  return queueData
    ?.map((next: any) => {
      next = next?.playlistPanelVideoRenderer;
      return {
        id: next?.navigationEndpoint?.watchEndpoint?.videoId,
        title: next?.title?.runs[0].text,
        artists: next?.longBylineText?.runs
          ?.filter(
            (data: any) =>
              data?.navigationEndpoint?.browseEndpoint
                ?.browseEndpointContextSupportedConfigs
                ?.browseEndpointContextMusicConfig?.pageType ===
              "MUSIC_PAGE_TYPE_ARTIST",
          )
          .map((data: any) => {
            return {
              name: data?.text,
              browseId: data?.navigationEndpoint?.browseEndpoint?.browseId,
            };
          }),
        thumbnail:
          next?.thumbnail?.thumbnails[1]?.url ||
          next?.thumbnail?.thumbnails[0]?.url,
        duration: next?.lengthText?.runs[0]?.text,
        listId: next?.navigationEndpoint?.watchEndpoint?.playlistId,
      };
    })
    .filter((track: Track) => track?.id && track.title);
}
