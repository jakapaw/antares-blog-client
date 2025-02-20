import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import TempProfile from "../../../public/profile-1.jpg";

export default function AuthorPage() {
  return (
    <>
      <div className="flex flex-col p-8 gap-4" 
      style={{
        backgroundImage: 'url(/profile-bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 110%'
      }}>
        <NavigationBar />
        <Image src={TempProfile} alt="Profile Image" className="mt-2 self-center aspect-square object-cover rounded-full w-1/2"/>
        <span className="text-2xl text-white font-bold self-center">Frances Cordova</span>
      </div>
      <div className="flex flex-col items-center p-8 gap-8">
        <div>
          <h1 className="text-xl font-semibold mb-2">Tentang Saya</h1>
          <p className="text-justify">venenatis iaculis nisl, sit dictum interdum. Phasellus  platea et nunc id potenti orci justo egestas. Velit eget venenatis  iaculis odio per cursus purus nulla elit.</p>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">Kontak & Media Sosial</h1>
          <div className="grid grid-cols-2 gap-4">
            <ContactLink name={"Email"} href={""} />
            <ContactLink name={"LinkedIn"} href={""} />
            <ContactLink name={"Instagram"} href={""} />
            <ContactLink name={"X"} href={""} />
          </div>
        </div>
      </div>
    </>
  )
}

function NavigationBar() {
  return (
    <div>
      <Link href="/">
        <HomeIcon className="inline-block mr-2 size-8 bg-[#e9e9e9] p-1 text-cobalt rounded-sm"/>
        <span className="text-sm underline text-white">Kembali ke Halaman Utama</span>
      </Link>
    </div>
  )
}

function ContactLink({
  name,
  logo,
  href = ""
}: {
  name: string,
  logo?: string,
  href: string
}) {
  return (
    <Link href={href}>
      <div className="mx-auto size-[40px] bg-slate-300 rounded-full"></div>
      <span className="text-sm">{name}</span>
    </Link>
  )
}