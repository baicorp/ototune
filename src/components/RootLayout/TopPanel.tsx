import { FormEvent, useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router";

export default function TopPanel() {
  return (
    <div className="flex gap-3 p-1.5 basis-1/2">
      <NavigationHistory />
      <SearchBar />
    </div>
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
        className="px-4 py-1 focus:outline focus:outline-themed-text bg-themed-bg rounded-md flex-1"
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
    <div className="flex gap-1">
      <button onClick={goBack} disabled={!canGoBack} className="px-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className={`${canGoBack ? "fill-themed-text" : "fill-themed-text-muted"}`}
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </button>
      <button
        onClick={goForward}
        disabled={!canGoForward}
        className="px-1.5 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className={`${canGoForward ? "fill-themed-text" : "fill-themed-text-muted"}`}
        >
          <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
        </svg>
      </button>
    </div>
  );
}
