import Media from "./media"

export default interface Author {
  id: string,
  fullname: string,
  username: string,
  profile_photo?: Media,
  headline?: string,
  profile_summary?: string,
  social_media?: Array<{
    social_media_name: string,
    link: string
  }>,
  other_link?: {
    name: string,
    link: string
  },
}