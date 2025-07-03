"use client";

import { navItems } from "@/data";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Blogssec from "@/components/Blogssec";
import Jordon from "@/components/Jordon";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/ui/Gallery";
import { BackgroundBeams } from "@/components/ui/background-beams";
import CountdownDemo from "@/components/ui/CountdownDemo";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import FadeInSection from "@/components/ui/FadeInSection";

const Home = () => {
  return (
    <main className="relative bg-transparent flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Navbar />
      <BackgroundPaths
        title="BUILD INNOVATION"
        subtitle="Igniting Entrepreneurship"
        titleBackground={true}
        backgroundStyle="gradient"
      />
      <BackgroundBeams className="z-0" />
      <div className="max-w-7xl w-full relative z-10">
        <FadeInSection>
          <CountdownDemo />
        </FadeInSection>
        <FadeInSection>
          <About />
        </FadeInSection>
        <FadeInSection>
          <Services />
        </FadeInSection>
        <FadeInSection>
          <Blogssec />
        </FadeInSection>
        <FadeInSection>
          <Gallery />
        </FadeInSection>
        <FadeInSection>
          <Approach />
        </FadeInSection>
        <FadeInSection>
          <Jordon />
        </FadeInSection>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
