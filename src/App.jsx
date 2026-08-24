import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UtilityBar from "./components/layout/UtilityBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import { AuthProvider } from "./context/AuthContext";

function MainContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <UtilityBar />}
      {!isAdminRoute && <Header />}
      <AppRoutes />
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;