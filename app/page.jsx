"use client";
import Navbar from "@/components/Navbar";
import CarbonCalculator from "@/components/CarbonCalculator";
import TextAnalyzer from "@/components/TextAnalyzer";
import AISuggestionBox from "@/components/AISuggestionBox";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Page() {
  return (
      <>
      <Navbar />
      <main className="relative flex flex-col items-center justify-center px-6 py-10 space-y-10 mt-10">

        <motion.h1
          className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          AI CarbonLens
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Measure your AI’s carbon footprint 🌿 and analyze its ethical language
          🧠 — all in one sleek dashboard.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CarbonCalculator />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TextAnalyzer />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-3xl"
        >
          <AISuggestionBox />
        </motion.div>

      </main>
        <Footer />
    </>
  );
}
