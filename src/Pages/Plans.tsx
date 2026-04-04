// src/pages/Plans.tsx
import PlansHero from "../Components/Plans/PlansHero";
import WhyThisCourse from "../Components/Plans/WhyThisCourse";
import TradingSignals from "../Components/Plans/TradingSignals";
import WhoIsThisFor from "../Components/Plans/WhoIsThisFor";
import StillNotSure from "../Components/Plans/StillNotSure";
import PricingPlans from "../Components/Plans/PricingPlans";
import Signals from "../Components/Plans/Signals";
import PromoBanner from "../Components/Plans/PromoBanner";
import PlansNav from "../Components/Plans/PlansNav";
import PlansFinalCTA from "../Components/Plans/PlansFinalCTA";
import Testimonials from "../Components/Home/Testimonials";
import FAQ from "../Components/Home/FAQ";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "why-this-course", label: "Why This Course" },
  { id: "trading-signals", label: "Trading Signals" },
  { id: "pricing", label: "Pricing Plans" },
  { id: "signals", label: "Signals" },
  { id: "promo-banner", label: "Trade for free" },
  { id: "still-not-sure", label: "Still Not Sure?" },
  { id: "who-is-this-for", label: "Who Is This For" },
  { id: "faq", label: "FAQ" },

];

const Plans: React.FC = () => {


  return (
    <>
    
      <div className="relative">
      {/* Sticky Navigation */}
      <div className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
    <PlansNav sections={sections} />
  </div>

  {/* Mobile Dropdown Nav */}
  <div className="md:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
    <PlansNav sections={sections}  />
  </div>
     

      {/* Sections */}
      <div id="hero" className=""><PlansHero /></div>
      <div id="why-this-course" className=""><WhyThisCourse /></div>
      <div id="trading-signals" className=""><TradingSignals /></div>
      <div id="who-is-this-for" className=""><WhoIsThisFor /></div>
      <div id="pricing" className=""><PricingPlans /></div>
      <div id="signals" className=""><Signals /></div>
      <div id="promo-banner" className=""><PromoBanner /></div>
      <div id="still-not-sure" className=""><StillNotSure /></div>
    <div id="final-cta"><PlansFinalCTA /></div>
    <div id="final-cta"><Testimonials /></div>
    <div id="faq"><FAQ /></div>

      </div>
    </>
  );
};

export default Plans;



