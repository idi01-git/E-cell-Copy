"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Jordon = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const mentors = [
    {
      name: "Prof. Vineet Kansal",
      role: "Director, IET LKO",
      image: "/vineet.jpg",
      description: "Visionary leader with over 20 years of experience in engineering education and innovation. Passionate about fostering entrepreneurial culture in academic institutions.",
      expertise: ["Strategic Leadership", "Innovation Management", "Academic Excellence"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "director@ietlucknow.ac.in"
      }
    },
    {
      name: "Dr. Pushkar Tripathi",
      role: "Chairman, IIC LKO",
      image: "/vineet.jpg",
      description: "Renowned researcher and innovation catalyst with extensive experience in startup mentoring and technology commercialization.",
      expertise: ["Research & Development", "Technology Transfer", "Startup Mentoring"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "chairman.iic@ietlucknow.ac.in"
      }
    },
    {
      name: "Dr. Anurag Verma",
      role: "Founder, E-cell IET LKO",
      image: "/vineet.jpg",
      description: "Pioneer in establishing entrepreneurial culture at IET Lucknow. Expert in business development and student mentorship programs.",
      expertise: ["Entrepreneurship", "Business Development", "Student Mentoring"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "founder.ecell@ietlucknow.ac.in"
      }
    }
  ];

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

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/10 to-transparent"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="heading mb-6">
            Our <span className="text-gradient">Mentors</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet the visionary leaders who guide and inspire our entrepreneurial journey
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className="glass-effect rounded-2xl overflow-hidden card-hover h-full"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className="relative w-full h-64"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </motion.div>
                  
                  {/* Social Links Overlay */}
                  <motion.div
                    className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: -20 }}
                    whileHover={{ y: 0 }}
                  >
                    <motion.a
                      href={mentor.social.linkedin}
                      className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedin size={14} />
                    </motion.a>
                    <motion.a
                      href={mentor.social.twitter}
                      className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTwitter size={14} />
                    </motion.a>
                    <motion.a
                      href={`mailto:${mentor.social.email}`}
                      className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEnvelope size={14} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name and Role */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {mentor.name}
                    </h3>
                    <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {mentor.role}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {mentor.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-gray-400">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <motion.button
                    className="w-full glass-effect py-2 px-4 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Connect with {mentor.name.split(' ')[0]}
                  </motion.button>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                ></motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.div
            className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-6xl text-blue-400 mb-4 opacity-50"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              "
            </motion.div>
            <blockquote className="text-xl text-gray-300 leading-relaxed mb-6 italic">
              "The best way to predict the future is to create it. Our mentors are here to guide you on this incredible journey of innovation and entrepreneurship."
            </blockquote>
            <div className="text-gradient font-semibold">
              - E-Cell IET Lucknow Team
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Jordon;