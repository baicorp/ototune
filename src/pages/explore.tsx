import { toast } from "sonner";
import { Link } from "react-router";
import { MixContent } from "../types";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useSearchParams } from "react-router";
import PageWrapper from "../components/PageWrapper";
import DynamicComponent from "../components/DynamicComp";
import CategoryListLayout from "../components/CategoryListLayout";
import extractMoodsGnereCategory from "../utils/extractor/extractMooodsGenres";
import extractExploreData, {
  ContentsExploreType,
  ExploreType,
} from "../utils/extractor/extractExplore";

export default function Explore() {
  const [searcParams] = useSearchParams();
  const [isLoad, setIsLoad] = useState(false);
  const [moodsAndGenresList, setMoodsAndGenresList] = useState<ExploreType[]>(
    [],
  );
  const [moodsAndGenresContent, setMoodsAndGenresContent] = useState<
    MixContent[]
  >([]);

  useEffect(() => {
    async function explore() {
      try {
        setIsLoad(true);
        const rawExploreData = await invoke<ExploreType>("explore");
        const cleanData = extractExploreData(rawExploreData);
        setMoodsAndGenresList(cleanData);
        setIsLoad(false);
      } catch (e: any) {
        setIsLoad(false);
        toast.error("failed to fetch search data");
      }
    }

    async function exploreCategory(params: string) {
      try {
        setIsLoad(true);
        const rawExploreData = await invoke<any>("moods_genre_category", {
          params,
        });
        const cleanData = extractMoodsGnereCategory(rawExploreData);
        setMoodsAndGenresContent(cleanData);
        setIsLoad(false);
      } catch (e: any) {
        setIsLoad(false);
        toast.error("failed to fetch search data");
      }
    }

    const params = searcParams.get("params");
    if (!params) {
      explore();
      setMoodsAndGenresContent([]);
    } else {
      exploreCategory(params);
      setMoodsAndGenresList([]);
    }
  }, [searcParams]);

  if (isLoad) return <p>Loading...</p>;

  console.log(moodsAndGenresContent);

  return (
    <PageWrapper>
      {moodsAndGenresList.length !== 0 && (
        <MoodsGenresListContent moodsAndGenresList={moodsAndGenresList} />
      )}
      {moodsAndGenresContent.length !== 0 && (
        <MoodsGenresCategoryContent
          moodsAndGenresContent={moodsAndGenresContent}
        />
      )}
    </PageWrapper>
  );
}

function MoodsGenresItem({ color, title, params }: ContentsExploreType) {
  return (
    <Link to={`/explore?params=${params}`}>
      <div className="flex gap-3 rounded-md overflow-hidden bg-neutral-100">
        <div className="w-2 py-2" style={{ background: color }}></div>
        <p className="py-2">{title}</p>
      </div>
    </Link>
  );
}

function MoodsGenresListContent({
  moodsAndGenresList,
}: {
  moodsAndGenresList: ExploreType[];
}) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-3">Explore</h1>
      {moodsAndGenresList.map((data, index) => (
        <section key={index}>
          <p
            className={`font-semibold text-xl ${
              index !== 0 ? "mt-4" : ""
            } mb-2`}
          >
            {data.headerTitle}
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {data.contents.map((content, i) => (
              <MoodsGenresItem key={i} {...content} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function MoodsGenresCategoryContent({
  moodsAndGenresContent,
}: {
  moodsAndGenresContent: MixContent[];
}) {
  return (
    <>
      {moodsAndGenresContent.map((data, index) => {
        return (
          <section key={index}>
            <p
              className={`font-semibold text-xl ${index !== 0 && "mt-4"} mb-2`}
            >
              {data.headerTitle}
            </p>
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
    </>
  );
}
