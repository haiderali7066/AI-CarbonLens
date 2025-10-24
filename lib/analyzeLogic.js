// Simple rule-based analyzer for inclusivity & ethical phrasing

export function analyzeTextForEthics(text) {
  const checks = [];

  const lower = text.toLowerCase();

  // 1. Gendered language check
  const hasHe = /\b(he|him|his)\b/i.test(text);
  const hasShe = /\b(she|her|hers)\b/i.test(text);
  if (hasHe && !hasShe) {
    checks.push({
      type: "suggest",
      title: "Gendered language",
      message:
        "Text heavily uses male pronouns. Consider using gender-neutral language (they/them) where appropriate.",
      suggestion:
        "Replace specific pronouns with neutral ones when gender is unknown.",
    });
  }

  // 2. Ableist language
  const ableist = /\b(cripple|retard|invalid|handicapped)\b/i;
  if (ableist.test(lower)) {
    checks.push({
      type: "warn",
      title: "Ableist language detected",
      message:
        "Terms that may be offensive to people with disabilities were found. Use person-first or neutral language.",
      suggestion:
        "Use 'person with a disability' or neutral descriptions instead.",
    });
  }

  // 3. Region/poverty insensitive language
  const povertyTerms = /\b(third world|poor countries)\b/i;
  if (povertyTerms.test(lower)) {
    checks.push({
      type: "suggest",
      title: "Insensitive geographic phrasing",
      message: "Avoid outdated or potentially condescending terms.",
      suggestion:
        "Use 'developing countries' or specify particular regions/countries.",
    });
  }

  // 4. Hate speech / slurs (very basic)
  const slur = /\b(nigger|faggot|chink|kike)\b/i;
  if (slur.test(lower)) {
    checks.push({
      type: "warn",
      title: "Hate speech",
      message:
        "Potential slur detected. Remove offensive slurs. This is harmful content.",
      suggestion:
        "Completely remove slurs and replace with neutral descriptors.",
    });
  }

  // 5. Politeness / tone (simple sentiment-ish heuristic)
  const negativeWords = /\b(hate|stupid|useless|terrible)\b/i;
  if (negativeWords.test(lower)) {
    checks.push({
      type: "suggest",
      title: "Harsh tone",
      message:
        "Text may be perceived as harsh or disrespectful. Consider softening language for constructive tone.",
      suggestion: "Use constructive phrasing and avoid personal attacks.",
    });
  }

  // If nothing flagged
  if (checks.length === 0) {
    checks.push({
      type: "ok",
      title: "No major issues found",
      message:
        "Text appears generally inclusive and neutral based on simple rule checks.",
    });
  }

  // Also provide a short suggested rewrite for a common pattern (optional)
  const rewrites = [];
  if (hasHe && !hasShe) {
    rewrites.push({
      original: text,
      rewrite: text.replace(/\b(he|him|his)\b/gi, "they"),
    });
  }

  return [
    ...checks,
    ...(rewrites.length
      ? rewrites.map((r) => ({
          type: "suggest",
          title: "Suggested rewrite",
          message: r.rewrite,
        }))
      : []),
  ];
}
