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
      <div className="flex flex-col px-6 md:px-12">
        <span className="py-8">
          <HomeNavigationBar />
        </span>
        <div className="bg-blue-950 px-14 py-6 text-white">
          <h1 className="text-[62px] md:text-[110px] font-bold">Antares</h1>
          <h2 className="text-lg md:text-2xl -mt-4">Reach The Skies and Beyond</h2>
          <p className="text-sm md:text-lg my-5 md:my-10">{state.brand.introduction}</p>
        </div>
      </div>
      <Spacer />
      <div className="flex flex-col items-center px-12 mb-10">
        <span>
          <Image src="deco-1.svg" width={80} height={80} alt="" className="relative -left-8 size-[60px] md:size-[80px]" />
          <h1 className="font-extrabold text-3xl md:text-5xl">Our Best Team</h1>
        </span>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 md:w-2/3">
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
        className="rounded-full aspect-square object-cover p-2 w-[100px] md:w-[180px]" />
      <span className="font-bold text-black text-sm md:text-xl">{author.fullname}</span>
      <span className="text-xs md:text-base">{author.headline}</span>
    </div>
  )
}