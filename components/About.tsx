"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Link from "next/link";

const About = () => {
  return (
    <CardContainer className="inter-var  w-full "  >
      <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-shivansh dark:border-white/[0.2] border-black/[0.1] w-full  h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-3xl w-full font-bold text-neutral-600 dark:text-white"
        >
          About E-Cell, IET Lucknow
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-md max-w-full mt-2 dark:text-neutral-300"
        >
          Entrepreneurship Cell (E-Cell) at IET Lucknow is a dynamic
          student-driven initiative dedicated to fostering innovation,
          entrepreneurial thinking, and startup culture on campus. Our mission
          is to inspire and empower students to explore the world of
          entrepreneurship by providing them with the necessary resources,
          mentorship, and networking opportunities. At E-Cell, we believe that
          every great idea deserves a chance to grow. Through workshops, speaker
          sessions, business competitions, and networking events, we aim to
          bridge the gap between theoretical knowledge and real-world startup
          challenges. We provide aspiring entrepreneurs with access to industry
          experts, venture capitalists, and successful alumni to guide them on
          their entrepreneurial journey. Our initiatives include startup
          incubation, investment pitching, hackathons, and leadership programs
          that help students transform their innovative ideas into successful
          businesses. By fostering a culture of creativity, risk-taking, and
          problem-solving, E-Cell IET Lucknow serves as a launchpad for future
          leaders and changemakers. Join us in shaping the future of
          entrepreneurship and innovation. Whether you are an aspiring
          entrepreneur, a mentor, or an investor, E-Cell IET Lucknow welcomes
          you to be a part of our growing community! 🚀
        </CardItem>
        
      </CardBody>
    </CardContainer>
  );
};

export default About;
