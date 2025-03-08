import { Suspense } from "react";
import FooterPrimary from "../../components/FooterPrimary";
import HeaderPrimary from "../../components/HeaderPrimary";
import ArticleChoice from "./ArticleChoice";

export default async function HomePage() {
  return (
    <div className="flex flex-col h-svh">
      <HeaderPrimary/>
      <Suspense><ArticleChoice /></Suspense>
      <div className="w-full mt-auto">
        <FooterPrimary />
      </div>
    </div>
  );
}
