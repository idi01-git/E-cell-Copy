"use client";

import { navItems } from "@/data";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import CountdownDemo from "@/components/ui/CountdownDemo";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import FadeInSection from "@/components/ui/FadeInSection";
import ContactSection from "@/components/ui/ContactSection";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import DeferredSection from "@/components/ui/DeferredSection";
import { SectionErrorBoundary, AsyncErrorBoundary } from "@/components/ui/ErrorBoundary";
import { logger } from "@/lib/logger";

// Enhanced Loading Component with scroll-aware behavior
const LoadingComponent = ({ text, height = "h-96", isScrolling = false }: { text: string; height?: string; isScrolling?: boolean }) => (
  <div className={`${height} flex items-center justify-center transition-opacity duration-300 ${isScrolling ? 'opacity-50' : 'opacity-100'}`}>
    <div className="animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg w-full h-full flex flex-col items-center justify-center space-y-4">
      <div className={`w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full ${isScrolling ? 'animate-none' : 'animate-spin'}`}></div>
      <span className="text-white/70 text-sm font-medium">{text}</span>
    </div>
  </div>
);

// Standardized dynamic imports with consistent loading states and SSR configuration
const BackgroundBeams = dynamic(() => import("@/components/ui/background-beams").then(mod => ({ default: mod.BackgroundBeams })), {
  ssr: false,
  loading: () => null, // Background component, no loading state needed
});

const MorphingText = dynamic(() => import("@/components/ui/morphing-text"), {
  ssr: true,
  loading: () => (
    <div className="h-16 flex items-center justify-center">
      <div className="animate-pulse bg-white/10 rounded w-48 h-8"></div>
    </div>
  ),
});

const TextGenerateEffect = dynamic(() => import("@/components/ui/text-generate-effect").then(mod => ({ default: mod.TextGenerateEffect })), {
  ssr: true,
  loading: () => (
    <div className="h-12 flex items-center justify-center">
      <div className="animate-pulse bg-white/10 rounded w-64 h-6"></div>
    </div>
  ),
});

// Below-the-fold components with strategic lazy loading
const Events = dynamic(() => import("@/components/Services"), {
  ssr: false,
  loading: () => <LoadingComponent text="Loading Events..." height="h-[600px]" />,
});

const Blogssec = dynamic(() => import("@/components/Blogssec"), {
  ssr: false,
  loading: () => <LoadingComponent text="Loading Blog Section..." height="h-[500px]" />,
});

const Gallery = dynamic(() => import("@/components/ui/Gallery"), {
  ssr: false,
  loading: () => <LoadingComponent text="Loading Gallery..." height="h-[600px]" />,
});

const Jordon = dynamic(() => import("@/components/Jordon"), {
  ssr: false,
  loading: () => <LoadingComponent text="Loading Mentors..." height="h-[500px]" />,
});

const RadialOrbitalFeatureSection = dynamic(() => import("@/components/ui/RadialOrbitalFeatureSection"), {
  ssr: false,
  loading: () => <LoadingComponent text="Loading Features..." height="h-[600px]" />,
});

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Use shared scroll velocity hook
  const { isScrolling, scrollVelocity } = useScrollVelocity({ threshold: 2 });

  useEffect(() => {
    // Set page context for error tracking
    logger.setContext("page", {
      name: "home",
      path: "/",
      timestamp: new Date().toISOString(),
    });
    logger.setTag("page_type", "home");
    
    // Use a timeout to ensure this runs after hydration
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        // Only scroll to top if there's no hash in the URL
        if (!window.location.hash) {
          // Prevent scroll restoration and ensure page starts at top
          window.scrollTo(0, 0);
        }
        // Disable scroll restoration
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        // Add padding to body to account for fixed navbar
        document.body.style.paddingTop = "0";
        document.body.style.scrollPaddingTop = "180px"; // Increased for better scroll behavior
        document.body.style.willChange = "scroll-position"; // Optimize for scrolling
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Scroll velocity detection is now handled by the shared hook

  // Separate useEffect for hash navigation
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      let hasScrolled = false;

      const scrollToSection = () => {
        if (hasScrolled) return; // Prevent multiple scrolls

        const element = document.querySelector(hash);
        if (element) {
          hasScrolled = true;
          const navbarHeight = 160;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      // Single attempt with a reasonable delay
      setTimeout(scrollToSection, 800);
    }
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
      <div className="max-w-7xl w-full relative z-10 pt-4 md:pt-20 lg:pt-32 xl:pt-44">
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
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                  Empowering Student Entrepreneurs
                </h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto font-light">
                  We inspire and equip students to transform innovative ideas
                  into successful ventures through hands-on programs, expert
                  mentorship, and a vibrant startup ecosystem. Our mission is to
                  bridge the gap between academic learning and real-world
                  entrepreneurship by providing students with the resources,
                  connections, and guidance they need to build meaningful
                  businesses. Through workshops, bootcamps, hackathons, and
                  mentorship programs, we create opportunities for students to
                  develop their entrepreneurial skills, validate their ideas,
                  and connect with industry experts and potential investors. We
                  believe in fostering a culture of innovation, collaboration,
                  and action-oriented learning that prepares the next generation
                  of founders and changemakers.
                </p>
              </div>
            </FadeInSection>
          </div>
        </FadeInSection>
        <SectionErrorBoundary>
          <FadeInSection>
            <Events />
          </FadeInSection>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary>
          <FadeInSection>
            <Blogssec />
          </FadeInSection>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary>
          <DeferredSection
            fallback={<LoadingComponent text="Loading Gallery..." height="h-[600px]" isScrolling={isScrolling} />}
            rootMargin="500px 0px"
            scrollVelocityThreshold={2}
            loadingDelay={isScrolling ? 300 : 100}
            enableScrollAwareness={true}
          >
            <FadeInSection>
              <Gallery />
            </FadeInSection>
          </DeferredSection>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary>
          <DeferredSection
            fallback={<LoadingComponent text="Loading Features..." height="h-[600px]" isScrolling={isScrolling} />}
            rootMargin="500px 0px"
            scrollVelocityThreshold={2}
            loadingDelay={isScrolling ? 300 : 100}
            enableScrollAwareness={true}
          >
            <FadeInSection>
              <RadialOrbitalFeatureSection />
            </FadeInSection>
          </DeferredSection>
        </SectionErrorBoundary>
        
        <SectionErrorBoundary>
          <DeferredSection
            fallback={<LoadingComponent text="Loading Mentors..." height="h-[500px]" isScrolling={isScrolling} />}
            rootMargin="500px 0px"
            scrollVelocityThreshold={2}
            loadingDelay={isScrolling ? 300 : 100}
            enableScrollAwareness={true}
          >
            <FadeInSection>
              <Jordon />
            </FadeInSection>
          </DeferredSection>
        </SectionErrorBoundary>

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
        <SectionErrorBoundary>
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
        </SectionErrorBoundary>
        <FooterSection />
      </div>

      {/* Floating Contact Button */}
      {!isModalOpen && <FloatingContactButton openModal={openModal} />}
    </main>
  );
};

export default Home;
