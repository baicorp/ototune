import { toast } from "sonner";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useSearchParams } from "react-router";
import PageWrapper from "../components/PageWrapper";
import DynamicComponent from "../components/DynamicComp";
import CategoryListLayout from "../components/CategoryListLayout";
import extractSearchData from "../utils/extractor/extractSearchData";

type SearchDataType = ReturnType<typeof extractSearchData>;

export default function Search() {
  const [searchParams] = useSearchParams();
  const [isLoad, setIsLoad] = useState(false);
  const [searchData, setSearchData] = useState<SearchDataType>([]);

  useEffect(() => {
    const query = searchParams.get("q");
    if (!query?.trim()) return;

    async function getSearchData(query: string) {
      try {
        setIsLoad(true);
        const searchData = await invoke<SearchDataType>("search", { query });
        const cleanData = extractSearchData(searchData);
        setSearchData(cleanData);
        setIsLoad(false);
      } catch (e: any) {
        setIsLoad(false);
        toast.error("failed to fetch search data");
      }
    }

    getSearchData(query);
  }, [searchParams]);

  return (
    <PageWrapper>
      {isLoad ? (
        <p>Loading...</p>
      ) : (
        searchData &&
        searchData.map((data, index) => {
          return (
            <section key={index}>
              <p
                className={`font-semibold text-xl ${index !== 0 && "mt-4"} mb-2`}
              >
                {data.headerTitle}
              </p>
              <CategoryListLayout category={data.headerTitle}>
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
        })
      )}
    </PageWrapper>
  );
}
