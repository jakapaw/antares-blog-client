import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function SendEmailButton() {
  return (
    <>
      <button
        className="mx-auto col-start-1 col-end-2 flex items-center border-4 border-secondary hover:border-secondaryActive bg-white w-[220px] h-10 mt-1 mb-3 group"
        onClick={() => window.open("mailto:goantares@gmail.com")}>
        <span className="flex-grow border-secondary text-sm text-start ml-4">Send Email</span>
        <ArrowRightIcon className="size-full basis-8 self-end bg-secondary text-primary font-bold group-hover:bg-secondaryActive group-hover:border-secondaryActive" />
      </button>
    </>
  )
}
