import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TourPopup from "../../Components/Tour/TourPopup";

export default function PublicSiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TourPopup />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
