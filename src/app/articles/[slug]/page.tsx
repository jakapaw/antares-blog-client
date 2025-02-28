'use client';

import FooterPrimary from "@/components/FooterPrimary";
import { SERVER_URL } from "@/lib/config";
import { getArticle } from "@/lib/data";
import Article from "@/model/article";
import Author from "@/model/author";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthorInfo from "./AuthorInfo";
import HeaderSecondary from "./HeaderSecondary";
import "./style.css";

class ArticlePageState {
  article?: Article;
  authors?: Array<Author>;
  error?: Error;

  constructor() {
    this.article = this.authors = this.error = undefined;
  }
}

function hydrateState(slug: string) {
  const state = new ArticlePageState();
  return getArticle(slug)
    .then((article) => {
      state.article = article;
      state.authors = article.authors;
      return state;
    })
    .catch((error) => {
      state.error = error;
      return state;
    });
}

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const [state, setState] = useState(new ArticlePageState());

  if (slug == "") {
    router.push("/");
  }

  useEffect(() => {
    hydrateState(slug).then((newState) => {
      console.log(newState);
      setState(newState);
    });
  }, [slug]);

  // TODO: show 500 modal if error happen
  if (state.error) {
    return (<div>Server Error</div>);
  } else if (!state.article) {
    // router.push('/404');
    return (<div></div>);
  }

  return (
    <>
      <HeaderSecondary />
      <main className="flex flex-col gap-1 p-4">
        <h1 className="text-2xl font-bold">{state.article?.title}</h1>
        <div className="text-xs">
          <Image 
            src={`${SERVER_URL}${state.article.cover_image.url}` || ""} 
            alt={state.article?.cover_image.alternativeText || ""} 
            width={state.article.cover_image.width}
            height={state.article.cover_image.height}
            className="w-full pt-4 mb-2 h-60 object-cover" />
          <span>{state.article?.authors.map((el) => el.fullname).join(" & ")}</span>
          <span className="inline-block w-4"></span>
          <span>{state.article?.updatedAt.split("T").at(0)}</span>
        </div>
        <div className="pt-2">
          <span className="text-sm">Tags: </span>
            { state.article?.tags.map((el, i) =>
              <span key={i} className="bg-secondary mr-1 text-xs p-1 rounded border-b-2 border-yellow-500 active:border-0">
                { "#" + el.tag }
              </span>
            )}
        </div>
        <div>
          <hr className="border-2 mt-4" />
          {state.article.content_summary != null ? 
          <>
            <h1>Summary</h1>
            <Markdown id="summary">
              {state.article?.content_summary || ""}
            </Markdown>
            <hr className="border-2 mt-4 mb-2" />
          </>
          : <></>}
          <Markdown id="article">
            {state.article?.content || ""}
          </Markdown>
        </div>
      </main>
      <AuthorInfo authors={state.authors || []} />
      <FooterPrimary />
    </>
  );
}