"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/30"
          >
            AC
          </motion.div>
          <div>
            <div className="font-semibold text-white text-lg tracking-wide">
              AI CarbonLens
            </div>
            <div className="text-xs text-gray-400 tracking-tight">
              Sustainable & Ethical AI
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a
            href="#"
            className="text-gray-300 hover:text-white hover:underline transition-all duration-200"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white hover:underline transition-all duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white hover:underline transition-all duration-200"
          >
            Dashboard
          </a>
        </div>
      </div>

      {/* Animated gradient line */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-green-400 via-blue-500 to-pink-500"
        animate={{ backgroundPosition: ["0%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        }}
      />
    </motion.nav>
  );
}
