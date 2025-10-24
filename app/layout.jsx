import "./globals.css";

export const metadata = {
  title: "AI CarbonLens",
  description: "Ethical & Sustainable AI Toolkit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-white min-h-screen overflow-x-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.2),transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.2),transparent_70%)] animate-pulse"></div>

        {children}
      </body>
    </html>
  );
}
