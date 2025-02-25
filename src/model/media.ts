export default interface Media {
  id: 1,
  documentId: string,
  name?: string,
  alternativeText?: string,
  caption?: string,
  width: number,
  height: number,
  mime: string,
  url: string,
  publishedAt: string
}