import { MixContent } from "../types";
import { invoke } from "@tauri-apps/api/core";
import extractHomeData from "./extractor/extractHomeData";
import extractExploreData from "./extractor/extractExplore";
import extractAlbumData from "./extractor/extractAlbumData";
import extractSearchData from "./extractor/extractSearchData";
import extractArtistData from "./extractor/extractArtistData";
import extractPlaylistData from "./extractor/extractPlaylistData";
import extractMoodsGnereCategory from "./extractor/extractMooodsGenres";

export async function search(query: string): Promise<MixContent[] | undefined> {
  try {
    query = query.trim();
    if (query.length === 0) return;
    const searchData = await invoke<MixContent[]>("search", { query });
    return extractSearchData(searchData);
  } catch (e: any) {
    throw new Error("error data nih");
  }
}

export async function home(): Promise<MixContent[] | undefined> {
  try {
    let { local, global } = await invoke<any>("get_home");
    local = extractHomeData(local);
    global = extractHomeData(global);
    const homeData = [
      {
        headerTitle: "Local " + local[0].headerTitle,
        contents: local[0].contents,
      },
      {
        headerTitle: "Global " + global[0].headerTitle,
        contents: global[0].contents,
      },
    ];
    return homeData;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getPlaylist(
  id: string,
): Promise<ReturnType<typeof extractPlaylistData> | undefined> {
  try {
    if (!id) throw new Error("no id provided");
    const data = await invoke<any>("get_playlist", { browseId: id });
    return extractPlaylistData(data);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getAlbum(
  id: string,
): Promise<ReturnType<typeof extractAlbumData> | undefined> {
  try {
    if (!id) throw new Error("no id provided");
    const data = await invoke<any>("get_album", { browseId: id });
    return extractAlbumData(data);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getArtist(
  id: string,
): Promise<ReturnType<typeof extractArtistData> | undefined> {
  try {
    if (!id) throw new Error("no id provided");
    const data = await invoke<any>("get_artist", { browseId: id });
    return extractArtistData(data);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function explore(): Promise<
  ReturnType<typeof extractExploreData> | undefined
> {
  try {
    const rawExploreData = await invoke<any>("explore");
    return extractExploreData(rawExploreData);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function moodsGenresCategory(
  params: string,
): Promise<ReturnType<typeof extractMoodsGnereCategory> | undefined> {
  try {
    if (!params) throw new Error("no id provided");
    const rawExploreData = await invoke<any>("moods_genre_category", {
      params,
    });
    return extractMoodsGnereCategory(rawExploreData);
  } catch (e: any) {
    throw new Error(e);
  }
}
