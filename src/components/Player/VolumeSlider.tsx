import { forwardRef, useCallback, useEffect, useState } from "react";

const VolumeSlider = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const audioRef = ref as React.RefObject<HTMLAudioElement>;
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handleMute = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      e.stopPropagation();
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.volume === 0) {
        const newVolume = volume === 0 ? 1 : volume;
        audio.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(false);
        return;
      }
      audio.volume = 0;
      setIsMuted(true);
    },
    [audioRef, volume],
  );

  const volumeKey = useCallback(
    (e: KeyboardEvent, key: "arrowdown" | "arrowup") => {
      const audio = audioRef.current;
      if (!audio) return;
      if (isMuted) {
        handleMute(e);
        return;
      }
      let newVolume: number;
      if (key === "arrowdown") {
        newVolume = Math.max(parseFloat((audio.volume - 0.1).toFixed(2)), 0);
      } else if (key === "arrowup") {
        newVolume = Math.min(parseFloat((audio.volume + 0.1).toFixed(2)), 1);
      } else {
        newVolume = 1;
      }
      setVolume(newVolume);
      audio.volume = newVolume;
    },
    [audioRef, isMuted],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "m":
          handleMute(e);
          break;
        case "arrowup":
          volumeKey(e, "arrowup");
          break;
        case "arrowdown":
          volumeKey(e, "arrowdown");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMuted, handleMute, volumeKey]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleMute(e);
        }}
      >
        {isMuted || volume === 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-themed-text-muted"
          >
            <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z" />
          </svg>
        )}
      </button>
      <input
        className="max-w-18"
        disabled={audioRef.current?.src ? false : true}
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={isMuted ? 0 : volume}
        onChange={(e) => {
          e.stopPropagation();

          const audio = audioRef.current;
          if (!audio) return;
          audio.volume = parseFloat(e.currentTarget.value);
          setVolume(audio.volume);
        }}
      />
    </div>
  );
});

export default VolumeSlider;
