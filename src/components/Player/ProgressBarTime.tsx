import usePlayer from "../../hooks/usePlayer";
import { forwardRef, useCallback, useEffect, useState } from "react";

const ProgressBarTime = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const { currentTrack } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = ref as React.RefObject<HTMLAudioElement>;

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef.current, handleTimeUpdate]);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }
    setCurrentTime(0);
  }, [currentTrack]);

  return (
    <input
      className="grow"
      disabled={!audioRef.current?.duration}
      type="range"
      min={0}
      max={audioRef.current?.duration || 0}
      value={currentTime}
      onChange={(e) => {
        e.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = parseFloat(e.currentTarget.value);
        setCurrentTime(parseFloat(e.currentTarget.value));
      }}
    />
  );
});

export default ProgressBarTime;
