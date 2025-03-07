'use client';
import { SearchBar } from "@/components/SearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeaderSecondary() {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <header className="py-2 px-3 flex justify-between items-center border-b-2 border-cobalt">
      <Link href="/">
        <Image src="/main_logo.svg" alt="Antares Logo" width={100} height={100} />
      </Link>
      {searchBarOpen ?
        <div onBlur={() => setSearchBarOpen(false)}>
          <SearchBar isAutofocus={true} />
        </div> :
        <button id="searchIcon" onClick={() => setSearchBarOpen(true)}>
          <MagnifyingGlassIcon className="size-6 text-slate-400" />
        </button>}
    </header>
  )
}