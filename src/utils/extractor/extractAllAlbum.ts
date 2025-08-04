import { MixContent } from "../../types";

export default function extractAllAlbum(listAlbumData: any): {
  title: string;
  contents: MixContent["contents"];
  continuation: string;
} {
  const contents =
    listAlbumData?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.gridRenderer
      ?.items;
  return {
    title: listAlbumData?.header?.musicHeaderRenderer?.title?.runs[0]?.text,
    continuation:
      contents[contents?.length - 1]?.continuationItemRenderer
        ?.continuationEndpoint?.continuationCommand?.token,
    contents: contents?.map((content: any) => {
      const dataItem = content?.musicTwoRowItemRenderer;
      return {
        id: dataItem?.navigationEndpoint?.browseEndpoint?.browseId,
        title: dataItem?.title?.runs[0]?.text,
        artists: [],
        thumbnail:
          dataItem?.thumbnailRenderer?.musicThumbnailRenderer?.thumbnail
            ?.thumbnails[0]?.url,
        explicit:
          dataItem?.subtitleBadges?.[0]?.musicInlineBadgeRenderer
            ?.accessibilityData?.accessibilityData?.label === "Explicit"
            ? true
            : false,
        duration: null,
        listId: null,
        subtitle: dataItem?.subtitle?.runs
          ?.map((run: any) => run?.text)
          .join(""),
        type: "album",
      };
    }),
  };
}
