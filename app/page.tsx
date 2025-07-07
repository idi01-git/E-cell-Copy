"use client";

import { navItems } from "@/data";
import { useEffect, Suspense, lazy } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import { BackgroundBeams } from "@/components/ui/background-beams";
import CountdownDemo from "@/components/ui/CountdownDemo";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import FadeInSection from "@/components/ui/FadeInSection";
import MorphingText from "@/components/ui/morphing-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// Lazy load components that are lower on the page
const Services = lazy(() => import("@/components/Services"));
const Blogssec = lazy(() => import("@/components/Blogssec"));
const Gallery = dynamic(() => import("@/components/ui/Gallery"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      Loading Gallery...
    </div>
  ),
});
const Jordon = dynamic(() => import("@/components/Jordon"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      Loading Mentors...
    </div>
  ),
});

const RadialOrbitalFeatureSection = dynamic(
  () => import("@/components/ui/RadialOrbitalFeatureSection"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        Loading Features...
      </div>
    ),
  }
);

const Home = () => {
  useEffect(() => {
    // Use a timeout to ensure this runs after hydration
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        // Prevent scroll restoration and ensure page starts at top
        window.scrollTo(0, 0);
        // Disable scroll restoration
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        // Add padding to body to account for fixed navbar
        document.body.style.paddingTop = "0";
        document.body.style.scrollPaddingTop = "180px"; // Increased for better scroll behavior
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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
      <div className="max-w-7xl w-full relative z-10 pt-44">
        <FadeInSection>
          <CountdownDemo />
        </FadeInSection>
        <FadeInSection>
          <div id="about" className="my-20 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <MorphingText
                texts={["About E-Cell", "IET Lucknow"]}
                className="mb-8"
              />
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-12"></div>
            </div>
            <FadeInSection>
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                <TextGenerateEffect
                  words={`Entrepreneurship Cell (E-Cell) at IET Lucknow is a dynamic student-driven initiative dedicated to fostering innovation, entrepreneurial thinking, and startup culture on campus. Our mission is to inspire and empower students to explore the world of entrepreneurship by providing them with the necessary resources, mentorship, and networking opportunities. At E-Cell, we believe that every great idea deserves a chance to grow. Through workshops, speaker sessions, business competitions, and networking events, we aim to bridge the gap between theoretical knowledge and real-world startup challenges. We provide aspiring entrepreneurs with access to industry experts, venture capitalists, and successful alumni to guide them on their entrepreneurial journey. Our initiatives include startup incubation, investment pitching, hackathons, and leadership programs that help students transform their innovative ideas into successful businesses. By fostering a culture of creativity, risk-taking, and problem-solving, E-Cell IET Lucknow serves as a launchpad for future leaders and changemakers. Join us in shaping the future of entrepreneurship and innovation. Whether you are an aspiring entrepreneur, a mentor, or an investor, E-Cell IET Lucknow welcomes you to be a part of our growing community! 🚀`}
                  className="font-roboto font-light italic text-white text-[0.8rem] leading-relaxed w-full max-w-4xl mx-auto text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  duration={1.5}
                  filter={false}
                />
              </div>
            </FadeInSection>
          </div>
        </FadeInSection>
        <FadeInSection>
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center">
                Loading Services...
              </div>
            }
          >
            <Services />
          </Suspense>
        </FadeInSection>
        <FadeInSection>
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center">
                Loading Blogs...
              </div>
            }
          >
            <Blogssec />
          </Suspense>
        </FadeInSection>
        <FadeInSection>
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center">
                Loading Gallery...
              </div>
            }
          >
            <Gallery />
          </Suspense>
        </FadeInSection>
        <FadeInSection>
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center">
                Loading Features...
              </div>
            }
          >
            <RadialOrbitalFeatureSection />
          </Suspense>
        </FadeInSection>
        <FadeInSection>
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center">
                Loading Mentors...
              </div>
            }
          >
            <Jordon />
          </Suspense>
        </FadeInSection>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
