"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

const Jordon = () => {
  return (
    <section className="w-full py-20 ">
      <h1 className="heading">
        Our <span className="text-purple">Mentors</span>
      </h1>
      <div className="flex flex-wrap mt-[35px] items-center justify-center ">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-8 sm:p-10 bg-shivansh ">
          <Image
            src={`/vineet.jpg`}
            alt="vineet kansal"
            height="350"
            width="400"
            className="object-contain rounded-[300px] "
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Prof. Vineet Kansal
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Necessitatibus rem id, quaerat nostrum recusandae aperiam iure
            tenetur. Illum cupiditate magnam animi velit voluptate, iure
            deserunt obcaecati sit veritatis? Ducimus nemo consequatur aliquam.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Director, IET LKO</span>
          </button>
        </BackgroundGradient>
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-shivansh">
          <Image
            src={`/vineet.jpg`}
            alt="vineet kansal"
            height="400"
            width="400"
            className="object-contain rounded-[300px]"
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Dr. Pushkar Tripathi
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Necessitatibus rem id, quaerat nostrum recusandae aperiam iure
            tenetur. Illum cupiditate magnam animi velit voluptate, iure
            deserunt obcaecati sit veritatis? Ducimus nemo consequatur aliquam.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Chairman, IIC LKO </span>
          </button>
        </BackgroundGradient>
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-shivansh">
          <Image
            src={`/vineet.jpg`}
            alt="vineet kansal"
            height="400"
            width="400"
            className="object-contain rounded-[300px] "
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Dr. Anurag Verma
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Necessitatibus rem id, quaerat nostrum recusandae aperiam iure
            tenetur. Illum cupiditate magnam animi velit voluptate, iure
            deserunt obcaecati sit veritatis? Ducimus nemo consequatur aliquam.
          </p>
          <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-s font-bold dark:bg-zinc-800">
            <span>Founder, E-cell IET LKO </span>
          </button>
        </BackgroundGradient>
      </div>
    </section>
  );
};

export default Jordon;
