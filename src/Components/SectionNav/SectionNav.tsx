import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectionNavProps {
  sections: { id: string; label: string }[];
  isMobile?: boolean;
}

const SectionNav: React.FC<SectionNavProps> = ({ sections, isMobile }) => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return isMobile ? (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full bg-mg-gold flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      >
        {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {open && (
        <ul className="mt-2 bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden border border-mg-charcoal/20 dark:border-mg-paper/20">
          {sections.map((section) => (
            <li
              key={section.id}
              className="px-5 py-3 hover:bg-mg-gold/20 cursor-pointer transition-colors"
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div className="sticky top-20 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md px-4 py-2 rounded-xl max-w-3xl mx-auto flex justify-center gap-6">
      {sections.map((section) => (
        <button
          key={section.id}
          className="px-3 py-2 font-semibold hover:text-mg-gold transition-all"
          onClick={() => scrollToSection(section.id)}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};

export default SectionNav;



