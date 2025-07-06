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
        Startup Success<span className="text-purple"> Stories</span>
      </h1>
      <div className=" container mt-[35px] w-full items-center justify-center ">
        <BackgroundGradient className="rounded-[22px] w-xl p-8 sm:p-10 bg-shivansh ">
          <Image
            src={`/news.jpg`}
            alt="Startup Success Stories"
            height="400"
            width="600"
            className="mx-auto "
          />
          <p className="text-base sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
            Startup Success Stories: Lessons Learned
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Published on January 10, 2025
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed">
            Behind every successful startup lies a story of perseverance,
            innovation, and valuable lessons learned. These stories inspire and
            guide aspiring entrepreneurs on their own journey to success.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            From Airbnb&apos;s journey from selling cereal to becoming a global
            hospitality giant, to Slack&apos;s pivot from a gaming company to a
            communication platform, these success stories teach us that
            adaptability and customer focus are key to building sustainable
            businesses.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            The common thread among successful startups is their ability to
            solve real problems, build strong teams, and maintain resilience in
            the face of challenges. These lessons continue to shape the
            entrepreneurial ecosystem and inspire the next generation of
            innovators.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Author - Shivansh Kaushik</span>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
}
