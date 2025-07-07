import { NavLink } from "react-router";

export default function LeftPanel() {
  function navClassName({ isActive }: { isActive: boolean }) {
    return `px-3 py-2 ${
      isActive
        ? "font-semibold text-black bg-neutral-200 rounded-md"
        : "text-neutral-700"
    }`;
  }

  return (
    <nav className="sticky top-0 basis-[25%] px-2 py-2 lg:px-6 lg:py-4 border-r border-neutral-300 flex flex-col gap-1 shrink-0 grow-0">
      <NavLink className={navClassName} to="/">
        Home
      </NavLink>
      <NavLink className={navClassName} to="/search">
        Search
      </NavLink>
      <NavLink
        className={navClassName}
        to={`/playlist/VLRDCLAK5uy_llCyadV53fW6qlLjiTg69hTuQsnYisJ4c`}
      >
        Playlist
      </NavLink>
      <NavLink className={navClassName} to={`/album/MPREb_zXRPSlW9mbt`}>
        Album
      </NavLink>
      <NavLink className={navClassName} to={`/artist/UCGr1UQ4CwzRMmYoQfHQQWTg`}>
        Artist
      </NavLink>
      <NavLink className={navClassName} to={`/comp-factory`}>
        Component Factory
      </NavLink>
    </nav>
  );
}
