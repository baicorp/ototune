import usePlayer from "../../hooks/usePlayer";
import { forwardRef, useEffect, useState } from "react";

const PlayPauseButton = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const { isLoading } = usePlayer();
  const [isPlayed, setIsPlayed] = useState(false);
  const audioRef = ref as React.RefObject<HTMLAudioElement>;

  async function handlePlayPause(e: React.MouseEvent | KeyboardEvent) {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  }
  async function handlePlayState() {
    const audio = audioRef.current;
    if (!audio) return;
    setIsPlayed(true);
  }
  function handlePauseState() {
    const audio = audioRef.current;
    if (!audio) return;
    setIsPlayed(false);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("play", handlePlayState);
    audio.addEventListener("pause", handlePauseState);

    return () => {
      audio.removeEventListener("play", handlePlayState);
      audio.removeEventListener("pause", handlePauseState);
    };
  }, [audioRef.current]);

  return (
    <button
      className="px-5 rounded-full bg-themed-border shadow shadow-[rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset] flex justify-center items-center"
      onClick={handlePlayPause}
    >
      {isLoading ? (
        <div className="w-9 aspect-square">
          <svg
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
          >
            <path
              fill="#fff"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      ) : isPlayed ? (
        <div className="w-9 aspect-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
            className="w-full h-full"
          >
            <path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z" />
          </svg>
        </div>
      ) : (
        <div className="w-9 aspect-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
            className="w-full h-full"
          >
            <path d="M320-200v-560l440 280-440 280Z" />
          </svg>
        </div>
      )}
    </button>
  );
});

export default PlayPauseButton;
