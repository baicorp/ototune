import useSWR from "swr";
import { useParams } from "react-router";
import usePlayer from "../hooks/usePlayer";
import { getArtist } from "../utils/fetcher";
import DynamicComponent from "../components/DynamicComp";
import CollapsibleText from "../components/CollapsibleText";
import CategoryListLayout from "../components/CategoryListLayout";

export default function Artist() {
  const { id } = useParams();
  const { data: artistData, error, isLoading } = useSWR(id, getArtist);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Hmm.. failed fetch data.</p>;
  return (
    <div className="flex flex-col h-full overflow-y-scroll">
      {artistData && (
        <section
          className="grow bg-center bg-cover"
          style={{
            backgroundImage: `url(${artistData.thumbnail})`,
          }}
        >
          <div className="bg-gradient-to-b from-transparent to-themed-bg flex flex-col pt-32">
            <div className="px-4 py-6 flex flex-col gap-2 lg:gap-4 lg:p-8">
              <div className="flex gap-4 items-center">
                <Avatar avatar={artistData.avatar} />
                <h1 className="font-bold lg:font-black text-4xl lg:text-6xl">
                  {artistData.artistName}
                </h1>
              </div>
              {artistData.stat && <p>{artistData?.stat}</p>}
              <div className="w-2/3 cursor-pointer">
                <CollapsibleText>{artistData.description}</CollapsibleText>
              </div>
              {(artistData.radio.videoId || artistData.suffle.videoId) && (
                <div className="flex gap-2 mt-1">
                  <StartButton
                    id={artistData.suffle.videoId}
                    listId={artistData.suffle.listId}
                    type="suffle"
                  />
                  <StartButton
                    id={artistData.radio.videoId}
                    listId={artistData.radio.listId}
                    type="radio"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {artistData &&
        artistData.contents.map((data, index) => {
          return (
            <section key={index} className="p-4">
              <p className="font-semibold text-xl mb-2">{data.headerTitle}</p>
              <CategoryListLayout category={data.contents[0].type}>
                {data.contents.map((content, index) => {
                  return (
                    <DynamicComponent
                      key={index}
                      type={content.type}
                      props={content}
                    />
                  );
                })}
              </CategoryListLayout>
            </section>
          );
        })}
    </div>
  );
}

function Avatar({ avatar }: { avatar: string | undefined }) {
  if (!avatar) return "";
  return (
    <img
      className="object-cover object-center rounded-full w-32 h-32 md:w-48 md:h-48"
      src={avatar}
      alt={"avatar"}
      width={226}
      height={226}
    />
  );
}

function StartButton({
  type,
  id,
  listId,
}: {
  type: "suffle" | "radio";
  id: string;
  listId: string;
}) {
  const { setTrackFromButton } = usePlayer();
  return (
    <button
      onClick={() => {
        setTrackFromButton(id, listId);
      }}
      className="bg-white hover:bg-white/95 text-themed-bg rounded-full font-semibold px-7 py-2 flex justify-center items-center gap-2.5"
    >
      {type === "radio" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          className="w-6 aspect-square"
        >
          <path d="M10.5 14.41V9.6l4.17 2.4-4.17 2.41zM8.48 8.45l-.71-.7C6.68 8.83 6 10.34 6 12s.68 3.17 1.77 4.25l.71-.71C7.57 14.64 7 13.39 7 12s.57-2.64 1.48-3.55zm7.75-.7-.71.71c.91.9 1.48 2.15 1.48 3.54s-.57 2.64-1.48 3.55l.71.71C17.32 15.17 18 13.66 18 12s-.68-3.17-1.77-4.25zM5.65 5.63l-.7-.71C3.13 6.73 2 9.24 2 12s1.13 5.27 2.95 7.08l.71-.71C4.02 16.74 3 14.49 3 12s1.02-4.74 2.65-6.37zm13.4-.71-.71.71C19.98 7.26 21 9.51 21 12s-1.02 4.74-2.65 6.37l.71.71C20.87 17.27 22 14.76 22 12s-1.13-5.27-2.95-7.08z"></path>
        </svg>
      )}
      {type === "suffle" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          className="w-6 aspect-square"
        >
          <path d="M18.15 13.65 22 17.5l-3.85 3.85-.71-.71L20.09 18H19c-2.84 0-5.53-1.23-7.39-3.38l.76-.65C14.03 15.89 16.45 17 19 17h1.09l-2.65-2.65.71-.7zM19 7h1.09l-2.65 2.65.71.71L22 6.51l-3.85-3.85-.71.71L20.09 6H19c-3.58 0-6.86 1.95-8.57 5.09l-.73 1.34C8.16 15.25 5.21 17 2 17v1c3.58 0 6.86-1.95 8.57-5.09l.73-1.34C12.84 8.75 15.79 7 19 7zM8.59 9.98l.75-.66C7.49 7.21 4.81 6 2 6v1c2.52 0 4.92 1.09 6.59 2.98z"></path>
        </svg>
      )}
      <span>{type === "radio" ? "Radio" : "Suffle"}</span>
    </button>
  );
}
