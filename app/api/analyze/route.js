import { NextResponse } from "next/server";
import { analyzeTextForEthics } from "../../../lib/analyzeLogic";

export async function POST(req) {
  const { text } = await req.json();
  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }

  const analysis = analyzeTextForEthics(text);
  return NextResponse.json({ analysis });
}
