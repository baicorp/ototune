import useSWR from "swr";
import { useParams } from "react-router";
import SongList from "../components/SongList";
import { getPlaylist } from "../utils/fetcher";
import PageWrapper from "../components/PageWrapper";
import LibraryHeader from "../components/LibraryHeader";

export default function Playlist() {
  const { id } = useParams();
  const { data: playlistData, error, isLoading } = useSWR(id, getPlaylist);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Hmm.. failed fetch data.</p>;
  return (
    <PageWrapper>
      {playlistData && (
        <>
          <LibraryHeader
            title={playlistData?.title}
            subtitle={playlistData?.subtitle}
            thumbnail={playlistData?.thumbnail}
            description={playlistData?.description}
            stat={playlistData?.playlistStat}
          />
          <SongList tracks={playlistData?.tracks} variant="playlist" />
        </>
      )}
    </PageWrapper>
  );
}
