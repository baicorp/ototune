import useSWR from "swr";
import { Link } from "react-router";
import { explore } from "../utils/fetcher";
import PageWrapper from "../components/PageWrapper";
import { ContentsExploreType } from "../utils/extractor/extractExplore";

export default function Explore() {
  const {
    data: moodsAndGenresList,
    error,
    isLoading,
  } = useSWR("explore", explore);

  if (isLoading) return <p>loading...</p>;

  if (error) return <p>failed to fetch data.</p>;
  return (
    <PageWrapper>
      <h1 className="font-bold text-2xl mb-3">Explore</h1>
      {moodsAndGenresList?.map((data, index) => (
        <section key={index}>
          <p
            className={`font-semibold text-xl ${
              index !== 0 ? "mt-4" : ""
            } mb-2`}
          >
            {data.headerTitle}
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {data.contents.map((content, index) => (
              <MoodsGenresItem key={index} {...content} />
            ))}
          </div>
        </section>
      ))}
    </PageWrapper>
  );
}

function MoodsGenresItem({ color, title, params }: ContentsExploreType) {
  return (
    <Link to={`/explore/${params}`}>
      <div className="flex gap-3 rounded-md overflow-hidden bg-neutral-100">
        <div className="w-2 py-2" style={{ background: color }}></div>
        <p className="py-2">{title}</p>
      </div>
    </Link>
  );
}
