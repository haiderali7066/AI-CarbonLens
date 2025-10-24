"use client";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { motion } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Carbon intensity (kg CO₂ per kWh)
const regionData = {
  Pakistan: 0.42,
  USA: 0.36,
  Germany: 0.18,
  China: 0.52,
  India: 0.47,
  France: 0.09,
  Brazil: 0.25,
  Canada: 0.21,
};

const colorScale = scaleLinear()
  .domain([0.1, 0.6])
  .range(["#22c55e", "#ef4444"]); // green → red

export default function RegionMap({ setRegion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg shadow-lg"
    >
      <h3 className="text-lg font-semibold text-indigo-300 mb-2">
        🌎 Energy Intensity by Region
      </h3>

      <ComposableMap projectionConfig={{ scale: 120 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const intensity = regionData[name];
              const fill = intensity ? colorScale(intensity) : "#444";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#222"
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: "#818cf8",
                      cursor: "pointer",
                      outline: "none",
                    },
                  }}
                  onClick={() => {
                    if (regionData[name]) setRegion(name);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="text-sm text-gray-400 mt-3 text-center">
        Click a region to select and update your calculation
      </div>
    </motion.div>
  );
}
