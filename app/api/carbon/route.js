import { NextResponse } from "next/server";
import {
  calculateCO2ForUsage,
  regionalFallback,
} from "../../../lib/carbonLogic";

export async function POST(req) {
  const body = await req.json();
  const {
    model,
    requests = 1,
    region = "Pakistan",
    usageType = "requests",
  } = body;

  // usageType could be "requests" or "hours"
  // requests can represent either count or hours depending on usageType

  // Attempt to fetch live carbon intensity if ELECTRICITYMAP_KEY set
  let carbonIntensity = regionalFallback[region] ?? 0.4; // kg CO2/kWh fallback

  const ELECTRICITYMAP_KEY = process.env.ELECTRICITYMAP_KEY || "";

  if (ELECTRICITYMAP_KEY) {
    try {
      // ElectricityMap expects zone codes; this is simplified and may require mapping
      const zone = region;
      const resp = await fetch(
        `https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${encodeURIComponent(
          zone
        )}`,
        { headers: { "auth-token": ELECTRICITYMAP_KEY } }
      );
      if (resp.ok) {
        const j = await resp.json();
        // electricitymap returns gCO2eq/kWh — convert to kg
        if (j.carbonIntensity !== undefined) {
          carbonIntensity = j.carbonIntensity / 1000;
        } else if (j.data && j.data.carbonIntensity !== undefined) {
          carbonIntensity = j.data.carbonIntensity / 1000;
        }
      }
    } catch (e) {
      // fall back silently
      console.log("ElectricityMap fetch failed, using fallback intensity.");
    }
  }

  const result = calculateCO2ForUsage({
    model,
    usageValue: Number(requests),
    usageType,
    carbonIntensity,
  });

  return NextResponse.json({ ...result, carbonIntensity });
}
