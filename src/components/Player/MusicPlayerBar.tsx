import { Link } from "react-router";
import StaticTime from "./StaticTime";
import RunningTime from "./RunningTime";
import VolumeSlider from "./VolumeSlider";
import PlayPauseButton from "./PlayPauseBtn";
import NextTrackBtn from "./PrevNextTrackBtn";
import usePlayer from "../../hooks/usePlayer";
import ProgressBarTime from "./ProgressBarTime";
import { useLayout } from "../../hooks/useLayout";
import { forwardRef, useEffect, useRef } from "react";
import { TextItemLoad } from "../Loading/TextItemLoad";

export default function MusicPlayerBar() {
  const { currentTrack, nextTrack, prevTrack } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!currentTrack) return;
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack?.artists.map((artist) => artist?.name).join(" "),
        album: "The Ultimate Collection (Remastered)",
        artwork: [
          {
            src: currentTrack.thumbnail ?? "",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        prevTrack();
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextTrack();
      });
    }
  }, [currentTrack]);

  return (
    <section
      className={`${currentTrack ? "block" : "hidden"} sticky bottom-0 border-t border-themed-border`}
    >
      <div className="flex items-center h-19">
        <PlayerInfo />
        <PlayerControls ref={audioRef} />
        <PlayerActions ref={audioRef} />
      </div>
      <audio
        ref={audioRef}
        autoPlay
        preload="metadata"
        onEnded={nextTrack}
        src={currentTrack?.currentTrackUrlStream}
      />
    </section>
  );
}

function PlayerInfo() {
  const { currentTrack, isLoading } = usePlayer();
  return (
    <>
      {currentTrack && (
        <div className="basis-[30%] max-w-[30%] px-4 grow-0 shrink-0">
          <div className="flex items-center gap-2">
            <div className="shrink-0 w-13 aspect-square border border-themed-border rounded-sm">
              {currentTrack.thumbnail && (
                <img
                  src={currentTrack.thumbnail}
                  className="w-full aspect-square object-contain rounded-sm"
                />
              )}
              {!currentTrack.thumbnail && isLoading && (
                <div className="w-full aspect-square bg-themed-border animate-pulse"></div>
              )}
            </div>
            <div className="basis-9/12 grow-0 overflow-hidden">
              {!currentTrack.title && isLoading ? (
                <TextItemLoad />
              ) : (
                <p className="font-semibold line-clamp-1">
                  {currentTrack.title}
                </p>
              )}
              {currentTrack.artists.length === 0 && isLoading ? (
                <div className="mt-2">
                  <TextItemLoad width="w-1/2" />
                </div>
              ) : (
                <div className="flex items-center flex-nowrap gap-1">
                  {currentTrack.explicit && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      className="w-4 shrink-0 aspect-square fill-themed-text-muted"
                    >
                      <path d="M360-280h240v-80H440v-80h160v-80H440v-80h160v-80H360v400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
                    </svg>
                  )}
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-themed-text-muted text-sm">
                    {currentTrack?.artists.map((artist, index) => (
                      <Link
                        key={artist.browseId}
                        to={`/artist/${artist.browseId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline hover:underline"
                      >
                        {artist.name}
                        {index < currentTrack?.artists.length - 1 && ", "}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="ml-auto shrink-0 w-6 aspect-square"
              onClick={() => {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#F44336"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const PlayerControls = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const audioRef = ref as React.RefObject<HTMLAudioElement>;

  return (
    <div className="p-2 flex-2/5 shrink-0 relative">
      <div className="h-full flex flex-col gap-2">
        <div className="flex justify-center gap-4">
          <NextTrackBtn variant="prev" ref={audioRef} />
          <PlayPauseButton ref={audioRef} />
          <NextTrackBtn variant="next" ref={audioRef} />
        </div>
        <div className="flex items-center gap-2">
          <RunningTime ref={audioRef} />
          <ProgressBarTime ref={audioRef} />
          <StaticTime ref={audioRef} />
        </div>
      </div>
    </div>
  );
});

const PlayerActions = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const audioRef = ref as React.RefObject<HTMLAudioElement>;
  const { setRightPanel, rightPanel } = useLayout();

  function handleRightPanel(action: "lyrics" | "queue") {
    const isOpen = rightPanel.isOpen;
    const current = rightPanel.content;

    if (isOpen) {
      if (current === action) {
        setRightPanel(false, undefined);
      } else {
        setRightPanel(true, action);
      }
    } else {
      setRightPanel(true, action);
    }
  }

  return (
    <div className="px-4 flex-[30%] shrink-0 grow-0">
      <div className="flex justify-end gap-2.5 md:gap-4 lg:gap-6 items-center">
        <VolumeSlider ref={audioRef} />
        <button title="lyric" onClick={() => handleRightPanel("lyrics")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="22px"
            className={
              rightPanel.isOpen && rightPanel.content === "lyrics"
                ? "fill-white"
                : "fill-themed-text-muted"
            }
          >
            <path d="M240-400h160v-80H240v80Zm520-80q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 20.5 2t19.5 5v-207h160v80h-80v240q0 50-35 85t-85 35Zm-520-40h280v-80H240v80Zm0-120h280v-80H240v80Zm0 400L80-80v-720q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v17q-55 24-87.5 73.5T560-600q0 60 32.5 109.5T680-417v97q0 33-23.5 56.5T600-240H240Z" />
          </svg>
        </button>
        <button title="queue" onClick={() => handleRightPanel("queue")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className={
              rightPanel.isOpen && rightPanel.content === "queue"
                ? "fill-white"
                : "fill-themed-text-muted"
            }
          >
            <path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
});
