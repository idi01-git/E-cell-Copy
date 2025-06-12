"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaLightbulb, FaUsers } from "react-icons/fa";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
      </div>

      {/* Spotlights */}
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-10 left-full"
        fill="#3b82f6"
      />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#8b5cf6" />

      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 text-blue-400 opacity-30"
      >
        <FaRocket size={40} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-40 right-20 text-purple-400 opacity-30"
        style={{ animationDelay: "1s" }}
      >
        <FaLightbulb size={35} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-40 left-20 text-blue-300 opacity-30"
        style={{ animationDelay: "2s" }}
      >
        <FaUsers size={45} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 text-center max-w-6xl mx-auto px-4"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative inline-block">
            <img
              src="/ecell-logo.png"
              alt="E-Cell Logo"
              className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants}>
          <TextGenerateEffect
            words="Transforming Ideas into Innovation"
            className="text-5xl md:text-7xl font-bold mb-6"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Empowering the next generation of entrepreneurs at{" "}
          <span className="text-gradient font-semibold">IET Lucknow</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="#about"
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Our Journey
              <FaRocket className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
          
          <motion.a
            href="#services"
            className="glass-effect px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300 border border-white/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "500+", label: "Students Inspired" },
            { number: "50+", label: "Startups Mentored" },
            { number: "25+", label: "Events Organized" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-effect p-6 rounded-xl text-center card-hover"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;