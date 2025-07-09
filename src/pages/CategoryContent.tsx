import useSWR from "swr";
import { useParams } from "react-router";
import PageWrapper from "../components/PageWrapper";
import { moodsGenresCategory } from "../utils/fetcher";
import DynamicComponent from "../components/DynamicComp";
import CategoryListLayout from "../components/CategoryListLayout";

export default function CategoryContent() {
  const { params } = useParams();
  const {
    data: categoryContentData,
    error,
    isLoading,
  } = useSWR(params, moodsGenresCategory);

  if (isLoading) return <p>loading...</p>;

  if (error) return <p>failed to fetch data.</p>;
  return (
    <PageWrapper>
      {categoryContentData?.map((data, index) => (
        <section key={index}>
          <p className={`font-semibold text-xl ${index !== 0 && "mt-4"} mb-2`}>
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
      ))}
    </PageWrapper>
  );
}
