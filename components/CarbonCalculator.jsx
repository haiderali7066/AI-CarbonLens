"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Zap, Globe2, Cpu } from "lucide-react";

export default function CarbonCalculator() {
  const [model, setModel] = useState("GPT-4");
  const [region, setRegion] = useState("Pakistan");
  const [mode, setMode] = useState("hours"); // 'hours' or 'calls'
  const [usage, setUsage] = useState("");
  const [result, setResult] = useState(null);

  // region carbon intensity (kg CO₂/kWh)
  const regionIntensity = {
    Pakistan: 0.42,
    USA: 0.36,
    Germany: 0.18,
  };

  // model power usage (kWh per hour)
  const modelPower = {
    "GPT-4": 1.2,
    LLaMA: 0.6,
    Gemini: 0.9,
  };

  // average energy per API call (kWh)
  const apiEnergy = {
    "GPT-4": 0.002,
    LLaMA: 0.001,
    Gemini: 0.0015,
  };

  useEffect(() => {
    if (usage > 0) calculate();
  }, [model, usage, region, mode]);

  const calculate = () => {
    let powerUsed = 0;

    if (mode === "hours") {
      powerUsed = usage * modelPower[model];
    } else {
      powerUsed = usage * apiEnergy[model];
    }

    const carbon = powerUsed * regionIntensity[region];
    const treeOffset = (carbon / 21).toFixed(2);
    const bulbHours = (carbon / 0.06).toFixed(0);

    let suggestion;
    if (carbon > 2) {
      suggestion = `⚠️ High impact — Try switching to LLaMA or Germany’s cleaner grid.`;
    } else if (carbon > 1) {
      suggestion = `🌎 Moderate — Consider shorter runtimes or greener hosting.`;
    } else {
      suggestion = `🌿 Excellent — You're running efficiently!`;
    }

    setResult({
      carbon: carbon.toFixed(3),
      powerUsed: powerUsed.toFixed(3),
      treeOffset,
      bulbHours,
      suggestion,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/80 via-purple-900/70 to-fuchsia-900/70 p-6 border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
      {/* Animated glowing bg */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.25)_0%,transparent_70%)] blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-white text-center tracking-wide"
      >
        🌍 AI Carbon Impact Calculator
      </motion.h2>

      {/* Mode selector */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => setMode("hours")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "hours"
              ? "bg-indigo-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          🕒 By Hours
        </button>
        <button
          onClick={() => setMode("calls")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "calls"
              ? "bg-indigo-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          ⚙️ By API Calls
        </button>
      </div>

      <div className="grid gap-5">
        <div>
          <label className="text-gray-300 text-sm">AI Model</label>
          <select
            className="w-full mt-1 bg-white/10 border border-white/20 text-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option className="text-black">GPT-4</option>
            <option className="text-black">LLaMA</option>
            <option className="text-black">Gemini</option>
          </select>
        </div>

        <div>
          <label className="text-gray-300 text-sm">
            {mode === "hours" ? "Usage (hours)" : "API Calls (requests)"}
          </label>
          <input
            type="number"
            min="1"
            placeholder={mode === "hours" ? "e.g. 3" : "e.g. 500"}
            className="w-full mt-1 bg-white/10 border border-white/20 text-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm">Region</label>
          <select
            className="w-full mt-1 bg-white/10 border border-white/20 text-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option className="text-black">Pakistan</option>
            <option className="text-black">USA</option>
            <option className="text-black">Germany</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-6 text-gray-100 shadow-inner backdrop-blur-lg"
          >
            <h3 className="text-lg font-semibold text-indigo-300 mb-3">
              📊 Environmental Summary
            </h3>

            {/* Progress indicator */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Low</span>
                <span>High</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
                <motion.div
                  className={`h-full ${
                    result.carbon > 2
                      ? "bg-red-500"
                      : result.carbon > 1
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      result.carbon > 2 ? 100 : result.carbon > 1 ? 70 : 40
                    }%`,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <ResultItem
                icon={<Globe2 className="text-blue-400" size={18} />}
                label="CO₂ Emissions"
                value={`${result.carbon} kg`}
              />
              <ResultItem
                icon={<Zap className="text-yellow-400" size={18} />}
                label="Energy Used"
                value={`${result.powerUsed} kWh`}
              />
              <ResultItem
                icon={<Leaf className="text-green-400" size={18} />}
                label="Equivalent"
                value={`${result.bulbHours} bulb-hours / ${result.treeOffset} trees`}
              />
              <ResultItem
                icon={<Cpu className="text-pink-400" size={18} />}
                label="Calculation Mode"
                value={mode === "hours" ? "By Usage Hours" : "By API Calls"}
              />
            </div>

            <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/10">
              <p
                className={`font-semibold text-center ${
                  result.carbon > 2
                    ? "text-red-400"
                    : result.carbon > 1
                    ? "text-yellow-300"
                    : "text-green-400"
                }`}
              >
                {result.suggestion}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg border border-white/10">
      {icon}
      <div>
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-gray-100 font-medium">{value}</p>
      </div>
    </div>
  );
}
