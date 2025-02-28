'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";

export function SearchBar({
  isAutofocus = false,
  className
}: {
  isAutofocus: boolean,
  className: string
}) {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <form action={`/articles?search=${search}`}
      className={clsx("flex items-center pl-4 p-1 border border-slate-300 rounded-full", className)}>
      {!isActive &&
        <MagnifyingGlassIcon className="size-5 mr-2 text-slate-400 inline-block" />
      }
      <input
          type="text"
          className="outline-none font-light text-sm placeholder:text-base" placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          onBlur={() => setIsActive(false)}
          onClick={() => setIsActive(true)} autoFocus={isAutofocus}/>
    </form>
  )
}