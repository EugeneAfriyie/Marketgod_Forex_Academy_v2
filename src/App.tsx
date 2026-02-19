import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Header from "./Components/Header/Header";
// import AnnouncementPopup from "./Components/Plans/AnnouncementPopup";

// COMPONENTS
import Footer from "./Components/Footer/Footer";

// PAGES
import Home from "./Pages/Home";
import Plans from "./Pages/Plans";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";
import { SEOData } from "./Components/SEO/SEOData";
import BlogPostPage from "./Components/Blog/BlogPostPage";
import { getBlogSEO } from "./Components/SEO/SEOData";
import SEO from "./Components/SEO/SEO";
import FacebookPixel from "./Components/SEO/FacebookPixel";
import Legal from "./Pages/Legal";
import TourPopup from "./Components/Tour/TourPopup";



function App() {
  return (

      <Router>
        <AppContent />
      </Router>
    
  );
}

const AppContent = () => {
  const { theme } = useTheme();
  const location = useLocation();


  let seo;
  if (location.pathname.startsWith("/blog/")) {
    const slug = location.pathname.split("/blog/")[1];
    seo = getBlogSEO(slug) || SEOData["/blog"];
  } else {
    seo = SEOData[location.pathname] || SEOData["/"];
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === "light" ? "bg-mg-light-b" : "bg-mg-dark-bg"}`}>
    <TourPopup />
      <FacebookPixel />
      <SEO {...seo} />
          

      <Header />
      <main className="flex-1 ">

        {/* Bring it back after the tour */}
        {/* <AnnouncementPopup /> */}
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* ABOUT */}
          <Route path="/about" element={<About />} />

          {/* PLANS */}
          <Route path="/plans" element={<Plans />} />

          {/* BLOG */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact />} />

          {/* LEGAL */}
          <Route path="/legal" element={<Legal />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};


export default App;