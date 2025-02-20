import { HomeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";

export default function HomeNavigationBar({
  textStyle = ""
}: {
  textStyle?: string
}) {
  return (
    <div>
      <Link href="/">
        <HomeIcon className="inline-block mr-4 size-8 p-1 w-9 h-10 text-cobalt rounded shadow-md bg-[#e9e9e9]"/>
        <span className={clsx("text-sm underline", textStyle)}>Kembali ke Halaman Utama</span>
      </Link>
    </div>
  )
}