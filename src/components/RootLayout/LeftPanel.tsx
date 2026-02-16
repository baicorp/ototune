import { NavLink } from "react-router";
import { useLayout } from "../../hooks/useLayout";

export default function LeftPanel() {
  return (
    <Nav>
      <NavigationLink href="/" title="Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="fill-current p-3"
        >
          <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
        </svg>
      </NavigationLink>
      <NavigationLink href="/explore" title="Explore">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="fill-current p-3"
        >
          <path d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
        </svg>
      </NavigationLink>
    </Nav>
  );
}

function Nav({ children }: { children: React.ReactNode }) {
  const { isLeftPanelOpen } = useLayout();

  return (
    <nav
      className={`${isLeftPanelOpen ? "md:w-52 lg:w-64 xl:w-72" : "w-fit"} ] sticky top-0 p-2 lg:p-3 border-r border-themed-border flex flex-col shrink-0 grow-0`}
    >
      {children}
    </nav>
  );
}

function NavigationLink({
  href,
  title,
  thumbnail,
  description,
  children,
}: {
  href: string;
  title: string;
  thumbnail?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const { isLeftPanelOpen } = useLayout();

  return (
    <NavLink
      className={({ isActive }) => {
        return `flex gap-4 items-center ${isActive && "rounded-md bg-themed-card"}`;
      }}
      to={href}
    >
      <div className="w-13 shrink-0 aspect-square rounded-md overflow-hidden flex justify-center items-center">
        {children}
        {thumbnail && <img src={thumbnail} />}
      </div>
      <div className={`${isLeftPanelOpen ? "hidden md:block" : "hidden"}`}>
        <span className="line-clamp-1 mb-1">{title}</span>
        {description && (
          <span className="text-themed-text-muted line-clamp-1">
            {description}
          </span>
        )}
      </div>
    </NavLink>
  );
}
