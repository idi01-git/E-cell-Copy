"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingContactButton = ({ openModal }: { openModal: () => void }) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={openModal}
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
        {/* Icon */}
        <div className="relative z-10">
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
        </div>
        {/* Subtle pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full border border-yellow-400/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
      {/* Clean tooltip */}
      <motion.div
        className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        Contact Form
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
      </motion.div>
    </motion.div>
  );
};

export default FloatingContactButton; 