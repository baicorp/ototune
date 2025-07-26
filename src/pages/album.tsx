import useSWR from "swr";
import { useParams } from "react-router";
import { getAlbum } from "../utils/fetcher";
import Library from "../components/Library";
import SongList from "../components/SongList";
import PageWrapper from "../components/PageWrapper";
import PlaylistAlbumPageLoad from "../components/Loading/PlaylistALbumPageLoad";

export default function Album() {
  const { id } = useParams();
  const { data: albumData, error, isLoading } = useSWR(id, getAlbum);

  if (isLoading) return <PlaylistAlbumPageLoad />;

  if (error) return <p>Hmm.. failed fetch data.</p>;
  return (
    <PageWrapper>
      {albumData && (
        <>
          <Library
            title={albumData.title}
            subtitle={albumData.subtitle}
            thumbnail={albumData.thumbnail}
            description={albumData.description}
            artists={albumData.artists}
            stat={albumData.stat}
            explicit={albumData.explicit}
            play={albumData?.play}
            tracks={albumData?.tracks}
          >
            <SongList tracks={albumData.tracks} variant="album" />
          </Library>
        </>
      )}
    </PageWrapper>
  );
}
