import Article from "./article";

export default interface Category {
  id: number,
  name: string,
  description: string,
  articles?: Article[]
}