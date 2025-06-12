"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBrain, FaRocket, FaNetworkWired } from "react-icons/fa";

const Approach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const goals = [
    {
      icon: <FaBrain className="text-5xl text-emerald-400" />,
      title: "Promoting Entrepreneurial Mindset",
      description: "An E-Cell fosters an entrepreneurial mindset by encouraging creativity, risk-taking, and problem-solving among students. It organizes workshops, guest lectures, and interactive sessions with industry experts to provide insights into business development.",
      features: ["Creative Workshops", "Risk Assessment Training", "Problem-Solving Sessions", "Industry Expert Talks"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <FaRocket className="text-5xl text-pink-400" />,
      title: "Providing Startup Support",
      description: "E-Cells act as a launchpad for student startups by offering mentorship, funding assistance, and access to incubation facilities. They connect students with industry professionals and investors.",
      features: ["Mentorship Programs", "Funding Assistance", "Incubation Facilities", "Investor Connections"],
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <FaNetworkWired className="text-5xl text-sky-400" />,
      title: "Building Entrepreneurial Ecosystem",
      description: "To create a thriving startup culture, E-Cells establish collaborations with industries, investors, and successful alumni to provide networking and funding opportunities.",
      features: ["Industry Collaborations", "Alumni Network", "Pitch Competitions", "Startup Internships"],
      color: "from-sky-500 to-blue-500"
    }
  ];

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

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="heading mb-6">
            Our <span className="text-gradient">Goals</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Driving innovation and entrepreneurship through strategic initiatives and comprehensive support systems
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Goals Grid */}
        <div className="space-y-16">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <motion.div
                className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {goal.icon}
                  </motion.div>
                  <div className="text-3xl font-bold text-gradient">
                    0{index + 1}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  {goal.title}
                </h3>

                <p className="text-gray-300 leading-relaxed text-lg">
                  {goal.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {goal.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center gap-3 text-sm text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * featureIndex }}
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${goal.color} rounded-full`}></div>
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="glass-effect p-12 rounded-3xl relative overflow-hidden group"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <motion.div
                    className="text-center relative z-10"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6 flex justify-center">
                      {goal.icon}
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`h-2 bg-gradient-to-r ${goal.color} rounded-full mx-auto`}
                          style={{ width: `${80 - i * 20}%` }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: 0.2 * i, duration: 0.6 }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-4 h-4 bg-blue-400 rounded-full opacity-60"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full opacity-60"
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-20"
        >
          <motion.div
            className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-gradient mb-4">
              Ready to Achieve These Goals Together?
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Join us in building a thriving entrepreneurial ecosystem that transforms ideas into impactful ventures.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become Part of Our Mission
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Approach;