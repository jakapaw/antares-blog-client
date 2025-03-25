import ArticleList from "@/components/ArticleList"
import FooterPrimary from "@/components/FooterPrimary"
import HeaderPrimary from "@/components/HeaderPrimary"
import { getArticlesByCategory } from "@/lib/data"
import Article from "@/model/article"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"

export default async function CategoryPage({ params }: { params: { path: string } }) {
  const category = await getArticlesByCategory(params.path)
    .catch(e => {
      if (typeof e == typeof notFound) {
        redirect("404");
      }
    });
  const articles: Map<string, Article[]> = new Map();
  articles.set(category!.name, category!.articles!);
  return (
    <div className="flex flex-col h-svh">
      <HeaderPrimary />
      <Suspense><ArticleList articles={articles} /></Suspense>
      <div className="w-full mt-auto">
        <FooterPrimary />
      </div>
    </div>
  )
}