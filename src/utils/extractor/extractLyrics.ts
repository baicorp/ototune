export function extractLyricsBrowseId(videoInfo: any): string {
  const tabs =
    videoInfo?.contents?.singleColumnMusicWatchNextResultsRenderer
      ?.tabbedRenderer?.watchNextTabbedResultsRenderer?.tabs;
  const arr = tabs
    ?.map((tab: any) => {
      if (tab?.tabRenderer?.title.toLowerCase() === "lyrics") {
        return tab?.tabRenderer?.endpoint?.browseEndpoint?.browseId;
      }
      return undefined;
    })
    .filter(Boolean);
  return arr[0];
}

export function extractLyricsData(lyricsData: any): string {
  return (
    lyricsData?.contents?.sectionListRenderer?.contents[0]
      ?.musicDescriptionShelfRenderer?.description?.runs[0]?.text ||
    lyricsData?.contents?.messageRenderer?.text?.runs[0]?.text
  );
}
