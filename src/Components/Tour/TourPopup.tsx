import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function TourPopup() {
  const [open, setOpen] = useState(false);

  const tourDates = [
    { city: "Ho", date: "21 Feb" },
    { city: "Takoradi", date: "7 Mar" },
    { city: "Kumasi", date: "21 Mar" },
    { city: "Tamale", date: "28 Mar" },
    { city: "Koforidua", date: "11 Apr" },
    { city: "Techiman", date: "25 Apr" },
  ];

  const firstUpcoming = 0; // Highlight first city

  // Open popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e : KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex bg-mg-black/80 backdrop-blur-sm px-4 py-10 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      onClick={() => setOpen(false)} // click outside closes
    >
      {/* Outer flex container */}
<div
  className="relative w-full max-w-5xl m-auto rounded-2xl overflow-hidden border-2 border-mg-blue shadow-2xl flex flex-col lg:flex-row bg-mg-dark-surface items-stretch"
  onClick={(e) => e.stopPropagation()}
>
  <button
    onClick={() => setOpen(false)}
    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-mg-gold hover:text-black text-white rounded-full transition-all"
  >
    <X size={20} />
  </button>
  {/* LEFT IMAGE SECTION */}
  <div className="lg:w-1/2 w-full   lg:h-auto relative overflow-hidden flex-shrink-0 pt-5">
    <img
      src="https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp"
      alt="Market God Tour"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
    {/* Badge */}
    <div className="absolute top-4 left-4 bg-mg-gold text-mg-black text-xs font-bold px-3 py-1 rounded-full shadow-gold-glow">
      Marketgod 2026 Ghana Tour
    </div>
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-mg-black/70 via-transparent to-transparent hidden lg:block"></div>
  </div>

  {/* RIGHT CONTENT SECTION */}
  <div className="lg:w-1/2 w-full p-6 lg:p-8 text-mg-dark-text flex flex-col">
    {/* Headline */}
    <h2 className="text-3xl font-bold text-mg-gold mb-4 uppercase tracking-wide">
      The Journey Continues.
    </h2>

    {/* Story */}
    <div className="text-mg-dark-textSecondary space-y-3 text-sm leading-relaxed mb-6 flex-1">
      <p>Every year, he shows up. Every year, traders level up.</p>
      <p>From city to city. From confusion to clarity. From inconsistency to discipline.</p>
      <p>This year again, Market God returns — touring six cities across Ghana.</p>
      <p className="text-mg-white font-medium">
        Not just to teach charts. But to build serious, profitable traders.
      </p>
    </div>

    {/* Tour Dates */}
    <div className="grid grid-cols-2 gap-3 text-sm mb-6">
      {tourDates.map((item, index) => (
        <div
          key={index}
          className={`border rounded-lg px-3 py-2 text-mg-dark-textSecondary ${
            index === firstUpcoming
              ? "border-mg-gold font-semibold text-mg-white shadow-gold-glow"
              : "border-mg-dark-border"
          }`}
        >
          {item.city} — {item.date}
        </div>
      ))}
    </div>

    {/* Psychological Trigger + Extra info */}
    <div className="space-y-2 mb-4 italic text-xs text-mg-dark-textSecondary">
      <p>The serious ones will show up.</p>
      <p>
        If you’ll be attending the tour, make sure you join{" "}
        <a
          href="https://t.me/Livetradewithmarketgodbot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mg-gold underline"
        >
          @livetradewithmarketgodbot
        </a>{" "}
        🔥 Lock in with MARKETGOD and stand a chance to win amazing prizes. Don’t miss out 🚀
      </p>
    </div>

    {/* CTA */}
    <button className="w-full bg-mg-gold text-mg-black font-semibold py-3 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300">
      Secure My Seat
    </button>
  </div>
</div>

    </div>
  );
}
