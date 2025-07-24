import { MixContent, Track } from "../types";
import { invoke } from "@tauri-apps/api/core";
import extractHomeData from "./extractor/extractHomeData";
import extractExploreData from "./extractor/extractExplore";
import extractAlbumData from "./extractor/extractAlbumData";
import extractTrackData from "./extractor/extractTrackData";
import extractQueueData from "./extractor/extractQueuedata";
import extractSearchData from "./extractor/extractSearchData";
import extractHomeDataTest from "./extractor/extractHomeTest";
import extractArtistData from "./extractor/extractArtistData";
import extractPlaylistData from "./extractor/extractPlaylistData";
import extractMoodsGnereCategory from "./extractor/extractMooodsGenres";
import extractSearchSuggestion from "./extractor/extractSearchSuggestion";
import {
  extractLyricsBrowseId,
  extractLyricsData,
} from "./extractor/extractLyrics";

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

export async function getSearchSuggestion(
  input: string,
): Promise<ReturnType<typeof extractSearchSuggestion> | undefined> {
  try {
    input = input.trim();
    if (input.length === 0) return;
    const searchData = await invoke<MixContent[]>("get_search_suggestion", {
      input,
    });
    return extractSearchSuggestion(searchData);
  } catch (e: any) {
    throw new Error("error data nih");
  }
}

export async function home(): Promise<MixContent[] | undefined> {
  try {
    const [dataOne, dataTwo] = await Promise.all([
      invoke<MixContent[]>("get_home_test"),
      invoke<{ local: MixContent[]; global: MixContent[] }>("get_home"),
    ]);
    const recomendation = extractHomeDataTest(dataOne);

    let { local, global } = dataTwo;
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
      ...recomendation,
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

export async function getLyrics(id: string): Promise<string> {
  try {
    const rawLyricsBrowseId = await invoke<any>("get_lyrics_browse_id", {
      videoId: id,
    });
    const lyricsBrowseId = extractLyricsBrowseId(rawLyricsBrowseId);
    const rawLyricsContent = await invoke<any>("get_lyrics_content", {
      browseId: lyricsBrowseId,
    });
    return extractLyricsData(rawLyricsContent);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getAudioUrl(id: Track["id"]) {
  // fetch the track url stream based on given id (not yet implemented)
  try {
    const audioUrl = await invoke<string>("get_audio_url", {
      videoId: id,
    });
    return audioUrl;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getTrackData(id: Track["id"]) {
  // fetch the track url stream based on given id (not yet implemented)
  try {
    const track = await invoke<string>("get_track_data", {
      videoId: id,
    });
    return extractTrackData(track);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getQueue(id: Track["id"], listId: Track["listId"]) {
  // fetch queue list based on given id && listId(optional)
  try {
    let queueList = await invoke<ReturnType<typeof extractQueueData>>(
      "get_queue_list",
      {
        videoId: id,
        playlistId: listId,
      },
    );
    return extractQueueData(queueList);
  } catch (e: any) {
    throw new Error(e);
  }
}
