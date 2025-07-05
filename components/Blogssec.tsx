"use client";

import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import BlogCarousel from "./ui/BlogCarousel";

const Blogssec = () => {
  return (
    <div id="blogs">
      <BlogCarousel />
    </div>
  );
};

export default Blogssec;
