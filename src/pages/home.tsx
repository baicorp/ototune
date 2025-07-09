import useSWR from "swr";
import { home } from "../utils/fetcher";
import PageWrapper from "../components/PageWrapper";
import DynamicComponent from "../components/DynamicComp";
import CategoryListLayout from "../components/CategoryListLayout";

export default function Home() {
  const { data: homeData, error, isLoading } = useSWR("home-page", home);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>failed to fetch data.</p>;
  return (
    <PageWrapper>
      {homeData?.map((data, index) => {
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
