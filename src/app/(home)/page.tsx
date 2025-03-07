"use client";
import { getAllArticle, getAllCategory, groupArticlesByCategory } from "@/lib/data";
import Article from "@/model/article";
import Category from "@/model/category";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FooterPrimary from "../../components/FooterPrimary";
import HeaderPrimary from "../../components/HeaderPrimary";
import TopicsOverview from "./TopicsOverview";
import SearchResult from "./search/SearchResult";

class HomePageState {
  articles?: Map<string, Article[]>;
  categories?: Category[];
}

export default function HomePage() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  )
}

function Home() {
  const searchParams = useSearchParams();
  const [state, setState] = useState(new HomePageState());
  const [search, setSearch] = useState(searchParams.get("search") || "");

  function handleSearch(search: string) {
    setSearch(search);
  }

  useEffect(() => {
    const newState = { ...state };
    const prom1 = groupArticlesByCategory(getAllArticle()).then((val) => {
      newState.articles = val;
    });
    const prom2 = getAllCategory().then((val) => {
      newState.categories = val;
    })
    Promise.all([prom1, prom2]).then(() => {
      setState(newState);
    });
  }, []);

  return (
    <div className="flex flex-col h-svh">
      <HeaderPrimary categories={state.categories || []} onSearch={handleSearch}/>
      { !search || search === ""
        ? <TopicsOverview articles={state.articles || new Map()}/>
        : <SearchResult search={search}/>
      }
      <div className="w-full mt-auto">
        <FooterPrimary />
      </div>
    </div>
  );
}
