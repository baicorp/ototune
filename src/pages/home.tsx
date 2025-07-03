import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  const [songUrl, setSongUrl] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const videoId = data.get("video-id");
    if (!videoId) return;
    try {
      setIsLoad(true);
      const url = await invoke<string>("get_audio_url", { videoId });
      setIsLoad(false);
      setSongUrl(url);
    } catch (err) {
      setIsLoad(false);
      toast.error("Failed to fetch audio" + err);
    }
  }

  return (
    <PageWrapper>
      <form onSubmit={(e) => handleSubmit(e)} className="mb-4 flex gap-2">
        <input
          type="text"
          name="video-id"
          placeholder="Enter a youtube music video id"
          className="grow outline outline-neutral-400 px-3 py-1.5 rounded-md"
        />
        <button className="px-3 py-1.5 rounded-md text-center bg-black text-white">
          Get Song Url
        </button>
      </form>
      {isLoad ? (
        <p>Loading...</p>
      ) : (
        songUrl && (
          <textarea
            value={songUrl}
            readOnly
            rows={20}
            className="w-full p-4 outline outline-neutraloutline-neutral-400 rounded-md "
          />
        )
      )}
    </PageWrapper>
  );
}
