export default function Footer() {
  return (
    <footer className="bg-[#0b0b15] text-gray-400 mt-24 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <h3 className="text-white font-semibold text-lg">AI CarbonLens</h3>
          <p className="text-sm mt-2 text-gray-500 leading-relaxed">
            Tracking carbon emissions from AI usage & promoting ethical,
            inclusive AI practices. Built for the Arfa Tower Hackathon 2025.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Footer Info */}
        <div>
          <h4 className="text-white font-medium mb-3">Connect</h4>
          <p className="text-sm text-gray-500 mb-2">
            Have ideas or feedback? Reach out and contribute to a greener AI
            future.
          </p>
          <a
            href="mailto:team@aicarbonlens.com"
            className="inline-block mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-md px-3 py-2"
          >
            team@aicarbonlens.com
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} AI CarbonLens — Ethical & Inclusive AI for
        a Sustainable Future 🌍
      </div>
    </footer>
  );
}
