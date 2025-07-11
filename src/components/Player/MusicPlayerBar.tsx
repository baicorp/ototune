import { Link } from "react-router";
import StaticTime from "./StaticTime";
import RunningTime from "./RunningTime";
import VolumeSlider from "./VolumeSlider";
import { forwardRef, useRef } from "react";
import PlayPauseButton from "./PlayPauseBtn";
import NextTrackBtn from "./PrevNextTrackBtn";
import ProgressBarTime from "./ProgressBarTime";
import { useLayout } from "../../hooks/useLayout";
import filledLove from "../../assets/filledLove.svg";
import usePlayer, { TrackState } from "../../hooks/usePlayer";

export default function MusicPlayerBar() {
  const { currentTrack, nextTrack } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <section
      className={`${currentTrack ? "block" : "hidden"} sticky bottom-0 border-t border-themed-border`}
    >
      <div className="flex h-19">
        <PlayerInfo currentTrack={currentTrack} />
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

function PlayerInfo({ currentTrack }: Pick<TrackState, "currentTrack">) {
  return (
    <>
      {currentTrack && (
        <div className="h-full basis-[30%] max-w-[30%] px-4">
          <div className="h-full flex items-center gap-2">
            <div className="shrink-0 w-13 aspect-square border border-themed-border rounded-sm">
              <img
                src={currentTrack.thumbnail}
                className="w-13 h-full object-contain rounded-sm"
              />
            </div>
            <div className="basis-9/12 grow-0 overflow-hidden">
              <p className="font-semibold line-clamp-1">{currentTrack.title}</p>
              <div className="flex flex-nowrap gap-1">
                {currentTrack.artists.map((artist) => (
                  <Link
                    key={artist.browseId}
                    to={`/artist/${artist.browseId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer text-themed-text-muted text-nowrap text-sm line-clamp-1"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="ml-auto shrink-0 w-7 aspect-square">
              <img src={filledLove} className="w-7" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const PlayerControls = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const audioRef = ref as React.RefObject<HTMLAudioElement>;

  return (
    <div className="h-full p-2 flex-2/5 shrink-0 relative">
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
    <div className="h-full px-4 flex-[30%]">
      <div className="h-full flex justify-between gap-3 items-center">
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
