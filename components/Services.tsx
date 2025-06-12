"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FaRocket, 
  FaGraduationCap, 
  FaDollarSign, 
  FaNetworkWired, 
  FaTrophy,
  FaLightbulb 
} from "react-icons/fa";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const services = [
    {
      icon: <FaRocket className="text-4xl text-blue-400" />,
      title: "Startup Incubation & Mentorship",
      description: "Providing aspiring entrepreneurs with expert guidance, mentorship from industry leaders, and incubation support to help transform ideas into scalable startups.",
      features: ["1-on-1 Mentoring", "Business Model Validation", "Product Development Support"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaGraduationCap className="text-4xl text-green-400" />,
      title: "Workshops & Skill Development",
      description: "Organizing sessions on business development, pitching, financial planning, digital marketing, and emerging technologies to enhance entrepreneurial skills.",
      features: ["Technical Workshops", "Soft Skills Training", "Industry Certifications"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaDollarSign className="text-4xl text-yellow-400" />,
      title: "Funding & Investment Opportunities",
      description: "Connecting student startups with angel investors, venture capitalists, and startup grants to help them secure funding and financial backing.",
      features: ["Investor Meetups", "Pitch Sessions", "Grant Applications"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaNetworkWired className="text-4xl text-purple-400" />,
      title: "Networking & Industry Collaboration",
      description: "Facilitating interactions with successful entrepreneurs, corporate leaders, and alumni through networking events, panel discussions, and startup meetups.",
      features: ["Alumni Network", "Industry Partnerships", "Corporate Collaborations"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaTrophy className="text-4xl text-red-400" />,
      title: "Business Competitions & Hackathons",
      description: "Hosting events like pitch competitions, business plan challenges, and hackathons to encourage innovation and provide a platform for students to showcase their ideas.",
      features: ["Pitch Competitions", "Innovation Challenges", "Tech Hackathons"],
      color: "from-red-500 to-rose-500"
    },
    {
      icon: <FaLightbulb className="text-4xl text-indigo-400" />,
      title: "Innovation Labs & Resources",
      description: "Access to state-of-the-art facilities, research resources, and collaborative spaces designed to foster creativity and breakthrough innovations.",
      features: ["Co-working Spaces", "Research Facilities", "Prototyping Labs"],
      color: "from-indigo-500 to-blue-500"
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
    <section ref={ref} className="py-20 px-4 relative overflow-hidden" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="heading mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive support system designed to nurture entrepreneurial talent and transform innovative ideas into successful ventures
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                className="glass-effect p-8 rounded-2xl h-full card-hover relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Icon */}
                <motion.div
                  className="mb-6 relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-2xl transition-all duration-300">
                    {service.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                ></motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-gradient mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Join hundreds of students who have transformed their ideas into successful ventures with our comprehensive support system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply for Incubation
              </motion.button>
              <motion.button
                className="glass-effect px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Consultation
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;