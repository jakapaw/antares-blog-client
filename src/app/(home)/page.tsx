"use client";
import { getAllArticle, getAllCategory, groupArticlesByCategory } from "@/lib/data";
import Article from "@/model/article";
import Category from "@/model/category";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import FooterPrimary from "../../components/FooterPrimary";
import HeaderPrimary from "../../components/HeaderPrimary";
import TopicsOverview from "./TopicsOverview";
import ArticleList from "./search/ArticleList";
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
  const isMobile = useRef(false);

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
    isMobile.current = window.innerWidth < 640;
  }, [search]);

  function showArticles() {
    if (isMobile.current) {
      return <TopicsOverview articles={state.articles || new Map()}/>
    } else {
      return (
      <div className="w-2/3 self-center">
        <ArticleList articles={state.articles || new Map()}/>
      </div>
      );
    }
  }

  function showSearchResult() {
    if (isMobile) {
      return <SearchResult search={search} />
    } else {
      return (
      <div className="w-2/3 self-center">
        <SearchResult search={search} />
      </div>
      );
    }
  }

  return (
    <div className="flex flex-col h-svh">
      <HeaderPrimary categories={state.categories || []} onSearch={handleSearch}/>
      { !search || search === ""
        ? showArticles()
        : showSearchResult()
      }
      <div className="w-full mt-auto">
        <FooterPrimary />
      </div>
    </div>
  );
}
