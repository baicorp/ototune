import { LibraryHeaderProps } from "../../components/Library";
import { Track } from "../../types";

export type AlbumData = LibraryHeaderProps;

export default function extractAlbumData(albumDataObject: any): AlbumData {
  const album =
    albumDataObject?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicResponsiveHeaderRenderer;
  const contents =
    albumDataObject?.contents?.twoColumnBrowseResultsRenderer?.secondaryContents
      ?.sectionListRenderer?.contents[0]?.musicShelfRenderer?.contents;
  return {
    title: album?.title?.runs[0]?.text,
    subtitle: album?.subtitle?.runs?.map((data: any) => data?.text)?.join(""),
    thumbnail:
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[3]?.url ||
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]?.url ||
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
    stat: album?.secondSubtitle?.runs?.map((data: any) => data?.text)?.join(""),
    description:
      album?.description?.musicDescriptionShelfRenderer?.description?.runs[0]
        ?.text,
    explicit:
      !!album?.subtitleBadge?.[0]?.musicInlineBadgeRenderer?.accessibilityData
        ?.accessibilityData?.label,
    play: album?.buttons[1]?.musicPlayButtonRenderer?.playNavigationEndpoint
      ?.watchPlaylistEndpoint?.playlistId,
    artists: album?.straplineTextOne?.runs
      ?.map((run: any) => {
        if (run?.navigationEndpoint?.browseEndpoint) {
          return {
            name: run?.text,
            browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
          };
        }
        return null;
      })
      ?.filter((data: any) => data !== null),
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
          artists: album?.straplineTextOne?.runs
            ?.map((run: any) => {
              if (run?.navigationEndpoint?.browseEndpoint) {
                return {
                  name: run?.text,
                  browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
                };
              }
              return undefined;
            })
            ?.filter(Boolean),
          thumbnail:
            album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]
              ?.url ||
            album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]
              ?.url?.url,
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
  };
}
