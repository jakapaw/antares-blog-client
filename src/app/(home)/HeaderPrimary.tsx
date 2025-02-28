'use client'

import { SearchBar } from "@/components/SearchBar";
import Category from "@/model/category";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import { use, useState } from "react";
import { HomePageState } from "./page";

export default function HeaderPrimary({state}: {state: HomePageState}) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const loaded = use(state.categories);

  return (
    <header className="flex flex-col items-center gap-3 px-5 py-1">
      <span className="absolute left-4 top-4">
        <button className="bg-gray-100" onClick={() => setIsSidebarActive(true)}>
          <Bars3Icon className="size-8 text-cobalt" />
        </button>
      </span>
      <Image src="main_logo.svg" alt="Antares Logo" width={130} height={130}/>
      <SearchBar className="h-8 w-full" isAutofocus={false}/>
      <Sidebar activeState={isSidebarActive} close={() => setIsSidebarActive(false)} categories={loaded}/>
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