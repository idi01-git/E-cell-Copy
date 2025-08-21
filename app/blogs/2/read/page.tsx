"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Blog data for blog 2
const blogData = {
  id: 2,
  title: "Digital Marketing Strategies for Startups",
  description: "Master the art of digital marketing with proven strategies that can help your startup reach its target audience.",
  image: "/news/6.webp",
  date: "December 15, 2024",
  author: "Shivang",
  link: "https://medium.com/@ecell-iet-lucknow/digital-marketing-strategies-for-startups",
  category: "Digital Marketing",
  content: [
    {
      type: "paragraph",
      text: "In today's digital age, effective marketing is crucial for startup success. Digital marketing offers cost-effective ways to reach target audiences and build brand awareness. This comprehensive guide explores the most effective digital marketing strategies that startups can implement to grow their business and establish a strong online presence."
    },
    {
      type: "heading",
      text: "Content Marketing Excellence"
    },
    {
      type: "paragraph",
      text: "Content marketing remains one of the most effective strategies for building trust and authority in your industry. By creating valuable, relevant content that addresses your audience's pain points, you can attract and retain customers while establishing your brand as a thought leader."
    },
    {
      type: "paragraph",
      text: "Successful content marketing involves understanding your audience deeply, creating a content calendar, and consistently delivering high-quality content across multiple channels including blogs, social media, videos, and podcasts."
    },
    {
      type: "heading",
      text: "Social Media Engagement"
    },
    {
      type: "paragraph",
      text: "Social media platforms provide unprecedented opportunities for startups to connect with their audience directly. The key is to choose the right platforms where your target audience is most active and engage with them authentically."
    },
    {
      type: "paragraph",
      text: "Building a strong social media presence requires consistent posting, engaging with followers, and creating content that resonates with your audience. Remember, social media is about building relationships, not just broadcasting your message."
    }
  ],
  galleryImages: [
    "/news/6.webp",
    "/news/5.webp", 
    "/news/4.webp",
    "/news/3.webp"
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
