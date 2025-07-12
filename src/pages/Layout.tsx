import { Outlet } from "react-router";
import TopPanel from "../components/RootLayout/TopPanel";
import LeftPanel from "../components/RootLayout/LeftPanel";
import RightPanel from "../components/RootLayout/RightPanel";
import MusicPlayerBar from "../components/Player/MusicPlayerBar";

export default function Layout() {
  return (
    <div className="flex flex-col h-dvh">
      <TopPanel />
      <section className="relative flex grow h-full overflow-hidden">
        <LeftPanel />
        <main className="basis-1/2 grow overflow-y-auto">
          <Outlet />
        </main>
        <RightPanel />
      </section>
      <MusicPlayerBar />
    </div>
  );
}
