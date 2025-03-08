"use client";

import { CLIENT_URL } from '@/lib/config';
import { groupArticlesByCategory, searchArticle } from '@/lib/data';
import Article from "@/model/article";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArticleList from '../../../components/ArticleList';

class SearchPageState {
  search?: string;
  articles?: Map<string, Article[]>;
  error?: Error;
}

function hydrateState(key: string) {
  const newState: SearchPageState = {};
  return groupArticlesByCategory(searchArticle(key || ""))
    .then(articles => {
      newState.articles = articles;
      return newState;
    })
    .catch(error => {
      newState.error = error;
      return newState;
    });
}

export default function SearchResult({ search }: { search: string }) {
  const router = useRouter();
  const [state, setState] = useState(new SearchPageState());

  useEffect(() => {
    if (search == "" || !search) {
      router.replace(`${CLIENT_URL}/`);
    }
    hydrateState(search!).then(newState => {
      setState(newState);
    });
  }, [search]);

  if (state.error) {
    return (<div>Server Error</div>);
  }

  return (
    <ArticleList articles={state.articles || new Map()} />
  )
}