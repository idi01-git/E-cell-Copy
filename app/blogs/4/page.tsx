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
        Building a Strong<span className="text-purple"> Team</span>
      </h1>
      <div className=" container mt-[35px] w-full items-center justify-center ">
        <BackgroundGradient className="rounded-[22px] w-xl p-8 sm:p-10 bg-shivansh ">
          <Image
            src={`/news.jpg`}
            alt="Building a Strong Team"
            height="400"
            width="600"
            className="mx-auto "
          />
          <p className="text-base sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
            Building a Strong Team: The Foundation of Success
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Published on December 28, 2024
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed">
            The success of any startup or business venture depends heavily on
            the strength and cohesion of its team. Building the right team is
            often the difference between success and failure.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            Key elements of team building include hiring for cultural fit,
            fostering open communication, and creating an environment where
            diverse perspectives are valued. Great teams are built on trust,
            mutual respect, and shared vision.
          </p>
          <p className="text-sm text-black dark:text-neutral-300 leading-relaxed mt-4">
            Effective team management involves setting clear goals, providing
            regular feedback, and creating opportunities for growth and
            development. When team members feel valued and supported, they are
            more likely to contribute their best work and stay committed to the
            company&apos;s mission.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Author - Shivansh Kaushik</span>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
}
