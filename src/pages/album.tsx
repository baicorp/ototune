import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SongList from "../components/SongList";
import { invoke } from "@tauri-apps/api/core";
import PageWrapper from "../components/PageWrapper";
import LibraryHeader from "../components/LibraryHeader";
import extractAlbumData from "../utils/extractor/extractAlbumData";

export default function Album() {
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [album, setAlbum] = useState<ReturnType<typeof extractAlbumData>>();

  useEffect(() => {
    if (!id) return;
    async function getAlbum(id: string) {
      setIsLoad(true);
      const data = await invoke<ReturnType<typeof extractAlbumData>>(
        "get_album",
        { browseId: id },
      );
      setAlbum(extractAlbumData(data));
      setIsLoad(false);
    }
    getAlbum(id);
  }, []);

  if (isLoad) return <p>Loading...</p>;

  return (
    <PageWrapper>
      {album && (
        <>
          <LibraryHeader
            title={album.title}
            subtitle={album.subtitle}
            thumbnail={album.thumbnail}
            description={album.description}
            artists={album.artists}
            stat={album.albumStat}
          />
          <SongList tracks={album.tracks} variant="album" />
        </>
      )}
    </PageWrapper>
  );
}
