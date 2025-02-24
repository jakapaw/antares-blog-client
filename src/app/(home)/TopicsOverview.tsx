'use client';

import Article from "@/model/article";
import clsx from "clsx";
import Link from "next/link";
import React, { use } from "react";
import { HomePageState } from "./page";

const BASE_URL = new URL(
  "/",
  process.env.CLIENT_URL || "http://localhost:3000"
);

export default function TopicsOverview({state}: {state: HomePageState}) {
  const articles = use(state.articles);

  function renderTopics() {
    const result: React.ReactNode[] = [];
    for (const [key, val] of articles) {
      result.push(
        <TopicGroup topicName={key} articles={val} />
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
    <div className="mt-4 pb-2 border-b-2 border-cobalt">
      <h1 className="p-1 font-bold text-xl">{topicName}</h1>
      <div className="p-2 flex flex-none overflow-x-scroll no-scrollbar">
        {
          articles.map((el) => {
            return (
              <Link key={el.id} href={`${BASE_URL}${el.slug}`}
                className="mr-2 flex flex-col flex-none justify-between basis-32 rounded-md shadow-md h-40 *:bg-transparent"
                style={{ backgroundImage: 'linear-gradient(#EFEFEF, white)' }}>
                <Card key={el.id} title={el.title} />
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}

function Card({
  title
}: {
  title: string
}) {
  return (
    <>
      <div
        id="cardImage"
        className="inline-block w-full basis-1/3 rounded-t-md"
        style={{
          background: 'no-repeat center/cover url("/card-image.png")',
        }}>
      </div>
      <span className={clsx('p-2 basis-1/2', title.length <= 50 ? 'text-[12px]' : 'text-[10px]')}>{title}</span>
      <div className="p-2 flex justify-between text-[8px]">
        <span>Author Name</span>
        <span>Date</span>
      </div>
    </>
  )
}
