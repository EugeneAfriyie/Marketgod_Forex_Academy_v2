import { BrowserRouter as Router } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import FacebookPixel from "./Components/SEO/FacebookPixel";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === "light" ? "bg-mg-light-b" : "bg-mg-dark-bg"}`}>
      <FacebookPixel />
      <AppRoutes />
    </div>
  );
};


export default App;
