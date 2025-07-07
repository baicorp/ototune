import { toast } from "sonner";
import { MixContent } from "../types";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import PageWrapper from "../components/PageWrapper";
import DynamicComponent from "../components/DynamicComp";
import extractHomeData from "../utils/extractor/extractHomeData";
import CategoryListLayout from "../components/CategoryListLayout";

export default function Home() {
  const [homeData, setHomeData] = useState<MixContent[]>([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    async function getHomeData() {
      try {
        setIsLoad(true);
        let { local, global } = await invoke<any>("get_home");
        local = extractHomeData(local);
        global = extractHomeData(global);
        const homeData = [
          {
            headerTitle: "Local " + local[0].headerTitle,
            contents: local[0].contents,
          },
          {
            headerTitle: "Global " + global[0].headerTitle,
            contents: global[0].contents,
          },
        ];
        setHomeData(homeData);
        setIsLoad(false);
      } catch (e: any) {
        setIsLoad(false);
        toast.error("failed to fetch search data");
      }
    }
    getHomeData();
  }, []);

  return (
    <PageWrapper>
      {isLoad ? (
        <p>Loading...</p>
      ) : (
        homeData &&
        homeData.map((data, index) => {
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
        })
      )}
    </PageWrapper>
  );
}
