import DynamicComponent from "../DynamicComp";
import useDebounce from "../../hooks/useDebounce";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { getSearchSuggestion } from "../../utils/fetcher";
import { FormEvent, useEffect, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;
    inputRef.current?.blur();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="grow relative" data-interactive="true">
      <form
        onSubmit={handleSubmit}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setTimeout(() => setIsFocus(false), 250);
        }}
      >
        <div className="flex items-center gap-2 bg-themed-bg rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-themed-text-muted">
          <input
            ref={inputRef}
            id="query"
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Find your favorite music"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow pl-4 pr-2 py-1 outline-none bg-transparent"
          />
          <button type="submit">{/* SVG here */}</button>
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
      if (debouncedQuery.trim().length === 0) {
        setSuggestion([]);
        return;
      }
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

  if (suggestion.length === 0) return <div></div>;

  return (
    <div
      className="absolute top-full mt-2 shadow shadow-themed-card flex flex-col gap-2 p-2.5 w-full h-96 z-20 border-2 border-themed-text-muted rounded-lg overflow-y-auto bg-themed-bg"
      data-interactive="true"
    >
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <svg
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
            className="w-10"
          >
            <path
              fill="#fff"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
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
