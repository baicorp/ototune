import { forwardRef } from "react";
import usePlayer from "../../hooks/usePlayer";

const NextTrackBtn = forwardRef<HTMLAudioElement, { variant: "next" | "prev" }>(
  (props, ref) => {
    const audioRef = ref as React.RefObject<HTMLAudioElement>;
    const { nextTrack, prevTrack } = usePlayer();

    function handleClick() {
      const audio = audioRef.current;
      if (!audio) return;
      if (props.variant === "prev") {
        if (audio.currentTime < 5) {
          prevTrack();
        } else {
          audio.currentTime = 0;
        }
      } else if (props.variant === "next") {
        nextTrack();
      }
    }

    return (
      <button onClick={handleClick}>
        <div className="w-6 aspect-square">
          {props.variant == "next" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="w-full h-full fill-secondary"
            >
              <path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="w-full h-full fill-secondary"
            >
              <path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Z"></path>
            </svg>
          )}
        </div>
      </button>
    );
  },
);

export default NextTrackBtn;
