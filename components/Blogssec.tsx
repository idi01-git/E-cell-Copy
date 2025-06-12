"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCalendar, FaUser, FaEye } from "react-icons/fa";
import { projects } from "@/data";

const Blogssec = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

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

  const blogData = [
    { date: "Dec 15, 2024", author: "Shivansh Kaushik", views: "1.2k" },
    { date: "Dec 10, 2024", author: "Shivansh Kaushik", views: "980" },
    { date: "Dec 5, 2024", author: "Shivansh Kaushik", views: "1.5k" },
    { date: "Nov 28, 2024", author: "Shivansh Kaushik", views: "2.1k" },
    { date: "Nov 20, 2024", author: "Shivansh Kaushik", views: "1.8k" },
    { date: "Nov 15, 2024", author: "Shivansh Kaushik", views: "1.3k" },
  ];

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden" id="recentprojects">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="heading mb-6">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, stories, and insights from the entrepreneurial world
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Featured Blog */}
        <motion.div variants={itemVariants} className="mb-16">
          <Link href={`/blogs/${projects[0].id}`}>
            <motion.div
              className="glass-effect rounded-2xl overflow-hidden card-hover group cursor-pointer"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={projects[0].img}
                    alt={projects[0].title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendar />
                      {blogData[0].date}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser />
                      {blogData[0].author}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEye />
                      {blogData[0].views}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                    {projects[0].title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {projects[0].des}
                  </p>
                  <div className="flex items-center text-blue-400 font-semibold group-hover:text-white transition-colors duration-300">
                    Read More
                    <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(1).map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/blogs/${blog.id}`}>
                <motion.div
                  className="glass-effect rounded-2xl overflow-hidden card-hover cursor-pointer h-full"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={blog.img}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Newsletter
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <FaCalendar />
                        {blogData[index + 1]?.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye />
                        {blogData[index + 1]?.views}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.des}
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FaUser />
                        {blogData[index + 1]?.author}
                      </div>
                      <div className="flex items-center text-blue-400 text-sm font-semibold group-hover:text-white transition-colors duration-300">
                        Read More
                        <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  ></motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
            <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blogssec;