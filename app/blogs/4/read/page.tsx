"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Blog data for blog 4
const blogData = {
  id: 4,
  title: "Building a Strong Team: The Foundation of Success",
  description: "Learn the essential strategies for building and managing a high-performing team in your startup journey.",
  image: "/news/4.webp",
  date: "December 28, 2024",
  author: "Shivang",
  link: "https://medium.com/@ecell-iet-lucknow/building-a-strong-team-the-foundation-of-success",
  category: "Team Building",
  content: [
    {
      type: "paragraph",
      text: "The success of any startup or business venture depends heavily on the strength and cohesion of its team. Building the right team is often the difference between success and failure. This comprehensive guide explores the essential strategies for creating and managing high-performing teams that drive business growth and innovation."
    },
    {
      type: "heading",
      text: "Hiring for Cultural Fit"
    },
    {
      type: "paragraph",
      text: "While technical skills are important, cultural fit is equally crucial when building a team. Employees who align with your company's values, mission, and work style are more likely to be engaged, productive, and committed to long-term success."
    },
    {
      type: "paragraph",
      text: "Creating a strong company culture starts with clearly defining your values and mission. During the hiring process, look for candidates who not only have the required skills but also demonstrate alignment with your company's culture and values."
    },
    {
      type: "heading",
      text: "Fostering Communication"
    },
    {
      type: "paragraph",
      text: "Open and effective communication is the backbone of any successful team. Creating an environment where team members feel comfortable sharing ideas, concerns, and feedback leads to better collaboration and problem-solving."
    },
    {
      type: "paragraph",
      text: "Regular team meetings, one-on-one check-ins, and transparent communication channels help build trust and ensure everyone is aligned with company goals. Remember, great teams are built on trust, mutual respect, and shared vision."
    }
  ],
  galleryImages: [
    "/news/4.webp",
    "/news/3.webp", 
    "/news/2.webp",
    "/news/1.webp"
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
