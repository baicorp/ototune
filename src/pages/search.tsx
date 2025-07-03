import { FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import PageWrapper from "../components/PageWrapper";
import DynamicComponent from "../components/DynamicComp";
import CategoryListLayout from "../components/CategoryListLayout";
import extractSearchData from "../utils/extractor/extractSearchData";

export default function Search() {
  const [isLoad, setIsLoad] = useState(false);
  const [searchData, setSearchData] =
    useState<ReturnType<typeof extractSearchData>>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");
    if (!query) return;
    setIsLoad(true);
    const searchData = await invoke<ReturnType<typeof extractSearchData>>(
      "search",
      { query },
    );
    const cleanData = extractSearchData(searchData);
    setSearchData(cleanData);
    setIsLoad(false);
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="query"
          placeholder="Find your favorite music"
          className="px-3 py-1.5 outline-none border border-neutral-400 rounded-md flex-1"
        />
        <button
          type="submit"
          className=" px-3 py-1.5 bg-black text-white rounded-md "
        >
          search
        </button>
      </form>
      {isLoad ? (
        <p>Loading...</p>
      ) : (
        searchData &&
        searchData.map((data, index) => {
          return (
            <section key={index}>
              <p className="font-semibold text-xl mt-4 mb-2">
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
