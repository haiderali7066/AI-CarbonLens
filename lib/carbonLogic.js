// Basic model database and calculation utilities

export const models = {
  "GPT-4": { gpuPowerW: 400, util: 0.8, timePerRequestH: 0.02 }, // example approximations
  LLaMA: { gpuPowerW: 300, util: 0.7, timePerRequestH: 0.015 },
  Gemini: { gpuPowerW: 500, util: 0.9, timePerRequestH: 0.025 },
  Custom: { gpuPowerW: 350, util: 0.75, timePerRequestH: 0.02 },
};

// Regional fallback intensities (kg CO2 per kWh)
export const regionalFallback = {
  Pakistan: 0.45,
  USA: 0.35,
  Germany: 0.25,
  China: 0.55,
  India: 0.5,
  "United Kingdom": 0.3,
};

/**
 * calculateCO2ForUsage
 * @param {Object} options
 *   - model: model name
 *   - usageValue: number (requests or hours)
 *   - usageType: 'requests' or 'hours'
 *   - carbonIntensity: kg CO2/kWh
 *
 * returns { energyKWh, co2, equivalence (string), model, region }
 */
export function calculateCO2ForUsage({
  model = "GPT-4",
  usageValue = 1,
  usageType = "requests",
  carbonIntensity = 0.4,
}) {
  const m = models[model] || models["Custom"];
  let totalHours = 0;

  if (usageType === "requests") {
    // assume timePerRequestH per request
    totalHours = (m.timePerRequestH || 0.02) * Number(usageValue);
  } else {
    totalHours = Number(usageValue);
  }

  // energy (kWh) = (W * utilization * hours) / 1000
  const energyKWh = (m.gpuPowerW * m.util * totalHours) / 1000;
  const co2 = energyKWh * Number(carbonIntensity);

  // simple equivalences
  // average car emission ≈ 0.192 kg CO2 per km (varies); using 0.25 here for simplicity
  const kmDriven = (co2 / 0.25).toFixed(2);

  // phone charges: 0.005 kg CO2 per charge approximated
  const phoneCharges = Math.round(co2 / 0.005);

  return {
    model,
    energyKWh,
    co2,
    equivalence: `${kmDriven} km driven (est.)`,
    phoneCharges,
  };
}
