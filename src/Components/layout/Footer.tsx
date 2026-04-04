import { Link } from "react-router-dom";
import { BookOpen, Instagram, Send, Twitter, Youtube } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const currentYear = new Date().getFullYear();
    return (<footer className={`mt-auto border-t pt-16 pb-8 ${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-gray-50 border-black/10"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mg-gold text-black">
                <BookOpen size={20}/>
              </span>
              <span className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Marketgod
              </span>
            </Link>
            <p className={`text-sm leading-relaxed mb-6 font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
              {"The elite trading academy for those who want to stop guessing and start dominating the markets."}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://t.me/marketgodcommunity" target="_blank" rel="noreferrer" aria-label="Telegram" className={`p-2.5 rounded-full transition-all hover:-translate-y-1 ${isDark ? "bg-white/5 text-white/60 hover:bg-mg-gold hover:text-black" : "bg-black/5 text-gray-500 hover:bg-mg-gold hover:text-black"}`}>
                <Send size={18}/>
              </a>
              <a href="https://www.instagram.com/eyram_dela" target="_blank" rel="noreferrer" aria-label="Instagram" className={`p-2.5 rounded-full transition-all hover:-translate-y-1 ${isDark ? "bg-white/5 text-white/60 hover:bg-mg-gold hover:text-black" : "bg-black/5 text-gray-500 hover:bg-mg-gold hover:text-black"}`}>
                <Instagram size={18}/>
              </a>
              <a href="https://www.youtube.com/@marketgodcommunity" target="_blank" rel="noreferrer" aria-label="YouTube" className={`p-2.5 rounded-full transition-all hover:-translate-y-1 ${isDark ? "bg-white/5 text-white/60 hover:bg-mg-gold hover:text-black" : "bg-black/5 text-gray-500 hover:bg-mg-gold hover:text-black"}`}>
                <Youtube size={18}/>
              </a>
              <a href="https://x.com/eyramdela" target="_blank" rel="noreferrer" aria-label="Twitter" className={`p-2.5 rounded-full transition-all hover:-translate-y-1 ${isDark ? "bg-white/5 text-white/60 hover:bg-mg-gold hover:text-black" : "bg-black/5 text-gray-500 hover:bg-mg-gold hover:text-black"}`}>
                <Twitter size={18}/>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Quick Links"}
            </h3>
            <ul className="space-y-4">
              <li><Link to="/about" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"About Us"}</Link></li>
              <li><Link to="/plans" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Pricing Plans"}</Link></li>
              <li><Link to="/blog" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Blog"}</Link></li>
              <li><Link to="/contact" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Contact"}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Legal"}
            </h3>
            <ul className="space-y-4">
              <li><Link to="/legal#terms" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Terms of Service"}</Link></li>
              <li><Link to="/legal#privacy" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Privacy Policy"}</Link></li>
              <li><Link to="/legal#disclaimer" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Risk Disclaimer"}</Link></li>
            </ul>
          </div>

          {/* Members */}
          <div>
            <h3 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Members"}
            </h3>
            <ul className="space-y-4">
              <li><Link to="/login" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Student Login"}</Link></li>
              <li><Link to="/register" className={`text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-mg-gold" : "text-gray-600 hover:text-mg-gold"}`}>{"Register"}</Link></li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? "border-white/10" : "border-black/10"}`}>
          <p className={`text-sm font-medium ${isDark ? "text-white/40" : "text-gray-500"}`}>&copy; {currentYear} Marketgod Academy. {"All rights reserved."}</p>
          <p className={`text-xs font-medium max-w-xl text-center md:text-right ${isDark ? "text-white/30" : "text-gray-400"}`}>{"Trading involves high risk. Ensure you fully understand these risks before investing."}</p>
        </div>
      </div>
    </footer>);
}
