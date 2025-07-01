// import { invoke } from "@tauri-apps/api/core";
import { NavLink } from "react-router";
import { Outlet } from "react-router";

export default function Layout() {
  function navClassName({ isActive }: { isActive: boolean }) {
    return `px-3 py-2 ${
      isActive
        ? "font-semibold text-black bg-neutral-200 rounded-md"
        : "text-neutral-700"
    }`;
  }
  return (
    <section className="flex h-dvh">
      <nav className="px-2 py-2 border-r border-neutral-200 flex flex-col gap-1 flex-3/12 shrink-0 grow-0">
        <NavLink className={navClassName} to="/">
          Home
        </NavLink>
        <NavLink className={navClassName} to="/search">
          Search
        </NavLink>
        <NavLink
          className={navClassName}
          to={`/playlist/${Math.floor(Math.random() * 100)}`}
        >
          Playlist
        </NavLink>
        <NavLink
          className={navClassName}
          to={`/album/${Math.floor(Math.random() * 100)}`}
        >
          Album
        </NavLink>
        <NavLink
          className={navClassName}
          to={`/artist/${Math.floor(Math.random() * 100)}`}
        >
          Artist
        </NavLink>
        <NavLink className={navClassName} to={`/comp-factory`}>
          Component Factory
        </NavLink>
      </nav>
      <main className="shrink-0 grow">
        <Outlet />
      </main>
    </section>
  );
}
