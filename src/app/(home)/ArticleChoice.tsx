"use client";
import { useSearchParams } from "next/navigation";
import SearchResult from "./search/SearchResult";
import TopicsOverview from "./TopicsOverview";

export default function ArticleChoice() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  if (search)
    return <SearchResult search={search} />
  return <TopicsOverview />
}
