export interface ContentsExploreType {
  title: string;
  color: string;
  params: string;
}
export interface ExploreType {
  headerTitle: string;
  contents: ContentsExploreType[];
}

export default function extractExploreData(exploreData: any): ExploreType[] {
  exploreData =
    exploreData?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents;
  return exploreData?.map((explore: any) => {
    return {
      headerTitle:
        explore?.gridRenderer?.header?.gridHeaderRenderer?.title?.runs[0]?.text,
      contents: explore?.gridRenderer?.items?.map((item: any) => {
        return {
          title: item?.musicNavigationButtonRenderer?.buttonText?.runs[0]?.text,
          color: argbToRgba(
            item?.musicNavigationButtonRenderer?.solid?.leftStripeColor,
          ),
          params:
            item?.musicNavigationButtonRenderer?.clickCommand?.browseEndpoint
              ?.params,
        };
      }),
    };
  });
}

function argbToRgba(argb: number): string {
  const a = (argb >> 24) & 0xff;
  const r = (argb >> 16) & 0xff;
  const g = (argb >> 8) & 0xff;
  const b = argb & 0xff;

  return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
}
