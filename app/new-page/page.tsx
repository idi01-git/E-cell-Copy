"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import FadeInSection from "@/components/ui/FadeInSection";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const NewPage = () => {
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
        document.body.style.scrollPaddingTop = "180px";
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-transparent flex justify-center items-center flex-col overflow-hidden mx-auto px-3 sm:px-6 lg:px-10">
      <Navbar />
      <BackgroundPaths
        title="NEW PAGE"
        subtitle="Welcome to Our New Section"
        titleBackground={true}
        backgroundStyle="gradient"
      />
      <BackgroundBeams className="z-0" />
      
      <div className="max-w-7xl w-full relative z-10 pt-12 md:pt-20 lg:pt-32 xl:pt-44">
        {/* Hero Section */}
        <FadeInSection>
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Welcome to Our
              <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                New Page
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto font-light">
              This is a brand new section that seamlessly integrates with your existing website design. 
              It maintains the same visual identity, typography, and user experience.
            </p>
          </div>
        </FadeInSection>

        {/* Content Section */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-24">
            {/* Feature Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-white/70 leading-relaxed">
                Pushing boundaries and exploring new possibilities in entrepreneurship and technology.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Creativity</h3>
              <p className="text-white/70 leading-relaxed">
                Fostering creative thinking and innovative solutions to real-world challenges.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-white/70 leading-relaxed">
                Striving for the highest standards in everything we do and create.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Call to Action Section */}
        <FadeInSection>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join us in building the future of entrepreneurship and innovation. 
              Let&apos;s create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <LiquidButton size="lg">
                Get Started
              </LiquidButton>
              <LiquidButton size="lg" variant="outline">
                Learn More
              </LiquidButton>
            </div>
          </div>
        </FadeInSection>

        {/* Stats Section */}
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 md:mb-24">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-white/70 text-sm md:text-base">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-white/70 text-sm md:text-base">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-white/70 text-sm md:text-base">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-white/70 text-sm md:text-base">Success</div>
            </div>
          </div>
        </FadeInSection>
      </div>

      <FooterSection />
    </main>
  );
};

export default NewPage;
