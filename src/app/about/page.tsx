'use client';
import FooterSecondary from "@/components/FooterSecondary";
import HomeNavigationBar from "@/components/HomeNavigationBar";
import Spacer from "@/components/Spacer";
import { SERVER_URL } from "@/lib/config";
import { getBrandInfo } from "@/lib/data";
import Author from "@/model/author";
import Brand from "@/model/brand";
import Image from "next/image";
import { useEffect, useState } from "react";

class AboutPageState {
  brand?: Brand;
  error?: Error;
}

export default function AboutUsPage() {
  const [state, setState] = useState(new AboutPageState());

  useEffect(() => {
    const newState = new AboutPageState();
    getBrandInfo().then((data) => {
      newState.brand = data;
    }).catch((error) => {
      newState.error = error;
    }).finally(() => {
      setState(newState);
    })
  }, []);

  if (!state.brand) {
    return (<div></div>);
  }

  return (
    <>
      <div className="flex flex-col items-center md:mx-auto md:w-[75%] xl:w-[60%]">
        <span className="p-8 self-start mb-5">
          <HomeNavigationBar />
        </span>
        <Image
          src={`${SERVER_URL}${state.brand.main_logo.url}`}
          width={state.brand.main_logo.width}
          height={state.brand.main_logo.height}
          alt="Antares Logo"
          className="w-3/4 max-w-[300px]" />
        <span className="text-xl text-black font-bold">{state.brand.tagline}</span>
        <div className="bg-black text-white px-12 py-5 my-5 text-sm font-medium">
          <p>{state.brand.introduction}</p>
          <div className="absolute max-md:right-[5%] md:left-[70%] w-12 h-12 rounded-full bg-secondary"></div>
        </div>
      </div>
      <div className="flex flex-col items-center px-12 mb-10">
        <span>
          <Image src="deco-1.svg" width={60} height={60} alt="" className="relative -left-8" />
          <h1 className="font-extrabold text-3xl">Best Team</h1>
        </span>
        <div className="mt-4 grid grid-cols-3 gap-6">
          {
            state.brand.authors.map((el, i) =>
              <TeamMember key={i} author={el} />
            )
          }
        </div>
      </div>
      <Spacer />
      <FooterSecondary />
    </>
  )
}

function TeamMember({
  author
}: {
  author: Author
}) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={`${SERVER_URL}${author.profile_photo.url}`}
        width={author.profile_photo.width}
        height={author.profile_photo.height}
        alt={`${author.fullname}'s photo`}
        className="rounded-full aspect-square object-cover p-2 w-[100px] md:w-[150px]" />
      <span className="font-bold text-xs text-black">{author.fullname}</span>
      <span className="text-xs">{author.headline}</span>
    </div>
  )
}