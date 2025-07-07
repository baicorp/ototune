import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import { FormEvent, useEffect, useState } from "react";

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
        className="px-3 py-1.5 outline-none border border-neutral-300 rounded-full flex-1"
      />
    </form>
  );
}

function NavigationHistory() {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const updateNavState = () => {
    const idx = window.history.state?.idx ?? 0;
    const total = window.history.length;
    setCanGoBack(idx > 0);
    setCanGoForward(idx < total - 1);
  };

  useEffect(() => {
    if (window.history.state?.idx == null) {
      window.history.replaceState({ idx: 0 }, "", window.location.href);
    }

    updateNavState();

    const onPopState = () => updateNavState();
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const goBack = () => canGoBack && window.history.back();
  const goForward = () => canGoForward && window.history.forward();

  return (
    <div className="flex gap-1">
      <button
        onClick={goBack}
        disabled={!canGoBack}
        className="px-1.5 bg-black/25 hover:bg-black/35 rounded-full disabled:bg-black/10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </button>
      <button
        onClick={goForward}
        disabled={!canGoForward}
        className="px-1.5 bg-black/25 hover:bg-black/35 rounded-full disabled:bg-black/10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
        </svg>
      </button>
    </div>
  );
}
