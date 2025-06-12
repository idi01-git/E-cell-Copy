"use client";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: "#", label: "GitHub" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Blogs", href: "#recentprojects" },
    { name: "Contact", href: "#contact" },
  ];

  const programs = [
    { name: "Startup Incubation", href: "#" },
    { name: "Mentorship Program", href: "#" },
    { name: "Workshops", href: "#" },
    { name: "Competitions", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black pt-20 pb-10 overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.img
                src="/ecell-logo.png"
                alt="E-Cell Logo"
                className="w-12 h-12"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <div>
                <h3 className="text-2xl font-bold text-gradient">E-Cell IET Lucknow</h3>
                <p className="text-gray-400 text-sm">Entrepreneurship Cell</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Empowering the next generation of entrepreneurs through innovation, 
              mentorship, and comprehensive support systems. Join us in transforming 
              ideas into successful ventures.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaMapMarkerAlt className="text-blue-400" />
                <span className="text-sm">IET Lucknow, Sitapur Road, Lucknow</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope className="text-blue-400" />
                <span className="text-sm">ecell@ietlucknow.ac.in</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaPhone className="text-blue-400" />
                <span className="text-sm">+91 522 2791238</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Programs</h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <motion.li key={index}>
                  <motion.a
                    href={program.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {program.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-effect p-6 rounded-2xl mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest updates on events, opportunities, and success stories.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <motion.button
                className="btn-primary px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; 2024 E-Cell IET Lucknow. All rights reserved.</p>
              <p className="mt-1">Designed & Developed by <span className="text-gradient font-semibold">Shivansh Kaushik</span></p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-30"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </footer>
  );
};

export default Footer;