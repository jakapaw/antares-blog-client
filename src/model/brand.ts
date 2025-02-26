import Author from "./author";
import Media from "./media";

export default interface Brand {
  id: number;
  name: string,
  tagline: string,
  introduction: string,
  main_logo: Media,
  authors: Author[]
}