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
      <div className="flex flex-col p-8 pb-14 gap-4" 
      style={{
        backgroundImage: 'url(/profile-bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 110%'
      }}>
        <HomeNavigationBar textStyle="text-white" />
        <Image src={SERVER_URL + author.profile_photo.url} alt="Profile Image" width={author.profile_photo.width} height={author.profile_photo.height} className="mt-2 self-center aspect-square object-cover rounded-full w-1/3 max-w-[300px]"/>
        <span className="text-2xl text-white font-bold self-center">{author.fullname}</span>
      </div>
      <div className="flex flex-col items-center p-8 gap-8">
        <div>
          <h1 className="text-xl font-semibold mb-2">About Me</h1>
          <p className="text-justify">{author.profile_summary}</p>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">Contact & Social Media</h1>
          <div className="flex flex-col gap-4">
            { author.social_media.map((el, i) => <ContactLink key={i} name={el.social_media_name} href={el.link} />) }
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
    <Link href={href}>
      <div className="mx-auto size-[40px] bg-slate-300 rounded-full"></div>
      <span className="text-sm">{name}</span>
    </Link>
  )
}