"use client";
import React from "react";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";
import { MotionConfig } from "framer-motion";

export default function BlogsPage() {
  return (
    <div className="p-6 bg-shivansh ">
      <h1 className="heading">
        Innovation in<span className="text-purple"> Technology</span>
      </h1>
      <div className=" container mt-[35px] w-full items-center justify-center ">
        <BackgroundGradient className="rounded-[22px] w-xl p-8 sm:p-10 bg-shivansh ">
          <Image
            src={`/news.jpg`}
            alt="Innovation in Technology"
            height="400"
            width="600"
            className="mx-auto "
          />
          <p className="text-base sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
            Innovation in Technology: What&apos;s Next?
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Published on January 5, 2025
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed">
            The pace of technological innovation continues to accelerate,
            creating unprecedented opportunities for entrepreneurs to disrupt
            traditional industries and create new markets.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            From artificial intelligence and machine learning to blockchain,
            quantum computing, and renewable energy technologies, the landscape
            is ripe with possibilities. Entrepreneurs who can identify the right
            technology at the right time can build transformative businesses.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            The key to success lies not just in understanding the technology
            itself, but in identifying how it can solve real-world problems and
            create value for customers. The most successful tech entrepreneurs
            are those who bridge the gap between cutting-edge innovation and
            practical application.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Author - Shivansh Kaushik</span>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
}
