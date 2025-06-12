"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaRocket, FaLightbulb, FaUsers, FaTrophy } from "react-icons/fa";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const features = [
    {
      icon: <FaRocket className="text-3xl text-blue-400" />,
      title: "Innovation Hub",
      description: "Fostering creativity and breakthrough ideas",
    },
    {
      icon: <FaLightbulb className="text-3xl text-yellow-400" />,
      title: "Mentorship",
      description: "Expert guidance from industry leaders",
    },
    {
      icon: <FaUsers className="text-3xl text-green-400" />,
      title: "Community",
      description: "Building strong entrepreneurial networks",
    },
    {
      icon: <FaTrophy className="text-3xl text-purple-400" />,
      title: "Success Stories",
      description: "Celebrating achievements and milestones",
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="heading mb-6">
            About <span className="text-gradient">E-Cell IET Lucknow</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gradient mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Entrepreneurship Cell (E-Cell) at IET Lucknow is a dynamic
                student-driven initiative dedicated to fostering innovation,
                entrepreneurial thinking, and startup culture on campus. We
                believe that every great idea deserves a chance to grow.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Through workshops, speaker sessions, business competitions, and
                networking events, we bridge the gap between theoretical
                knowledge and real-world startup challenges. We provide aspiring
                entrepreneurs with access to industry experts, venture
                capitalists, and successful alumni.
              </p>
            </motion.div>

            <motion.div
              className="glass-effect p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold text-blue-400 mb-3">
                What We Do
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Startup incubation and mentorship programs
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Investment pitching and funding opportunities
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Hackathons and innovation challenges
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Leadership and skill development workshops
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-effect p-6 rounded-xl text-center card-hover group"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            className="glass-effect p-8 rounded-2xl max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Whether you're an aspiring entrepreneur, a mentor, or an investor,
              E-Cell IET Lucknow welcomes you to be part of our growing
              community of innovators and changemakers.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved Today 🚀
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;