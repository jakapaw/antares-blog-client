export default interface Metadata {
  SEO: {
    __component: string,
    id: number,
    metaTitle: string,
    metaDescription: string,
    keywords?: string,
    metaRobots?: string,
    metaViewport?: string,
    canonicalURL?: string,
    structuredData?: unknown
  }
}