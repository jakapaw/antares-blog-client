'use client';
import { ArrowRightIcon, ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function FooterPrimary() {
  const navigator = useRouter();

  return (
    <div className="p-2 mt-6 bg-primary grid grid-cols-[1fr 2fr 1fr] grid-rows-2">
      <button
        className="mx-auto col-start-1 col-end-2 flex items-center border-4 border-secondary hover:border-secondaryActive bg-white w-[220px] h-10 mt-1 mb-3 group"
        onClick={() => window.open("mailto:fingermadness8@gmail.com")}>
        <span className="flex-grow border-secondary text-sm text-start ml-4">Kirim Email</span>
        <ArrowRightIcon className="size-full basis-8 self-end bg-secondary text-primary font-bold group-hover:bg-secondaryActive group-hover:border-secondaryActive" />
      </button>
      <span className="col-end-1 font-light text-white flex items-end text-sm">2025 Antares</span>
      <button
        onClick={() => navigator.push("/about")}
        className="mx-auto h-fit col-start-1 col-end-2 bg-cobalt p-2 px-4 font-semibold text-white hover:bg-[#005AD9] max-w-[150px]">
        Tentang Kami
      </button>
      <button
        className="flex flex-col justify-end items-end text-white font-light text-sm col-start-3 row-start-1 row-end-3 size-full"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUpCircleIcon className="size-12 text-blue-500" />
        <span className="text-sm">Kembali ke Atas</span>
      </button>
    </div>
  )
}
