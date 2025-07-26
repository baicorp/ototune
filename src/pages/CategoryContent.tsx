import useSWR from "swr";
import { useParams } from "react-router";
import PageWrapper from "../components/PageWrapper";
import { moodsGenresCategory } from "../utils/fetcher";
import DynamicComponent from "../components/DynamicComp";
import CategoryListLayout from "../components/CategoryListLayout";
import MixContentLoad from "../components/Loading/MixContentLoad";

export default function CategoryContent() {
  const { params } = useParams();
  const {
    data: categoryContentData,
    error,
    isLoading,
  } = useSWR(params, moodsGenresCategory);

  if (isLoading) return <MixContentLoad />;

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
