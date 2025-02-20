'use client';
import HomeNavigationBar from "@/components/HomeNavigationBar";
import Spacer from "@/components/Spacer";
import Deco1 from "@/resources/deco-1.svg";
import MainLogo from "@/resources/main_logo.svg";
import Profile from "@/resources/profile-1.jpg";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <>
      <div className="p-8 flex flex-col items-center">
        <span className="self-start mb-5">
          <HomeNavigationBar />
        </span>
        <Image src={MainLogo} alt="Antares Logo" className="w-3/4 max-w-[300px]" />
        <span className="text-xl text-black font-bold">Reach The Skies and Beyond.</span>
      </div>
      <div className="bg-black text-white px-12 py-5 text-sm font-medium text-justify">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco.</p>
        <div className="absolute right-[5%] w-12 h-12 rounded-full bg-secondary"></div>
      </div>
      <div className="flex flex-col items-center px-12">
        <Spacer />
        <span>
          <Image src={Deco1} alt="" className="relative -left-8" />
          <h1 className="font-extrabold text-3xl">Best Team</h1>
        </span>
        <div className="mt-4 grid grid-cols-3 gap-6">
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
          <TeamMember />
        </div>
      </div>
      <Spacer />
      <FooterSecondary />
    </>
  )
}

function TeamMember() {
  return (
    <div className="flex flex-col items-center">
      <Image src={Profile} alt="" className="rounded-full aspect-square object-cover p-2" />
      <span className="font-bold text-xs text-black">Francis Cordova</span>
      <span className="text-xs">Software Engineer</span>
    </div>
  )
}

function FooterSecondary() {
  return (
    <div className="p-2 bg-primary flex justify-between">
      <button
        className="flex items-center border-4 border-secondary hover:border-secondaryActive bg-white w-[220px] h-10 mt-1 mb-3 group"
        onClick={() => window.open("mailto:fingermadness8@gmail.com")}>
        <span className="flex-grow border-secondary text-sm text-start ml-4">Kirim Email</span>
        <ArrowRightIcon className="size-full basis-8 self-end bg-secondary text-primary font-bold group-hover:bg-secondaryActive group-hover:border-secondaryActive" />
      </button>
      <span className="col-end-1 font-light text-white flex items-end text-sm">2025 Antares</span>
    </div>
  )
}