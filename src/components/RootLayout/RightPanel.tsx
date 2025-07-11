import useSWR from "swr";
import SongList from "../SongList";
import usePlayer from "../../hooks/usePlayer";
import { getLyrics } from "../../utils/fetcher";
import { useLayout } from "../../hooks/useLayout";
import formatLyric from "../../utils/formatLyric";

export default function RightPanel() {
  const { rightPanel } = useLayout();

  return (
    <aside
      className={`relative ${rightPanel.isOpen ? "basis-[25%] border-l border-themed-border" : "basis-0"} transition-all grow-0 shrink-0 overflow-x-hidden overflow-y-auto`}
    >
      <p className="p-3 bg-themed-bg border-b border-themed-border lg:px-6 lg:py-4 font-semibold sticky top-0 z-10">
        {rightPanel.content}
      </p>
      <div className="px-2 py-2 lg:px-6 lg:py-4">
        {rightPanel.content === "queue" && <QueueContent />}
        {rightPanel.content === "lyrics" && <Lyrics />}
      </div>
    </aside>
  );
}

function QueueContent() {
  const { trackQueue } = usePlayer();
  return (
    <>
      {trackQueue.length !== 0 ? (
        <SongList variant="queue" tracks={trackQueue} />
      ) : (
        <p className="h-full flex justify-center items-center">
          Queue is Empty
        </p>
      )}
    </>
  );
}

function Lyrics() {
  const { currentTrack } = usePlayer();
  const {
    data: lyricsData,
    error,
    isLoading,
  } = useSWR(currentTrack?.id, getLyrics);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Hmm.. failed fetch data.</p>;
  return (
    <>
      {lyricsData &&
        formatLyric(lyricsData).map((lyric, index) => {
          return lyric === "###" ? (
            <div className="mb-6"></div>
          ) : (
            <p key={index} className="text-center leading-snug">
              {lyric}
            </p>
          );
        })}
    </>
  );
}
