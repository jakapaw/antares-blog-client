'use client';
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
  const BASE_URL = "http://localhost:1337";
  const navigate = useRouter();
  return (
    <div className="px-4">
      <h1 className="font-medium text-lg">Tentang Penulis</h1>
      {
        authors.map((author) => 
          <div key={author.id} className="flex items-start">
            <Image 
              src={`${BASE_URL}${author.profile_photo.url}`} 
              alt={author.profile_photo.alternativeText || ""} 
              width={author.profile_photo.width}
              height={author.profile_photo.height}
              className="aspect-square object-cover max-w-28 pt-1" 
              onClick={() => navigate.push('/author')}/>
            <div className="ml-3">
              <span className="font-medium">
                {author.fullname}
                <Link 
                  href={
                    author.social_media.find((el) => el.social_media_name.toLowerCase() == "linkedin")?.link
                    || ""
                  }>
                  <LinkedinOutlined className="ml-2 text-[#0A66C2] text-lg"/>
                </Link>
              </span>
              <p className="text-xs pt-2">{author.profile_summary}</p>
            </div>
          </div>   
        )
      }
    </div>
  )
}