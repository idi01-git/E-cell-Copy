"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Blog data for blog 5
const blogData = {
  id: 5,
  title: "Innovation in Technology: What's Next?",
  description: "Dive into the latest technological innovations and how they're creating new opportunities for entrepreneurs.",
  image: "/news/3.webp",
  date: "January 5, 2025",
  author: "Shivang",
  link: "https://medium.com/@ecell-iet-lucknow/innovation-in-technology-whats-next",
  category: "Technology Innovation",
  content: [
    {
      type: "paragraph",
      text: "The pace of technological innovation continues to accelerate, creating unprecedented opportunities for entrepreneurs to disrupt traditional industries and create new markets. This exploration delves into the cutting-edge technologies that are reshaping our world and opening new frontiers for business innovation."
    },
    {
      type: "heading",
      text: "Artificial Intelligence Revolution"
    },
    {
      type: "paragraph",
      text: "Artificial intelligence is transforming every industry, from healthcare to finance to manufacturing. Entrepreneurs who can harness the power of AI to solve real-world problems are creating groundbreaking solutions that were unimaginable just a few years ago."
    },
    {
      type: "paragraph",
      text: "The key to successful AI implementation is understanding how to apply these technologies to specific use cases that provide genuine value to customers. From machine learning algorithms to natural language processing, AI offers endless possibilities for innovation."
    },
    {
      type: "heading",
      text: "Blockchain and Web3"
    },
    {
      type: "paragraph",
      text: "Blockchain technology is revolutionizing how we think about trust, ownership, and digital transactions. The emergence of Web3 is creating new opportunities for entrepreneurs to build decentralized applications and services that give users more control over their data and digital assets."
    },
    {
      type: "paragraph",
      text: "From decentralized finance to non-fungible tokens to decentralized autonomous organizations, blockchain is enabling new business models that challenge traditional centralized systems."
    }
  ],
  galleryImages: [
    "/news/3.webp",
    "/news/2.webp", 
    "/news/1.webp",
    "/news/7.webp"
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
