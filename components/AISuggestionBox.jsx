export default function AISuggestionBox() {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg text-center animate-pulse">
      <p className="text-indigo-300 text-lg">
        "Try switching to a lighter model for everyday tasks (e.g., LLaMA)." <br />
        "Running compute in low-carbon grids (e.g., Germany) reduces CO₂
        significantly.", <br/> "Cache frequent requests to avoid repeated inference.”
      </p>
    </div>
  );
}
