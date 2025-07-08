import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import SongList from "../components/SongList";
import PageWrapper from "../components/PageWrapper";
import LibraryHeader from "../components/LibraryHeader";
import extractPlaylistData from "../utils/extractor/extractPlaylistData";

export default function Playlist() {
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [playlist, setPlaylist] =
    useState<ReturnType<typeof extractPlaylistData>>();

  useEffect(() => {
    if (!id) return;
    async function getPlaylist(id: string) {
      setIsLoad(true);
      const data = await invoke<any>("get_playlist", { browseId: id });
      setPlaylist(extractPlaylistData(data));
      setIsLoad(false);
    }
    getPlaylist(id);
  }, [id]);

  if (isLoad) return <p>Loading...</p>;

  return (
    <PageWrapper>
      {playlist && (
        <>
          <LibraryHeader
            title={playlist?.title}
            subtitle={playlist?.subtitle}
            thumbnail={playlist?.thumbnail}
            description={playlist?.description}
            stat={playlist?.playlistStat}
          />
          <SongList tracks={playlist?.tracks} variant="playlist" />
        </>
      )}
    </PageWrapper>
  );
}
