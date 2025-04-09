'use client';
import FooterSecondary from "@/components/FooterSecondary";
import HomeNavigationBar from "@/components/HomeNavigationBar";
import ProfilePhoto from "@/components/ProfilePhoto";
import Spacer from "@/components/Spacer";
import { getBrandInfo } from "@/lib/data";
import Author from "@/model/author";
import Brand from "@/model/brand";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
          <h1 className="text-[55px] md:text-[110px] font-bold">Antares</h1>
          <h2 className="md:text-2xl -mt-4">Reach The Skies and Beyond</h2>
          <p className="text-sm md:text-lg my-5 md:my-10">{state.brand.introduction}</p>
        </div>
      </div>
      <Spacer />
      <div className="flex flex-col items-center px-5 mb-10">
        <span>
          <Image src="deco-1.svg" width={80} height={80} alt="" className="relative -left-8 size-[60px] md:size-[80px]" />
          <h1 className="font-extrabold text-3xl md:text-5xl">Best Team</h1>
        </span>
        <div className="mt-8 flex flex-wrap justify-center gap-6 md:w-1/2">
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
  const navigate = useRouter();

  let name = author.fullname;
  if (name.length > 12) {
    const split = name.split(" ");
    const first = split.slice(0, 2);
    let last = split.slice(2);
    last = last.map(el => (el.at(0) ?? "") + ".");
    name = [first, last].flatMap(el => el).join(" ");
  }
  
  return (
    <div className="flex flex-col items-center">
      <ProfilePhoto
        src={author.profile_photo?.url}
        width={author.profile_photo?.width}
        height={author.profile_photo?.height}
        alt={`${author.fullname}'s photo`}
        className="rounded-full aspect-square object-cover p-2 w-[100px] md:w-[180px]"
        onClick={() => navigate.push(`/authors/${author.username}`)} />
      <span className="font-bold text-black text-[10px] md:text-xl">{name}</span>
      <span className="text-[9px] md:text-base">{author.headline}</span>
    </div>
  )
}