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
        The Future of<span className="text-purple"> Entrepreneurship</span>
      </h1>
      <div className=" container mt-[35px] w-full items-center justify-center ">
        <BackgroundGradient className="rounded-[22px] w-xl p-8 sm:p-10 bg-shivansh ">
          <Image
            src={`/news.jpg`}
            alt="Future of Entrepreneurship"
            height="400"
            width="600"
            className="mx-auto "
          />
          <p className="text-base sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
            The Future of Entrepreneurship in 2025
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Published on January 15, 2025
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed">
            As we step into 2025, the entrepreneurial landscape is undergoing
            unprecedented transformation. The convergence of artificial
            intelligence, sustainable technologies, and global connectivity is
            creating new opportunities for innovative thinkers and bold
            visionaries.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            Key trends shaping the future include the rise of AI-powered
            business solutions, the growing emphasis on sustainability and
            social impact, and the democratization of entrepreneurship through
            digital platforms. Entrepreneurs who adapt to these changes and
            leverage emerging technologies will be well-positioned for success
            in the coming years.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            The future belongs to those who can think beyond traditional
            business models and embrace the opportunities presented by rapid
            technological advancement and changing consumer preferences.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Author - Shivansh Kaushik</span>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
}
