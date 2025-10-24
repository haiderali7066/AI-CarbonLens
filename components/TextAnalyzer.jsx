"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TextAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeText = async () => {
    if (!text.trim()) return;

    // Simple local analysis logic
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    const biasWords = ["hate", "kill", "stupid", "ugly", "dumb"];
    const aiTerms = ["AI", "machine", "model", "data"];
    const biasCount = biasWords.filter((w) =>
      text.toLowerCase().includes(w)
    ).length;
    const aiMention = aiTerms.some((w) => text.toLowerCase().includes(w));

    let biasLevel = "Low";
    if (biasCount >= 2) biasLevel = "High";
    else if (biasCount === 1) biasLevel = "Medium";

    let inclusivityScore = 100 - biasCount * 25;
    if (!aiMention) inclusivityScore -= 10;

    let suggestion = "";
    if (biasLevel === "High") {
      suggestion =
        "⚠️ This text contains biased or harmful language. Try rephrasing with empathy and neutrality.";
    } else if (biasLevel === "Medium") {
      suggestion =
        "⚖️ Some words may sound biased. Consider more inclusive alternatives.";
    } else if (inclusivityScore > 90) {
      suggestion = "🌿 Excellent! The text is inclusive and ethically sound.";
    } else {
      suggestion =
        "💡 Slight improvements can make this more ethically balanced.";
    }

    setResult({
      wordCount,
      biasLevel,
      inclusivityScore,
      suggestion,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-pink-600/30 transition-all duration-500"
    >
      <h2 className="text-2xl font-semibold mb-4 text-pink-300">
        🧠 Ethical Text Analyzer
      </h2>

      <textarea
        placeholder="Paste or type your text here..."
        className="bg-transparent border border-white/20 p-3 rounded-md w-full text-gray-100 h-40 resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={analyzeText}
        className="bg-pink-500 hover:bg-pink-600 transition text-white font-semibold rounded-md py-2 mt-3 w-full"
      >
        Analyze
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10 space-y-3"
        >
          <h3 className="text-lg font-medium text-pink-300">📋 Results</h3>
          <p className="text-gray-200">
            <strong>Word Count:</strong> {result.wordCount}
          </p>
          <p className="text-gray-200">
            <strong>Bias Level:</strong>{" "}
            <span
              className={`${
                result.biasLevel === "High"
                  ? "text-red-400"
                  : result.biasLevel === "Medium"
                  ? "text-yellow-300"
                  : "text-green-400"
              }`}
            >
              {result.biasLevel}
            </span>
          </p>
          <p className="text-gray-200">
            <strong>Inclusivity Score:</strong> {result.inclusivityScore}/100
          </p>

          <p
            className={`text-sm mt-3 ${
              result.biasLevel === "High"
                ? "text-red-400"
                : result.biasLevel === "Medium"
                ? "text-yellow-300"
                : "text-green-400"
            }`}
          >
            {result.suggestion}
          </p>
        </motion.div>
      )}

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-500/10 via-transparent to-indigo-500/10 blur-3xl rounded-2xl"></div>
    </motion.div>
  );
}
