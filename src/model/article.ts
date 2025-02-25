import Author from "./author"
import Category from "./category"
import Media from "./media"
import Metadata from "./metadata"

export default interface Article {
  id: number,
  title: string,
  cover_image: Media,
  category: Category,
  content_summary: string,
  content: string,
  tags: Array<{tag: string}>,
  metadata: Array<Metadata["SEO"]>,
  slug: string,
  authors: Array<Author>,
  updatedAt: string
}