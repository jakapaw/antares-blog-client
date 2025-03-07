'use client'

import { SearchBar } from "@/components/SearchBar";
import Category from "@/model/category";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeaderPrimary({
  categories,
  onSearch
}: {
  categories: Category[],
  onSearch: (search: string) => void
}) {
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 640;
  }, []);

  if (isMobile.current) {
    return <HeaderMobile categories={categories} onSearch={onSearch}/>
  } else {
    return <HeaderDesktop onSearch={onSearch} />
  }
}

function HeaderMobile({
  categories,
  onSearch
}: {
  categories: Category[],
  onSearch: (search: string) => void
}) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  return (
    <header className="flex flex-col items-center gap-3 px-5 py-1 pb-5 border-cobalt border-b-2">
      <span className="absolute left-4 top-4">
        <button className="bg-gray-100" onClick={() => setIsSidebarActive(true)}>
          <Bars3Icon className="size-8 text-cobalt" />
        </button>
      </span>
      <Image src="main_logo.svg" alt="Antares Logo" width={130} height={130} onClick={() => window.location.assign("/")}/>
      <SearchBar isAutofocus={false} onSearch={onSearch}/>
      <Sidebar activeState={isSidebarActive} close={() => setIsSidebarActive(false)} categories={categories}/>
    </header>
  )
}

function Sidebar({
  categories,
  activeState,
  close
}: {
  categories: Category[],
  activeState: boolean,
  close: () => void
}) {
  return (
    <div className={clsx("fixed left-0 top-0 bottom-0 w-[85%] bg-slate-100", !activeState && "hidden")}>
      <div className="bg-slate-50 h-1/6 flex justify-center items-center">
        <Image src={'/main_logo.svg'} alt="Antares Logo" width={160} height={160} />
        <div className="absolute top-[14%] -right-5">
          <button className="flex justify-center items-center size-12 rounded-full bg-secondary hover:bg-secondaryActive active:bg-secondaryActive"
            onClick={close}>
            <XMarkIcon className="text-black size-8" />
          </button>
        </div>
      </div>
      <nav className={clsx(
        'flex flex-col h-full bg-primary text-white font-semibold text-xl',
        '*:border-b-2 *:border-secondary *:pl-4 *:pr-1 *:pb-1 *:pt-5')}>
        {
          categories.map((val) => <a key={val.id} className="hover:bg-secondary hover:text-black">{val.name}</a>)
        }
      </nav>
    </div>
  )
}

function HeaderDesktop({
  onSearch
}: {
  onSearch: (search: string) => void
}) {
  return (
    <header className="px-5 flex border-cobalt border-b-2 py-1">
      <Image 
        src={'/main_logo.svg'} 
        alt="Antares Logo" 
        width={180} 
        height={180} 
        onClick={() => window.location.assign("/")}
        className="w-[120px] md:w-[180px]"/>
      <div className="flex items-center justify-end w-full">
        <div className="w-1/4 min-w-[200px] mr-10"><SearchBar isAutofocus={false} onSearch={onSearch}/></div>
        <div>
          <Link
            href="/about"
            className="mx-auto h-fit col-start-1 col-end-2 bg-cobalt p-2 px-4 font-semibold text-white hover:bg-[#005AD9] max-w-[150px]">
            About Us
          </Link>
        </div>
      </div>
    </header>
  )
}