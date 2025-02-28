'use client';
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import SendEmailButton from "./SendEmailButton";

export default function FooterPrimary() {
  return (
    <div className="p-2 mt-6 bg-primary grid grid-cols-[1fr 2fr 1fr] grid-rows-2">
      <SendEmailButton />
      <span className="col-end-1 font-light text-white flex items-end text-sm">2025 Antares</span>
      <Link
        href="/about"
        className="mx-auto h-fit col-start-1 col-end-2 bg-cobalt p-2 px-4 font-semibold text-white hover:bg-[#005AD9] max-w-[150px]">
        About Us
      </Link>
      <button
        className="flex flex-col justify-end items-end text-white font-light text-sm col-start-3 row-start-1 row-end-3 size-full"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUpCircleIcon className="size-12 text-blue-500" />
        <span className="text-sm">Scroll to Top</span>
      </button>
    </div>
  )
}
