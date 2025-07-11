import usePlayer from "../../hooks/usePlayer";
import formatTime from "../../utils/formatTime";
import { forwardRef, useCallback, useEffect, useState } from "react";

const RunningTime = forwardRef<HTMLAudioElement, {}>((_, ref) => {
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
  }, [audioRef.current, currentTrack]);

  return (
    <span className="text-xs tracking-tighter font-[500]">
      {formatTime(currentTime)}
    </span>
  );
});

export default RunningTime;
