// src/pages/About.tsx

import { useTheme } from "../context/ThemeContext";

import AboutHero from "../Components/About/AboutHero";
import AboutStats from "../Components/About/AboutStats";
import AboutJourney from "../Components/About/AboutJourney";
import AboutMentor from "../Components/Home/AboutMentor";
import AboutValues from "../Components/About/AboutValues";
import FeaturedIn from "../Components/About/FeaturedIn";
import FinalCTA from "../Components/About/AboutFinalCTA";
import Testimonials from "../Components/Home/Testimonials";
import FAQ from "../Components/Home/FAQ";
import PlansNavFloating from "../Components/Plans/PlansNav";
import OurTeam from "../Components/About/OurTeam";

const aboutSections = [
  { id: "hero", label: "Hero" },
  { id: "stats", label: "Stats" },
  { id: "mentor", label: "Mentor" },
  { id: "journey", label: "Journey" },
  { id: "values", label: "Values" },
  { id: "team", label: "Our Team" },
  { id: "featured", label: "Featured In" },
  { id: "cta", label: "Final CTA" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
];


const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      
      <div className={`min-h-screen ${isDark ? "bg-mg-black" : "bg-mg-light-bg"}`}>
      
      {/* Section Navigation */}
      {/* Sticky Navigation */}
      <div className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
    <PlansNavFloating sections={aboutSections} />
  </div>

        {/* Mobile Dropdown Nav */}
        <div className="md:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
          <PlansNavFloating sections={aboutSections}  />
        </div>

      {/* Sections */}
      <div id="hero"><AboutHero /></div>
      <div id="stats"><AboutStats /></div>
      <div id="mentor"><AboutMentor /></div>
      <div id="journey"><AboutJourney /></div>
      <div id="values"><AboutValues /></div>
      <div id="team"><OurTeam /></div>
      <div id="featured"><FeaturedIn /></div>
      <div id="cta"><FinalCTA /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="faq"><FAQ /></div>

      </div>
    </>
  );
};


export default About;


