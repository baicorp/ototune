import useSWR from "swr";
import { useParams } from "react-router";
import { getAlbum } from "../utils/fetcher";
import SongList from "../components/SongList";
import PageWrapper from "../components/PageWrapper";
import LibraryHeader from "../components/LibraryHeader";

export default function Album() {
  const { id } = useParams();
  const { data: albumData, error, isLoading } = useSWR(id, getAlbum);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Hmm.. failed fetch data.</p>;
  return (
    <PageWrapper>
      {albumData && (
        <>
          <LibraryHeader
            title={albumData.title}
            subtitle={albumData.subtitle}
            thumbnail={albumData.thumbnail}
            description={albumData.description}
            artists={albumData.artists}
            stat={albumData.albumStat}
          />
          <SongList tracks={albumData.tracks} variant="album" />
        </>
      )}
    </PageWrapper>
  );
}
