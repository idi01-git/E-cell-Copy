"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Blog data for blog 3
const blogData = {
  id: 3,
  title: "Funding Your Startup: A Complete Guide",
  description: "Navigate the complex world of startup funding with our comprehensive guide to various financing options.",
  image: "/news/5.webp",
  date: "December 20, 2024",
  author: "Shivang",
  link: "https://medium.com/@ecell-iet-lucknow/funding-your-startup-a-complete-guide",
  category: "Startup Funding",
  content: [
    {
      type: "paragraph",
      text: "Securing funding is one of the most critical challenges that entrepreneurs face when starting their journey. Understanding the various funding options available can make all the difference between success and failure. This comprehensive guide explores the different funding sources and strategies that startups can leverage to fuel their growth."
    },
    {
      type: "heading",
      text: "Bootstrapping Fundamentals"
    },
    {
      type: "paragraph",
      text: "Bootstrapping involves funding your startup using personal savings, revenue from the business, or minimal external capital. This approach gives you complete control over your business decisions and allows you to grow at your own pace without the pressure of external investors."
    },
    {
      type: "paragraph",
      text: "While bootstrapping requires careful financial management and may limit your growth speed, it teaches valuable lessons about resource allocation and customer focus. Many successful companies started as bootstrapped ventures before seeking external funding."
    },
    {
      type: "heading",
      text: "Venture Capital Landscape"
    },
    {
      type: "paragraph",
      text: "Venture capital can provide significant funding and strategic support for high-growth startups. However, it comes with expectations of rapid growth and eventual exit strategies. Understanding the VC landscape, from seed-stage to growth-stage investors, is crucial for startups seeking this type of funding."
    },
    {
      type: "paragraph",
      text: "The key to successful VC funding is having a compelling story, strong team, and clear path to market. VCs look for startups with the potential to become market leaders and generate substantial returns on investment."
    }
  ],
  galleryImages: [
    "/news/5.webp",
    "/news/4.webp", 
    "/news/3.webp",
    "/news/2.webp"
  ]
};

export default function BlogReadPage() {
  return (
    <main className="relative bg-transparent flex justify-center items-center flex-col overflow-hidden mx-auto px-3 sm:px-6 lg:px-10 min-h-screen">
      <Navbar />
      <BackgroundBeams className="z-0" />
      
      <div className="max-w-4xl w-full relative z-10 pt-32">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Blogs</span>
          </Link>
          <span className="text-white/60 mx-2">/</span>
          <span className="text-white/60">{blogData.category}</span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center leading-tight">
          {blogData.title}
        </h1>

        {/* Author and Date */}
        <div className="text-center mb-10">
          <p className="text-white/70 text-sm">
            By {blogData.author} • Published on {blogData.date}
          </p>
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          {blogData.content.map((section, index) => (
            <div key={index} className="mb-6">
              {section.type === "heading" ? (
                <h2 className="text-2xl font-bold text-white mb-4 mt-8 first:mt-0">
                  {section.text}
                </h2>
              ) : (
                <p className="text-white/80 leading-relaxed text-base">
                  {section.text}
                </p>
              )}
            </div>
          ))}
        </article>

        {/* Back to Blogs Button */}
        <div className="mt-12 text-center">
          <Link href="/blogs">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-0 rounded-full"
            >
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
      
      <FooterSection />
    </main>
  );
}
