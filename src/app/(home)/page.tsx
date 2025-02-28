import { getAllCategory, getArticlesGroupByCategory } from "@/lib/data";
import Article from "@/model/article";
import Category from "@/model/category";
import { Suspense } from "react";
import FooterPrimary from "../../components/FooterPrimary";
import HeaderPrimary from "./HeaderPrimary";
import TopicsOverview from "./TopicsOverview";

export type HomePageState = {
  articles: Promise<Map<string, Article[]>>,
  categories: Promise<Category[]>
}

export default function HomePage() {
  const state: HomePageState = {
    articles: getArticlesGroupByCategory(),
    categories: getAllCategory()
  }

  return (
    <div>
      <Suspense fallback={<div></div>}>
        <HeaderPrimary state={state}/>
      </Suspense>
      <Suspense fallback={<div></div>}>
        <TopicsOverview state={state}/>
      </Suspense>
      <div className="absolute bottom-0 w-full">
        <FooterPrimary />
      </div>
    </div>
  );
}
