import useSWR from "swr";
import { useParams } from "react-router";
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
        <section className="relative">
          {artistData.thumbnail && (
            <img
              className="object-cover object-center w-full min-h-[35dvh]"
              src={artistData.thumbnail}
              alt={artistData.artistName}
            />
          )}
          <div className="bg-gradient-to-b from-transparent to-[#000] absolute inset-0"></div>
          <div className="absolute flex flex-col justify-end items-center lg:items-start inset-0 lg:px-6 xl:px-10 p-4">
            <div className="flex gap-4 items-center justify-end">
              <Avatar avatar={artistData.avatar} />
              <h1 className="font-bold text-white lg:font-black text-4xl lg:text-6xl lg:mb-2">
                {artistData.artistName}
              </h1>
            </div>
            <div className="hidden md:block w-2/3">
              <CollapsibleText>{artistData.description}</CollapsibleText>
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
