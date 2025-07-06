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
        Funding Your<span className="text-purple"> Startup</span>
      </h1>
      <div className=" container mt-[35px] w-full items-center justify-center ">
        <BackgroundGradient className="rounded-[22px] w-xl p-8 sm:p-10 bg-shivansh ">
          <Image
            src={`/news.jpg`}
            alt="Funding Your Startup"
            height="400"
            width="600"
            className="mx-auto "
          />
          <p className="text-base sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
            Funding Your Startup: A Complete Guide
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Published on December 20, 2024
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed">
            Securing funding is one of the most critical challenges that
            entrepreneurs face when starting their journey. Understanding the
            various funding options available can make all the difference.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            From bootstrapping and crowdfunding to angel investors and venture
            capital, each funding source has its own advantages and
            requirements. The key is to choose the right funding strategy that
            aligns with your business model and growth plans.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            Successful fundraising requires a compelling pitch, solid business
            plan, and clear demonstration of market potential. Entrepreneurs
            must be prepared to answer tough questions and show how their
            startup will generate returns for investors.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Author - Shivansh Kaushik</span>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
}
