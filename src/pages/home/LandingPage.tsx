import Nav from "@/components/nav/Nav";
import { useLayoutEffect } from "react";

export default function LandingPage() {
  useLayoutEffect(() => {
    document.title = "SkillLink | Connect & Showcase Your Talents";
  }, []);

  return (
    <div>
      <Nav />

      <div className="px-4 sm:px-8 md:px-10 pt-10 pb-20">
        <div className='w-full max-w-[70rem] xl:max-w-[80rem] mx-auto'>

        </div>
      </div>
    </div>
  )
}