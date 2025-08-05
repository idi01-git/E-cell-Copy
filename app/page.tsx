"use client";

import { navItems } from "@/data";
import { useState, useEffect, Suspense, lazy } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import { BackgroundBeams } from "@/components/ui/background-beams";
import CountdownDemo from "@/components/ui/CountdownDemo";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import FadeInSection from "@/components/ui/FadeInSection";
import MorphingText from "@/components/ui/morphing-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ContactSection from "@/components/ui/ContactSection";
import FloatingContactButton from "@/components/ui/FloatingContactButton";

// Lazy load components that are lower on the page
const Events = lazy(() => import("@/components/Services"));
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
    <main className="relative bg-transparent flex justify-center items-center flex-col overflow-hidden mx-auto px-3 sm:px-6 lg:px-10">
      <Navbar />
      <BackgroundPaths
        title="BUILD INNOVATION"
        subtitle="Igniting Entrepreneurship"
        titleBackground={true}
        backgroundStyle="gradient"
      />
      <BackgroundBeams className="z-0" />
      <div className="max-w-7xl w-full relative z-10 pt-12 md:pt-20 lg:pt-32 xl:pt-44">
        <FadeInSection>
          <CountdownDemo />
        </FadeInSection>
        <FadeInSection>
          <div id="about" className="my-6 md:my-12 lg:my-20 max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <MorphingText
                texts={["About E-Cell", "IET Lucknow"]}
                className="mb-4 md:mb-8"
              />
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-8 md:mb-12"></div>
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
                Loading Events...
              </div>
            }
          >
            <Events />
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

        {/* Contact Section with Title */}
        <FadeInSection>
          <div className="relative">
            {/* Contact Section Title */}
            <div className="max-w-6xl mx-auto px-4 mb-6 md:mb-8">
              <div className="text-center space-y-2 md:space-y-4">
                {/* Main Title */}
                <div className="space-y-1 md:space-y-2">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
                    Ready to
                    <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-bold">
                      Connect?
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                    Have an idea? Want to collaborate? Looking for mentorship?
                    <span className="text-yellow-400 font-medium">
                      {" "}
                      We&apos;d love to hear from you!
                    </span>
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="flex items-center justify-center space-x-3 md:space-x-4 mt-1 md:mt-4">
                  <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                  <div className="w-1.5 md:w-3 h-1.5 md:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                </div>

                {/* Call to Action */}
                <div className="mt-1 md:mt-4">
                  <p className="text-xs md:text-sm text-white/50 uppercase tracking-wider">
                    Let&apos;s Start Something Amazing Together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        {/* ContactSection is always mounted, but visually below the animated title */}
        <div className="mt-4 md:mt-8">
          <ContactSection
            statusText="Ready to Innovate"
            mainHeading="Let's Build"
            gradientText="The Future"
            description="Join E-Cell IET Lucknow in transforming bold entrepreneurial ideas into extraordinary ventures that drive innovation and create meaningful impact in the startup ecosystem."
            buttonText="Get In Touch"
            isModalOpen={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
        <Footer />
      </div>
      
      {/* Floating Contact Button */}
      {!isModalOpen && (
        <FloatingContactButton openModal={openModal} />
      )}
    </main>
  );
};

export default Home;
