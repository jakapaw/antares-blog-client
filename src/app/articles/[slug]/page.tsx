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
import HeaderSecondary from "../../../components/HeaderSecondary";
import AuthorInfo from "./AuthorInfo";
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
  const state: ArticlePageState = {};
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
    hydrateState(slug).then((newState) => setState(newState));
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
      <main className="flex flex-col gap-1 p-4 md:mx-auto md:w-[75%] xl:w-[60%] font-[Nunito]">
        <h1 className="font-bold leading-10 text-[24px] md:text-[40px] md:mt-5">{state.article?.title}</h1>
        <div className="md:my-5">
          <Image 
            src={`${SERVER_URL}${state.article.cover_image.url}` || ""} 
            alt={state.article?.cover_image.alternativeText || ""} 
            width={state.article.cover_image.width}
            height={state.article.cover_image.height}
            className="w-full pt-4 mb-2 h-60 object-cover md:h-[500px]" />
          <div className="flex justify-between py-2">
            <span className="text-xs md:text-base">{state.article?.authors.map((el, i) => <span key={i}>{el.fullname}<br/></span>)}</span>
            <span className="text-xs md:text-base">{state.article?.updatedAt.split("T").at(0)}</span>
          </div>
          <div>
            <span className="mr-3 text-xs md:text-base">Tags: </span> 
            { state.article?.tags.map((el, i) =>
              <span key={i} className="bg-yellow-300 mr-1 md:mr-2 text-xs md:text-base px-2 py-1 rounded border-b-2 border-yellow-500 active:border-0">
                { "#" + el.tag }
              </span>
            )}
        </div>
        </div>
        <div>
          {state.article.content_summary || state.article.content_summary != "" ? 
          <div id="summary">
            <hr className="border-2 mt-2" />
            <h1>Summary</h1>
            <Markdown>
              {state.article?.content_summary || ""}
            </Markdown>
            <hr className="border-2 mt-4 mb-5 md:mb-10" />
          </div>
          : <></>}
          <Markdown id="article">
            {state.article?.content || ""}
          </Markdown>
        </div>
        <div className="px-[1rem] mt-5 md:mt-10">
          <h1 className="font-bold text-xl md:text-3xl mb-4">About Author</h1>
          <div className="md:flex">
            <AuthorInfo authors={state.authors || []} />
          </div>
        </div>
      </main>
      <FooterPrimary />
    </>
  );
}