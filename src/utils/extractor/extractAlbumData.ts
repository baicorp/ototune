import { Track } from "../../types";

interface AlbumData {
  title: string;
  subtitle: string;
  thumbnail: string;
  albumStat: string;
  description: string;
  artists: { name: string; browseId: string }[];
  tracks: Track[];
}

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
    albumStat: album?.secondSubtitle?.runs
      ?.map((data: any) => data?.text)
      ?.join(""),
    description:
      album?.description?.musicDescriptionShelfRenderer?.description?.runs[0]
        ?.text,
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
            ?.flat(100)
            ?.filter(Boolean),
          thumbnail:
            album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]
              ?.url ||
            album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]
              ?.url?.url,
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
