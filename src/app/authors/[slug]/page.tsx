import HomeNavigationBar from "@/components/HomeNavigationBar";
import { getAuthor } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { SERVER_URL } from '../../../lib/config';

export default async function AuthorPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const author = (await getAuthor(slug)).at(0);

  if (!author) {
    return (<></>);
  }

  return (
    <>
      <div className="p-8">
        <HomeNavigationBar />
      </div>
      <div className="px-16 py-8 md:w-2/3 md:mx-auto md:shadow-xl md:bg-gray-100 flex flex-col items-center md:flex-row md:mt-16">
        <div className="md:w-1/2 flex flex-col items-center justify-center">
          <Image src={SERVER_URL + author.profile_photo.url} alt="Profile Image" width={author.profile_photo.width} height={author.profile_photo.height}
            className="mt-2 self-center aspect-square object-cover rounded-full max-w-[250px]" />
          <span className="text-2xl font-bold self-center mt-4">{author.fullname}</span>
          <span>{author.headline}</span>
        </div>
        <div className="flex flex-col items-center py-8 md:p-8 gap-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">About Me</h1>
            <p className="text-justify md:text-lg">{author.profile_summary}</p>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold mb-4">Contact & Social Media</h1>
            <div className="flex flex-col gap-4 items-center">
              {author.social_media.map((el, i) => <ContactLink key={i} name={el.social_media_name} href={el.link} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ContactLink({
  name,
  href = ""
}: {
  name: string,
  href: string
}) {
  return (
    <div className="w-fit">
      <Link href={href}>
        <div className="mx-auto size-[50px] bg-slate-300 rounded-full"></div>
        <span className="">{name}</span>
      </Link>
    </div>
  )
}