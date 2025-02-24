import Category from "./category"
import Metadata from "./metadata"

export default interface Article {
  id: number,
  title: string,
  cover_image: string,
  category: Category,
  content_summary: string,
  content: string,
  tags: Array<{tag: string}>,
  metadata: Array<Metadata["SEO"]>,
  slug: string
}