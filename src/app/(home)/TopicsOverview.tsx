'use client';

import { CLIENT_URL, SERVER_URL } from "@/lib/config";
import { getAllArticle, groupArticlesByCategory } from "@/lib/data";
import Article from "@/model/article";
import Author from "@/model/author";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArticleList from "../../components/ArticleList";

class State {
  articles?: Map<string, Article[]>
}

function useHydrateState() {
  const [state, setState] = useState(new State());
  useEffect(() => {
    groupArticlesByCategory(getAllArticle()).then(val => {
      setState({ articles: val });
    })
  }, []);
  return state;
}

export default function TopicsOverview() {
  const state = useHydrateState();
  const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      setIsMobile(window.innerWidth < 640); 
    }, []);

  if(isMobile)
    return <ArticleCardView articles={state.articles || new Map()}/>
  else 
    return <ArticleList articles={state.articles || new Map()}/>
}

function ArticleCardView({articles}: {articles: Map<string, Article[]>}) {
  function renderTopics() {
    const result: React.ReactNode[] = [];
    for (const [key, val] of articles) {
      result.push(
        <TopicGroup key={key} topicName={key} articles={val} />
      );
    }
    return result;
  }

  return (
    <main className="flex flex-col pl-2">
      {renderTopics()}
    </main>
  );
}

function TopicGroup({
  topicName,
  articles
}: {
  topicName: string,
  articles: Article[]
}) {
  return (
    <div className="mt-4 pb-2">
      <h1 className="p-1 font-bold text-xl">{topicName}</h1>
      <div className="p-2 flex flex-none overflow-x-scroll no-scrollbar">
        {
          articles.map((el) => {
            return (
              <Link key={el.id} href={`${CLIENT_URL}/articles/${el.slug}/`}
                className="mr-3 flex flex-col flex-none justify-between basis-32 rounded-md shadow-md h-40 *:bg-transparent"
                style={{ backgroundImage: 'linear-gradient(#EFEFEF, white)' }}>
                <ArticleCard title={el.title} imageUrl={el.cover_image.url} authors={el.authors} date={el.updatedAt}/>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}

function ArticleCard({
  title,
  authors,
  date,
  imageUrl
}: {
  title: string,
  imageUrl: string,
  authors: Author[],
  date: string
}) {
  return (
    <>
      <div
        id="cardImage"
        className="inline-block w-full basis-1/3 rounded-t-md"
        style={{
          background: `no-repeat center/cover url(${SERVER_URL}${imageUrl})`,
        }}>
      </div>
      <span className={clsx('p-2 basis-1/2', title.length <= 50 ? 'text-[12px]' : 'text-[10px]')}>{title}</span>
      <div className="p-2 flex justify-between text-[8px]">
        <span>{authors[0].fullname.split(" ")[0]}</span>
        <span>{date.split("T")[0]}</span>
      </div>
    </>
  )
}