import HomeNavigationBar from "@/components/HomeNavigationBar";
import ProfilePhoto from "@/components/ProfilePhoto";
import { getAuthor } from "@/lib/data";
import { LinkedinFilled } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { CLIENT_URL } from '../../../lib/config';

const icons = {
  "linkedin": <LinkedinFilled style={{ fontSize: '32px', color: '#0E76A8' }}></LinkedinFilled>,
  "gmail": <Image src={CLIENT_URL + '/icons/icons8-gmail.svg'} width={32} height={32} alt="" />,
  "instagram": <Image src={CLIENT_URL + '/icons/icons8-instagram.svg'} width={32} height={32} alt="" />,
  "github": <Image src={CLIENT_URL + '/icons/icons8-github.svg'} width={32} height={32} alt="" />
}

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
      <div className="flex flex-col items-center px-10 md:px-0 md:w-1/2 mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <ProfilePhoto src={author.profile_photo?.url} alt="Profile Image" width={author.profile_photo?.width} height={author.profile_photo?.height}
            className="mt-2 self-center aspect-square object-cover rounded-full max-w-[250px]" />
          <span className="text-2xl font-bold self-center mt-4">{author.fullname}</span>
          <span className="text-lg">{author.headline}</span>
        </div>
        <div className="py-8">
          {author.profile_summary ?
            <div>
              <h1 className="text-xl font-medium mb-2 text-center">About Me</h1>
              <p className="text-center">{author.profile_summary}</p>
            </div>
            : <></>
          }
        </div>
        {author.social_media &&
          <div className="flex flex-col items-center mb-10">
              <h1 className="text-lg font-medium mb-4">Contact & Social Media</h1>
              <div className="flex flex-wrap mx-auto gap-4 items-center justify-center">
                {author.social_media?.map((el, i) => <ContactLink key={i} name={el.social_media_name} href={el.link} />)}
              </div>
          </div>
        }
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
      <div className="mx-auto size-[50px] bg-gray-100 rounded-full flex items-center justify-center">
        {Object.entries(icons).map(([key, value], i) => {
          return key == name.toLowerCase() ? <span key={i}>{value}</span> : undefined
        })}
      </div>
      <span className="">{name}</span>
    </Link>
  )
}