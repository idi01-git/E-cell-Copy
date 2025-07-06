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
        Digital Marketing<span className="text-purple"> Strategies</span>
      </h1>
      <div className=" container mt-[35px] w-full items-center justify-center ">
        <BackgroundGradient className="rounded-[22px] w-xl p-8 sm:p-10 bg-shivansh ">
          <Image
            src={`/news.jpg`}
            alt="Digital Marketing Strategies"
            height="400"
            width="600"
            className="mx-auto "
          />
          <p className="text-base sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
            Digital Marketing Strategies for Startups
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Published on December 15, 2024
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed">
            In today&apos;s digital age, effective marketing is crucial for
            startup success. Digital marketing offers cost-effective ways to
            reach target audiences and build brand awareness.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            Key digital marketing strategies include content marketing, social
            media engagement, search engine optimization, and email marketing.
            Each channel requires a tailored approach to maximize reach and
            engagement with your target audience.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            Successful digital marketing for startups involves understanding
            your audience, creating valuable content, and consistently engaging
            with customers across multiple platforms. The key is to start small,
            measure results, and scale what works.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Author - Shivansh Kaushik</span>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
}
