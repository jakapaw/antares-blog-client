import { SERVER_URL } from '@/lib/config';
import Image from 'next/image';
import Article from '../../../model/article';
export default function ArticleList({ 
  articles 
}: {
  articles: Map<string, Article[]>
}) {
  return (
    <div className="">
      {
        // articles.map((el, i) => <ArticleEntry key={i} article={el}/>)
        Array.from(articles.entries()).map(([key, val], i) => <CategoryGroup key={i} articles={val} category={key} />)
      }
    </div>
  )
}

function CategoryGroup({ category, articles }: { category: string, articles: Article[] }) {
  return (
  <div className="mt-4 pb-2 border-b-2 border-cobalt">
      <h1 className="p-1 ml-2 font-bold text-xl">{category}</h1>
      {articles.map(((article, i) => <ArticleEntry key={i} article={article} />))}
    </div> 
  )
}

function ArticleEntry({
  article
}: { 
  article: Article
}) {
  return (
    <div className="m-4 p-2 text-sm rounded flex justify-between border-gray-200 border-2"
    style={{ backgroundImage: 'linear-gradient(to right, #F9F9F9 60%, white)' }}>
      <div className='flex flex-col justify-between mr-4 w-full'>
        <h1 className="font-medium text-black">{article.title}</h1>
        <div className="text-xs text-gray-400">
          <span className="">
            {
              article.authors.map((el, i) => <span key={i} className="mr-1">{el.fullname.match(/^\w+/)?.at(0)}</span>)
            }
          </span>
          <span className="mx-1"> | </span>
          <span className="ml-1">{article.updatedAt.split("T")[0]}</span>
        </div>
      </div>
      <Image 
        src={`${SERVER_URL}${article.cover_image.url}`} 
        alt={article.cover_image.alternativeText || ""} 
        width={article.cover_image.width} 
        height={article.cover_image.height}
        className="size-20 object-cover aspect-square"/>
    </div>
  )
}
