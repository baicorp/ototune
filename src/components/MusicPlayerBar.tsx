import outlineLove from "../assets/outlineLove.svg";
import filledLove from "../assets/filledLove.svg";
import volumeUp from "../assets/volumeUp.svg";
import queue from "../assets/queue.svg";
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import next from "../assets/next.svg";
import prev from "../assets/prev.svg";

export default function MusicPlayerBar() {
  return (
    <section className="sticky bottom-0 border-t border-neutral-300">
      <div className="flex h-19">
        <PlayerInfo />
        <PlayerControls />
        <PlayerActions />
      </div>
    </section>
  );
}

function PlayerInfo() {
  return (
    <div className="h-full flex-[30%] px-4">
      <div className="h-full flex items-center gap-2">
        <div className="w-13 aspect-square">
          <img
            src="https://i.scdn.co/image/ab67616d00004851bd69bbde4aeee723d6d08058"
            className="w-13 rounded-sm"
          />
        </div>
        <div>
          <p className="font-semibold line-clamp-1">What Are You Waiting For</p>
          <p className="text-neutral-500 line-clamp-1 text-sm">Lil Tecca</p>
        </div>
        <div className="ml-auto shrink-0 w-7 aspect-square">
          <img src={filledLove} className="w-7" />
        </div>
      </div>
    </div>
  );
}

function PlayerControls() {
  return (
    <div className="h-full p-2 flex-2/5">
      <div className="h-full flex flex-col gap-2">
        <div className="flex justify-center gap-4">
          <button onClick={() => console.log("prev")}>
            <img src={prev} className="w-6 aspect-square" />
          </button>
          <button
            onClick={() => console.log("play")}
            className="px-5 rounded-full bg-neutral-200"
          >
            <img src={play} className="w-9 aspect-square" />
          </button>
          <button onClick={() => console.log("next")}>
            <img src={next} className="w-6 aspect-square" />
          </button>
        </div>
        <div className="flex gap-2">
          <p className="text-xs font-[500]">01:21</p>
          <input type="range" className="w-full"></input>
          <p className="text-xs font-[500]">03:10</p>
        </div>
      </div>
    </div>
  );
}

function PlayerActions() {
  return (
    <div className="h-full px-4 flex-[30%]">
      <div className="h-full flex justify-between gap-3 items-center">
        <img src={volumeUp} className="w-6" />
        <img src={queue} className="w-6" />
      </div>
    </div>
  );
}
