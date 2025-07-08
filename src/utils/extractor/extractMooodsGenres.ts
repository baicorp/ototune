import { MixContent } from "../../types";
import { contentType } from "../contentType";

export default function extractMoodsGnereCategory(
  moodsGenreCategory: any,
): MixContent[] {
  moodsGenreCategory =
    moodsGenreCategory?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents;

  return moodsGenreCategory?.map((category: any) => {
    return {
      headerTitle:
        category?.musicCarouselShelfRenderer?.header
          ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text,
      contents: category?.musicCarouselShelfRenderer?.contents?.map(
        (content: any) => {
          return {
            id:
              content?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.navigationEndpoint?.watchEndpoint?.videoId ||
              content?.musicTwoRowItemRenderer?.navigationEndpoint
                ?.browseEndpoint?.browseId ||
              content?.musicTwoRowItemRenderer?.navigationEndpoint
                ?.watchEndpoint?.videoId,
            title:
              content?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.text ||
              content?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
            artists:
              content?.musicResponsiveListItemRenderer?.flexColumns
                ?.map((column: any) => {
                  const browseId =
                    column?.musicResponsiveListItemFlexColumnRenderer?.text
                      ?.runs[0]?.navigationEndpoint?.browseEndpoint?.browseId;
                  if (browseId && browseId.startsWith("UC")) {
                    return {
                      browseId,
                      name: column?.musicResponsiveListItemFlexColumnRenderer
                        ?.text?.runs[0]?.text,
                    };
                  }
                  return undefined;
                })
                .filter(Boolean) || [],
            thumbnail:
              content?.musicResponsiveListItemRenderer?.thumbnail
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0].url ||
              content?.musicTwoRowItemRenderer?.thumbnailRenderer
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            duration: null,
            listId:
              content?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.navigationEndpoint?.watchEndpoint?.playlistId || null,
            type: contentType(
              content?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.navigationEndpoint?.watchEndpoint?.videoId ||
                content?.musicTwoRowItemRenderer?.navigationEndpoint
                  ?.browseEndpoint?.browseId ||
                content?.musicTwoRowItemRenderer?.navigationEndpoint
                  ?.watchEndpoint?.videoId,
            ),
            subtitle:
              content?.musicTwoRowItemRenderer?.subtitle?.runs[0]?.text || "",
          };
        },
      ),
    };
  });
}
