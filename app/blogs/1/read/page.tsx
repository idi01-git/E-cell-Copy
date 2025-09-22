"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Blog data for blog 1
const blogData = {
  id: 1,
  title: "Scaling Your Business: From Startup to Enterprise",
  description: "Learn the critical strategies and frameworks needed to scale your startup from a small team to a thriving enterprise.",
  image: "/news/7.webp",
  date: "December 10, 2024",
  author: "Shivang",
  link: "https://medium.com/@ecell-iet-lucknow/scaling-your-business-from-startup-to-enterprise",
  category: "Business Strategy",
  content: [
    {
      type: "paragraph",
      text: "The landscape of personal computing is on the cusp of a dramatic transformation. As we venture further into the 21st century, the devices we rely on daily are evolving at an unprecedented pace. This article delves into the next generation of personal computing, exploring the innovative technologies and trends that are set to redefine how we interact with our digital world."
    },
    {
      type: "heading",
      text: "Emerging Technologies"
    },
    {
      type: "paragraph",
      text: "The pace of technological innovation continues to accelerate, creating unprecedented opportunities for entrepreneurs to disrupt traditional industries and create new markets. From artificial intelligence and machine learning to blockchain, quantum computing, and renewable energy technologies, the landscape is ripe with possibilities."
    },
    {
      type: "paragraph",
      text: "Entrepreneurs who can identify the right technology at the right time can build transformative businesses. The key is to stay ahead of the curve and understand how emerging technologies can be applied to solve real-world problems."
    },
    {
      type: "heading",
      text: "Trends Shaping the Future"
    },
    {
      type: "paragraph",
      text: "Behind every successful startup lies a story of perseverance, innovation, and valuable lessons learned. These stories inspire and guide aspiring entrepreneurs on their own journey to success. From Airbnb's journey from selling cereal to becoming a global hospitality giant, to Slack's pivot from a gaming company to a communication platform, these success stories teach us that adaptability and customer focus are key to building sustainable businesses."
    },
    {
      type: "paragraph",
      text: "The future of entrepreneurship is not just about having a great idea—it's about execution, resilience, and the ability to adapt to changing market conditions. Success comes from understanding your customers deeply, building strong teams, and creating value that people are willing to pay for."
    }
  ],
  galleryImages: [
    "/news/7.webp",
    "/news/6.webp", 
    "/news/5.webp",
    "/news/4.webp"
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
