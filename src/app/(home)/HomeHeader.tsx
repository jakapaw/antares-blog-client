'use client'

import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HomeHeader() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <header className="flex flex-col items-center gap-3 px-5">
      <span className="absolute left-4 top-4">
        <button className="bg-gray-100" onClick={() => setIsSidebarActive(true)}>
          <Bars3Icon className="size-8 text-cobalt" />
        </button>
      </span>
      <Image src={'/main_logo.svg'} alt="Antares Logo" width={130} height={130} />
      <SearchBar />
      <Sidebar activeState={isSidebarActive} close={() => setIsSidebarActive(false)} />
    </header>
  )
}

function SearchBar() {
  const inputBar = useRef(null);
  const icon = useRef(null);

  useEffect(() => {
    inputBar.current!.addEventListener('focusin', () => {
      icon.current!.style.display = 'none';
    });
    inputBar.current!.addEventListener('focusout', () => {
      icon.current!.style.display = 'inline';
    });
  });

  return (
    <form action="" className="flex items-center pl-4 p-1 border border-slate-300 h-8 w-full rounded-full">
      <MagnifyingGlassIcon ref={icon} className="size-5 mr-2 text-slate-400" />
      <input ref={inputBar} type="text" className="outline-none font-light text-sm placeholder:text-base" placeholder="Search" />
    </form>
  )
}

function Sidebar({
  activeState,
  close
}: {
  activeState: boolean
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
        <a className="hover:bg-secondary hover:text-black">Software Development</a>
        <a className="hover:bg-secondary hover:text-black">AI & Machine Learning</a>
        <a className="hover:bg-secondary hover:text-black">Data Science</a>
        <a className="hover:bg-secondary hover:text-black">Life Sciences</a>
        <a className="hover:bg-secondary hover:text-black">Petcare & Veterinary</a>
        <a className="hover:bg-secondary hover:text-black">Sales & Marketing</a>
        <a className="hover:bg-secondary hover:text-black">Design & Arts</a>
      </nav>
    </div>
  )
}