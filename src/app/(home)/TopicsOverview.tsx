'use client';

import { CLIENT_URL, SERVER_URL } from "@/lib/config";
import Article from "@/model/article";
import Author from "@/model/author";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export default function TopicsOverview({articles}: {articles: Map<string, Article[]>}) {
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