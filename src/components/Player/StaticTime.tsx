import usePlayer from "../../hooks/usePlayer";
import formatTime from "../../utils/formatTime";
import { forwardRef, useEffect, useState } from "react";

const StaticTime = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const { currentTrack } = usePlayer();
  const [fullTime, setFullTime] = useState("");
  const audioRef = ref as React.RefObject<HTMLAudioElement>;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setFullTime("00:00");

    const updateTime = () => {
      const duration = audio.duration;
      if (!isNaN(duration)) {
        setFullTime(formatTime(duration));
      }
    };

    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, [audioRef.current, currentTrack]);

  return <p className="text-xs tracking-tighter font-[500]">{fullTime}</p>;
});

export default StaticTime;
