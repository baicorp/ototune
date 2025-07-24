import { MixContent } from "../../types";
import { contentType } from "../contentType";

type searchSuggestionType = MixContent["contents"];

export default function extractSearchSuggestion(
  suggestionData: any,
): searchSuggestionType {
  const suggestions = suggestionData?.contents;
  if (!suggestions) return [];
  return suggestions
    ?.map((suggestion: any) => {
      const contents = suggestion?.searchSuggestionsSectionRenderer?.contents;
      return contents.map((content: any) => {
        // search suggestion text
        if (content?.searchSuggestionRenderer) {
          const data = content?.searchSuggestionRenderer;
          return {
            id: data?.navigationEndpoint?.searchEndpoint?.query,
            title: "",
            artists: [],
            thumbnail: "",
            explicit: false,
            duration: null,
            listId: null,
            subtitle: "",
            type: "query",
          };
        }
        // search suggestion item (playlist, album, song, artist)
        else if (content?.musicResponsiveListItemRenderer) {
          const data = content?.musicResponsiveListItemRenderer;
          return {
            id:
              data?.navigationEndpoint?.browseEndpoint?.browseId ||
              data?.navigationEndpoint?.watchEndpoint?.videoId,
            title:
              data?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
                ?.text?.runs[0]?.text,
            artists:
              data?.flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs
                ?.map((data: any) => {
                  if (data.navigationEndpoint?.browseEndpoint?.browseId) {
                    return {
                      name: data?.text,
                      browseId:
                        data.navigationEndpoint?.browseEndpoint?.browseId,
                    };
                  }
                  return {};
                })
                .filter((data: any) => data.browseId) || [],
            thumbnail:
              data?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]
                ?.url,
            explicit:
              !!data?.badges?.[0]?.musicInlineBadgeRenderer?.accessibilityData
                ?.accessibilityData?.label,
            duration: null,
            listId: null,
            subtitle:
              data?.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.at(
                -1,
              )?.text || "",
            type: contentType(
              data?.navigationEndpoint?.browseEndpoint?.browseId ||
                data?.navigationEndpoint?.watchEndpoint?.videoId,
            ),
          };
        }
      });
    })
    .flat();
}
