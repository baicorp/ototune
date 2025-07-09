import useSWR from "swr";
import { search } from "../utils/fetcher";
import { useSearchParams } from "react-router";
import PageWrapper from "../components/PageWrapper";
import DynamicComponent from "../components/DynamicComp";
import CategoryListLayout from "../components/CategoryListLayout";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || null;

  const { data: searchData, error, isLoading } = useSWR(query, search);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Hmm.. failed fetch data.</p>;
  return (
    <PageWrapper>
      {searchData?.map((data, index) => {
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
    </PageWrapper>
  );
}
