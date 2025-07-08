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
      <NavLink className={navClassName} to="/explore">
        Explore
      </NavLink>
      <NavLink className={navClassName} to={`/comp-factory`}>
        Component Factory
      </NavLink>
      <Library />
    </nav>
  );
}

function Library() {
  // TODO: fetch from local sqlite db
  const navLink = [
    {
      name: "Presenting Avenged",
      link: "/playlist/VLRDCLAK5uy_k8vey5dx6j7reeZ5Uuf4sbNVfIbgHOrYc",
    },
    {
      name: "Sad summer",
      link: "/playlist/VLRDCLAK5uy_nuMpvdFFPBATWGBB1IQEokh8u3jELKnSc",
    },
  ];

  function navClassName({ isActive }: { isActive: boolean }) {
    return `px-3 py-2 line-clamp-1 ${
      isActive
        ? "font-semibold text-black bg-neutral-200 rounded-md"
        : "text-neutral-700"
    }`;
  }
  return (
    <>
      <p className="cursor-default border-t border-neutral-300 px-3 py-2 text-neutral-500">
        Your library
      </p>
      {navLink.map((nav, index) => (
        <NavLink className={navClassName} key={index} to={nav.link}>
          {nav.name}
        </NavLink>
      ))}
    </>
  );
}
