"use client";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Services = () => {
  return (
    <div className="my-[150px] " id="#services" >
      <h1 className="heading mb-[80px] ">
        Service<span className="text-purple">s</span>
      </h1>
      <ul className="grid grid-cols-1 mb-[80px]  grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Startup Incubation & Mentorship"
          description="Providing aspiring entrepreneurs with expert guidance, mentorship from industry leaders, and incubation support to help transform ideas into scalable startups."
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={
            <Settings className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Workshops & Skill Development"
          description=" Organizing sessions on business development, pitching, financial planning, digital marketing, and emerging technologies to enhance entrepreneurial skills."
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Funding & Investment Opportunities"
          description=" Connecting student startups with angel investors, venture capitalists, and startup grants to help them secure funding and financial backing. We organize pitch sessions, investor meetups, and crowdfunding initiatives to provide financial support and guidance on securing investments. Additionally, we assist startups in applying for government schemes and incubation programs to further accelerate their growth."
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={
            <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Networking & Industry Collaboration "
          description="Facilitating interactions with successful entrepreneurs, corporate leaders, and alumni through networking events, panel discussions, and startup meetups. We collaborate with industry partners, incubators, and accelerators to provide students with exposure to real-world business scenarios. "
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Business Competitions & Hackathons"
          description="Hosting events like pitch competitions, business plan challenges, and hackathons to encourage innovation and provide a platform for students to showcase their ideas. These competitions help students refine their problem-solving skills, develop market-ready solutions, and receive feedback. "
        />
      </ul>
    </div>
  );
};

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-1">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Services;
