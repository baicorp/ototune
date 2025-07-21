import { forwardRef, useState } from "react";

const VolumeSlider = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const audioRef = ref as React.RefObject<HTMLAudioElement>;
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handleMute = (e: React.MouseEvent) => {
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
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="shrink-0 w-6"
        onClick={(e) => {
          e.stopPropagation();
          handleMute(e);
        }}
      >
        {isMuted || volume === 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-themed-text-muted w-full aspect-square"
          >
            <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-white w-full aspect-square"
          >
            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z" />
          </svg>
        )}
      </button>
      <input
        className="grow max-w-18"
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
          const newVolume = parseFloat(e.currentTarget.value);
          audio.volume = newVolume;
          setVolume(newVolume);
        }}
      />
    </div>
  );
});

export default VolumeSlider;
