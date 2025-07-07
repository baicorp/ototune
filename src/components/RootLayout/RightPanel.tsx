import SongList from "../SongList";
import usePlayer from "../../hooks/usePlayer";
import { useLayout } from "../../hooks/useLayout";

export default function RightPanel() {
  const { trackQueue } = usePlayer();
  const { isRightPanelOpen } = useLayout();

  return (
    <aside
      className={`relative ${isRightPanelOpen ? "basis-[25%]" : "basis-0"} transition-all grow-0 shrink-0 overflow-x-hidden overflow-y-auto border-l border-neutral-300`}
    >
      {trackQueue.length !== 0 ? (
        <>
          <p className="px-2 py-1 border-b border-neutral-300 lg:px-6 lg:py-4 font-semibold sticky top-0 bg-white z-10">
            Queue
          </p>
          <div className="px-2 py-2 lg:px-6 lg:py-4">
            <SongList variant="queue" tracks={trackQueue} />
          </div>
        </>
      ) : (
        <p className="h-full flex justify-center items-center">
          Queue is Empty
        </p>
      )}
    </aside>
  );
}
