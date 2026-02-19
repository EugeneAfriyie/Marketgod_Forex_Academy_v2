// src/pages/Home.tsx
import { useTheme } from "../context/ThemeContext";

// HERO & CORE
import Hero from "../Components/Home/Hero";
import WhatIsForex from "../Components/Home/WhatIsForex";
import WhyForex from "../Components/Home/WhyForex";

// VALUE & EDUCATION
import Webinars from "../Components/Home/Webinars";
import WhyMarketGod from "../Components/Home/WhyMarketGod";
import WhyMentorshipMatters from "../Components/Home/WhyMentorshipMatters";

// OFFER & SERVICES
import Plans from "../Components/Home/Plans";
import Services from "../Components/Home/Services";
import ExnessPartner from "../Components/Home/ExnessPartner";

// SOCIAL PROOF
import Testimonials from "../Components/Home/Testimonials";
import MarketGodQuotes from "../Components/Home/MarketGodQuotes";

// ENGAGEMENT & CONVERSION
import JoinCommunity from "../Components/Home/JoinCommunity";
import FAQ from "../Components/Home/FAQ";
// import SeminarHighlight from "../Components/Home/SeminarHighlight";
import AboutMentor from "../Components/Home/AboutMentor";
// import PlansNavFloating from "../Components/Plans/PlansNav"; 
import Quiz from "../Components/Quiz/Quiz";
import TourSection from "../Components/Tour/TourSection";
// import EventPreHeader from "../Components/Tour/EventPreHeader";


// const homeSections = [
//   { id: "hero", label: "Hero" },
//   { id: "seminar-highlight", label: "Seminar Highlight" },
//   { id: "about", label: "About" },
//   { id: "quiz", label: "Quiz" },
//   { id: "services", label: "Services" },
//   { id: "what-is-forex", label: "What Is Forex?" },
//   { id: "why-forex", label: "Why Forex?" },
//   { id: "why-marketgod", label: "Why MarketGod?" },
//   { id: "webinars", label: "Webinars" },
//   { id: "mentorship", label: "Mentorship" },
//   { id: "plans", label: "Plans" },
//   { id: "exness", label: "Exness" },
//   { id: "testimonials", label: "Testimonials" },
//   { id: "quotes", label: "Quotes" },
//   { id: "join-community", label: "Community" },
//   { id: "faq", label: "FAQ" },
//   { id: "faq-cta", label: "CTA" },
// ];



const Home = () => {
  const { theme } = useTheme();

  return (
   <>
     
    <div className={`min-h-screen transition-colors duration-300 ${theme === "light" ? "bg-mg-light-bg" : "bg-mg-dark-bg"}`}>
      
      {/* Section Navigation */}     

        {/* Mobile Dropdown Nav */}
        <div className=" sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
          {/* <PlansNavFloating sections={homeSections}  /> */}
        </div>

      {/* Sections */}
      <div id="hero"><Hero /></div>
      <TourSection />
      {/* <EventPreHeader/> */}
      
      {/* <div id="seminar-highlight"><SeminarHighlight /></div> */}

      <div id="about"><AboutMentor /></div>
      <div id="services"><Services /></div>
      <div id="what-is-forex"><WhatIsForex /></div>
      <div id="why-forex"><WhyForex /></div>
      <div id="why-marketgod"><WhyMarketGod /></div>
      <div id="webinars"><Webinars /></div>
      <div id="mentorship"><WhyMentorshipMatters /></div>
      <div id="quiz"><Quiz /></div>
      <div id="plans"><Plans /></div>
      <div id="exness"><ExnessPartner /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="quotes"><MarketGodQuotes /></div>
      <div id="join-community"><JoinCommunity /></div>
      <div id="faq"><FAQ /></div>
      
    </div>
   </>
  );
};

export default Home;