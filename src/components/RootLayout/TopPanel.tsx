import { FormEvent, useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useSearchParams, useLocation, useNavigate } from "react-router";

export default function TopPanel() {
  console.log("rerender");
  return (
    <section
      className="bg-themed-card flex justify-center items-center cursor-default"
      onMouseDown={async (e) => {
        const target = e.target as HTMLElement;
        const tag = target.tagName.toLowerCase();

        // Prevent dragging when clicking on interactive elements
        const isInteractive = ["button", "svg", "path"].includes(tag);
        if (!isInteractive) {
          getCurrentWindow().startDragging();
        }
      }}
    >
      <div className="flex gap-3 p-1 basis-1/2">
        <NavigationHistory />
        <SearchBar />
      </div>
      <div className="absolute right-0 flex gap-2.5 h-11 pr-2">
        <WindowActionButton type="minimize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#e3e3e3"
            className="w-full"
          >
            <path d="M240-120v-80h480v80H240Z" />
          </svg>
        </WindowActionButton>
        <WindowActionButton type="toggleMaximize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#e3e3e3"
            className="w-full"
          >
            <path d="M200-200v-560h560v560H200Zm80-80h400v-400H280v400Z" />
          </svg>
        </WindowActionButton>
        <WindowActionButton type="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#e3e3e3"
            className="w-full"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </WindowActionButton>
      </div>
    </section>
  );
}

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form className="flex gap-2 grow" onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Find your favorite music"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-1.5 focus:outline focus:outline-themed-text bg-themed-bg rounded-md flex-1"
      />
    </form>
  );
}

function NavigationHistory() {
  const navigate = useNavigate();
  const location = useLocation();

  const [historyStack, setHistoryStack] = useState<string[]>([location.key]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const idx = historyStack.indexOf(location.key);
    if (idx === -1) {
      // put new page historyStack right after current page historyStack.
      const newStack = [
        ...historyStack.slice(0, currentIndex + 1),
        location.key,
      ];
      setHistoryStack(newStack);
      setCurrentIndex(newStack.length - 1);
    } else {
      setCurrentIndex(idx);
    }
  }, [location]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < historyStack.length - 1;

  const goBack = () => canGoBack && navigate(-1);
  const goForward = () => canGoForward && navigate(1);

  return (
    <div className="flex">
      <button onClick={goBack} disabled={!canGoBack} className="w-9 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className={`${canGoBack ? "fill-themed-text" : "fill-themed-text-muted"}`}
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </button>
      <button onClick={goForward} disabled={!canGoForward} className="w-9 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className={`${canGoForward ? "fill-themed-text" : "fill-themed-text-muted"}`}
        >
          <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
        </svg>
      </button>
    </div>
  );
}

function WindowActionButton({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "toggleMaximize" | "minimize" | "close";
}) {
  async function minimize() {
    await getCurrentWindow().minimize();
  }
  async function toggleMaximize() {
    await getCurrentWindow().toggleMaximize();
  }
  async function close() {
    await getCurrentWindow().close();
  }

  return (
    <div className="flex items-center h-full">
      <button
        className="w-6 aspect-square p-1.5 bg-neutral-700 rounded-full flex justify-center items-center"
        onClick={(e) => {
          e.preventDefault();
          const actions = {
            close,
            toggleMaximize,
            minimize,
          };
          actions[type]?.();
        }}
      >
        {children}
      </button>
    </div>
  );
}
