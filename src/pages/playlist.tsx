import useSWR from "swr";
import { useParams } from "react-router";
import Library from "../components/Library";
import SongList from "../components/SongList";
import { getPlaylist } from "../utils/fetcher";
import PageWrapper from "../components/PageWrapper";
import PlaylistAlbumPageLoad from "../components/Loading/PlaylistALbumPageLoad";

export default function Playlist() {
  const { id } = useParams();
  const { data: playlistData, error, isLoading } = useSWR(id, getPlaylist);

  if (isLoading) return <PlaylistAlbumPageLoad />;

  if (error) return <p>Hmm.. failed fetch data.</p>;
  return (
    <PageWrapper>
      {playlistData && (
        <>
          <Library
            title={playlistData?.title}
            subtitle={playlistData?.subtitle}
            thumbnail={playlistData?.thumbnail}
            description={playlistData?.description}
            stat={playlistData?.stat}
            play={playlistData?.play}
            explicit={playlistData?.explicit}
            tracks={playlistData?.tracks}
          >
            <SongList tracks={playlistData?.tracks} variant="playlist" />
          </Library>
        </>
      )}
    </PageWrapper>
  );
}
