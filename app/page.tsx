"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Blogssec from "@/components/Blogssec";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Jordon from "@/components/Jordon";
import About from "@/components/About";
import Services from "@/components/Services";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <About />
        <Services />
        <Blogssec />
        <Approach />
        <Jordon />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
