import { FaLocationArrow, FaBook } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import logo from "../public/ecell-logo.png";
import { GridGlobe } from "./ui/GridGlobe";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
     
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
       
      </div>
      
      <div className="flex flex-col items-center justify-center relative z-10">
  <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center">
    {/* TextGenerateEffect */}
    <TextGenerateEffect
      words="Transforming World with Entrepreneurship"
      className="text-center text-[40px] md:text-5xl lg:text-6xl  mb-8"
    />

    {/* GridGlobe */}
    <div className="flex justify-center  w-full relative z-0">
      <div className="w-[700px] z-0">
        <GridGlobe />
      </div>
    </div>

    {/* Anchor Tag with MagicButton */}
    <a href="#about" className="mt-80 relative z-20">
     
    </a>
  </div>
</div>

 
    </div>
  );
};

export default Hero;
