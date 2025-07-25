import DynamicComponent from "../DynamicComp";
import useDebounce from "../../hooks/useDebounce";
import { FormEvent, useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { getSearchSuggestion } from "../../utils/fetcher";
import { useSearchParams, useLocation, useNavigate } from "react-router";
import extractSearchSuggestion from "../../utils/extractor/extractSearchSuggestion";

export default function TopPanel() {
  return (
    <section
      className="bg-themed-card flex justify-center items-center cursor-default"
      onMouseDown={async (e) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('[data-interactive="true"]');

        // Prevent dragging when clicking on interactive elements
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
  const [isFocus, setIsFocus] = useState(false);

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
    <div className="grow relative" data-interactive="true">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 bg-themed-bg rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-themed-text-muted">
          <input
            id="query"
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Find your favorite music"
            onFocus={() => {
              setIsFocus(true);
            }}
            // TODO : find the right way to close the suggestion panel
            onBlur={() => {
              setTimeout(() => {
                setIsFocus(false);
              }, 250);
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow pl-4 pr-2 py-1 outline-none bg-transparent"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-8 aspect-square fill-themed-text-muted pr-4"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
          </button>
        </div>
      </form>
      {isFocus && <SearchSuggestion query={query} />}
    </div>
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
    <div className="flex" data-interactive="true">
      <button onClick={goBack} disabled={!canGoBack} className="w-9 px-2 py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className={`${
            canGoBack ? "fill-themed-text" : "fill-themed-text-muted"
          }`}
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </button>
      <button
        onClick={goForward}
        disabled={!canGoForward}
        className="w-9 px-2 py-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className={`${
            canGoForward ? "fill-themed-text" : "fill-themed-text-muted"
          }`}
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
    <div className="flex items-center h-full" data-interactive="true">
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

function SearchSuggestion({ query }: { query: string }) {
  const [suggestion, setSuggestion] = useState<
    ReturnType<typeof extractSearchSuggestion>
  >([]);
  const [isLoading, setIsloading] = useState(false);
  const [_, setError] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    async function getSuggestion() {
      if (debouncedQuery.trim().length === 0) return;
      try {
        setIsloading(true);
        const data = await getSearchSuggestion(debouncedQuery);
        setSuggestion(data);
        setError("");
      } catch (e) {
        setError("Failed to get data");
      } finally {
        setIsloading(false);
      }
    }
    getSuggestion();
  }, [debouncedQuery]);

  return (
    <div
      className="absolute top-full mt-2 shadow shadow-themed-card flex flex-col gap-2 p-2.5 w-full h-96 z-20 border-2 border-themed-text-muted rounded-lg overflow-y-auto bg-themed-bg"
      data-interactive="true"
    >
      {isLoading ? (
        <p className="p-2 text-sm text-muted">Loading...</p>
      ) : (
        suggestion.map((data) => (
          <DynamicComponent
            key={data.id}
            type={data.type}
            props={data}
            variant="small"
          />
        ))
      )}
    </div>
  );
}
