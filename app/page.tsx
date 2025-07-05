"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/ui/FadeInSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy load heavy components
const Blogssec = dynamic(() => import("@/components/Blogssec"), {
  loading: () => <LoadingSpinner size="lg" className="h-96" />,
  ssr: true,
});

const Jordon = dynamic(() => import("@/components/Jordon"), {
  loading: () => <LoadingSpinner size="lg" className="h-96" />,
  ssr: true,
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => <LoadingSpinner size="lg" className="h-96" />,
  ssr: true,
});

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <LoadingSpinner size="lg" className="h-96" />,
  ssr: true,
});

const Gallery = dynamic(() => import("@/components/ui/Gallery"), {
  loading: () => <LoadingSpinner size="lg" className="h-96" />,
  ssr: true,
});

const BackgroundBeams = dynamic(
  () =>
    import("@/components/ui/background-beams").then((mod) => ({
      default: mod.BackgroundBeams,
    })),
  {
    ssr: false,
  }
);

const BackgroundPaths = dynamic(
  () =>
    import("@/components/ui/animated-infinity-background").then((mod) => ({
      default: mod.BackgroundPaths,
    })),
  {
    loading: () => <LoadingSpinner size="lg" className="h-96" />,
    ssr: true,
  }
);

const RadialOrbitalFeatureSection = dynamic(
  () => import("@/components/ui/RadialOrbitalFeatureSection"),
  {
    loading: () => <LoadingSpinner size="lg" className="h-96" />,
    ssr: true,
  }
);

const MorphingText = dynamic(() => import("@/components/ui/morphing-text"), {
  loading: () => <LoadingSpinner size="lg" className="h-96" />,
  ssr: true,
});

const TextGenerateEffect = dynamic(
  () =>
    import("@/components/ui/text-generate-effect").then((mod) => ({
      default: mod.TextGenerateEffect,
    })),
  {
    loading: () => <LoadingSpinner size="lg" className="h-96" />,
    ssr: true,
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
        document.body.style.scrollPaddingTop = "120px";
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
      <div className="max-w-7xl w-full relative z-10 pt-32">
        <FadeInSection>
          <div id="about" className="my-12">
            <MorphingText
              texts={["About ECell", "IET Lucknow"]}
              className="mb-12"
            />
            <FadeInSection>
              <TextGenerateEffect
                words={`Entrepreneurship Cell (E-Cell) at IET Lucknow is a dynamic student-driven initiative dedicated to fostering innovation, entrepreneurial thinking, and startup culture on campus. Our mission is to inspire and empower students to explore the world of entrepreneurship by providing them with the necessary resources, mentorship, and networking opportunities. At E-Cell, we believe that every great idea deserves a chance to grow. Through workshops, speaker sessions, business competitions, and networking events, we aim to bridge the gap between theoretical knowledge and real-world startup challenges. We provide aspiring entrepreneurs with access to industry experts, venture capitalists, and successful alumni to guide them on their entrepreneurial journey. Our initiatives include startup incubation, investment pitching, hackathons, and leadership programs that help students transform their innovative ideas into successful businesses. By fostering a culture of creativity, risk-taking, and problem-solving, E-Cell IET Lucknow serves as a launchpad for future leaders and changemakers. Join us in shaping the future of entrepreneurship and innovation. Whether you are an aspiring entrepreneur, a mentor, or an investor, E-Cell IET Lucknow welcomes you to be a part of our growing community! 🚀`}
                className="font-poppins font-extralight text-white text-[0.7rem] w-full max-w-none mt-16 mb-0"
                duration={1.5}
                filter={false}
              />
            </FadeInSection>
          </div>
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
        <RadialOrbitalFeatureSection />
        <FadeInSection>
          <Jordon />
        </FadeInSection>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
