'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({
  isAutofocus = false,
  onSearch,
}: {
  isAutofocus: boolean,
  onSearch?: (search: string) => void
}) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (onSearch) onSearch(search);
      router.push(`/?search=${search}`);
    }}
      className={"flex items-center pl-4 p-1 border border-slate-300 rounded-full h-8 md:h-10 w-full"}>
      {!isActive &&
        <MagnifyingGlassIcon className="size-5 mr-2 text-slate-400 inline-block" />
      }
      <input
          type="text"
          className="outline-none font-light text-sm md:text-base placeholder:text-base w-full" placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          onBlur={() => setIsActive(false)}
          onClick={() => setIsActive(true)} autoFocus={isAutofocus}/>
    </form>
  )
}