"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Blog data for blog 6
const blogData = {
  id: 6,
  title: "Startup Success Stories: Lessons Learned",
  description: "Discover inspiring stories from successful entrepreneurs and the key lessons that propelled their ventures forward.",
  image: "/news/2.webp",
  date: "January 10, 2025",
  author: "Shivang",
  link: "https://medium.com/@ecell-iet-lucknow/startup-success-stories-lessons-learned",
  category: "Success Stories",
  content: [
    {
      type: "paragraph",
      text: "Behind every successful startup lies a story of perseverance, innovation, and valuable lessons learned. These stories inspire and guide aspiring entrepreneurs on their own journey to success. This collection explores the journeys of remarkable startups and the key insights that can help you navigate your own entrepreneurial path."
    },
    {
      type: "heading",
      text: "The Airbnb Journey"
    },
    {
      type: "paragraph",
      text: "Airbnb's journey from selling cereal to becoming a global hospitality giant is a testament to the power of persistence and adaptability. The founders started with a simple idea to rent out air mattresses in their apartment, but faced numerous rejections and challenges along the way."
    },
    {
      type: "paragraph",
      text: "The key lesson from Airbnb's success is the importance of understanding your customers deeply and being willing to pivot when necessary. They listened to their users, iterated on their product, and built a platform that solved real problems for both hosts and guests."
    },
    {
      type: "heading",
      text: "Slack's Strategic Pivot"
    },
    {
      type: "paragraph",
      text: "Slack's transformation from a gaming company to a communication platform demonstrates the value of recognizing opportunities in unexpected places. The team built an internal communication tool while developing their game, only to realize that the tool was more valuable than the game itself."
    },
    {
      type: "paragraph",
      text: "This story teaches us that success often comes from being open to new possibilities and having the courage to change direction when you discover a better opportunity. The ability to pivot effectively is a crucial skill for any entrepreneur."
    }
  ],
  galleryImages: [
    "/news/2.webp",
    "/news/1.webp", 
    "/news/7.webp",
    "/news/6.webp"
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
      
      <Footer />
    </main>
  );
}
