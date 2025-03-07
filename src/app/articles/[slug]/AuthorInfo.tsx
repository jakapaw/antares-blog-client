'use client';
import { SERVER_URL } from "@/lib/config";
import Author from "@/model/author";
import { LinkedinOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthorInfo({
  authors
}: {
  authors: Author[]
}) {
  const navigate = useRouter();
  return (
    <>
      {
        authors.map((author) => 
          <div key={author.id} className="flex mb-4 md:mr-10 items-start max-w-[500px]">
            <Image 
              src={`${SERVER_URL}${author.profile_photo.url}`} 
              alt={author.profile_photo.alternativeText || ""} 
              width={author.profile_photo.width}
              height={author.profile_photo.height}
              className="aspect-square object-cover max-w-28 pt-1" 
              onClick={() => navigate.push(`/authors/${author.username}`)}/>
            <div className="ml-3">
              <span className="font-medium">
                {author.fullname}
                <Link 
                  href={
                    author.social_media.find((el) => el.social_media_name.toLowerCase() == "linkedin")?.link
                    || ""
                  }>
                  <LinkedinOutlined className="ml-2 text-[#0A66C2] text-xl"/>
                </Link>
              </span>
              <p className="text-xs pt-2">{author.profile_summary}</p>
            </div>
          </div>   
        )
      }
    </>
  )
}