import { MixContent } from "../../types";
import { contentType } from "../contentType";

export default function extractSearchAllAlbumPlaylistArtist(
  listAlbumData: any,
): {
  title: string;
  contents: MixContent["contents"];
  continuation: string;
} {
  const contents =
    listAlbumData?.contents?.tabbedSearchResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents[0]?.musicShelfRenderer?.contents;
  return {
    title:
      listAlbumData?.contents?.tabbedSearchResultsRenderer?.tabs[0]?.tabRenderer
        ?.content?.sectionListRenderer?.contents[0]?.musicShelfRenderer?.title
        ?.runs[0]?.text,
    continuation:
      listAlbumData?.contents?.tabbedSearchResultsRenderer?.tabs[0]?.tabRenderer
        ?.content?.sectionListRenderer?.contents[0]?.musicShelfRenderer
        ?.continuations?.[0]?.nextContinuationData?.continuation || "",
    contents: contents?.map((content: any) => {
      const dataItem = content?.musicResponsiveListItemRenderer;
      return {
        id: dataItem?.navigationEndpoint?.browseEndpoint?.browseId,
        title:
          dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
            ?.text?.runs[0]?.text,
        artists: [],
        thumbnail:
          dataItem?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]
            ?.url,
        explicit:
          dataItem?.badges?.[0]?.musicInlineBadgeRenderer?.accessibilityData
            ?.accessibilityData?.label === "Explicit"
            ? true
            : false,
        duration: null,
        listId: null,
        subtitle: dataItem?.flexColumns
          ?.map((flexColumn: any) =>
            flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
              (run: any) => run?.text?.trim(),
            ),
          )[1]
          .join(" "),
        type: contentType(
          dataItem?.navigationEndpoint?.browseEndpoint?.browseId,
        ),
      };
    }),
  };
}
