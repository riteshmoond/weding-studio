import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Reviews from "./pages/Reviews";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminMessages from "./pages/AdminMessages";
import AdminSettings from "./pages/AdminSettings";
import AdminGallery from "./pages/AdminGallery";
import AdminPackages from "./pages/AdminPackages";
import AdminReviews from "./pages/AdminReviews";
import AdminTeam from "./pages/AdminTeam";
import Account from "./pages/Account";
import { getCurrentUser, getToken, getStudioSettings } from "./lib/api";
import { writeSettings } from "./lib/studioData";

function AdminRoute({ children }) {
  const user = getCurrentUser();
  return getToken() && user?.role === "admin" ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const [settingsReady, setSettingsReady] = useState(false);

  useEffect(() => {
    getStudioSettings()
      .then((settings) => writeSettings(settings))
      .catch(() => {})
      .finally(() => setSettingsReady(true));
  }, []);

  return (
    <div className="min-h-screen bg-[#fbf8f5] text-stone-900">
      {!isAdmin && settingsReady && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
        <Route path="/admin/gallery" element={<AdminRoute><AdminGallery /></AdminRoute>} />
        <Route path="/admin/packages" element={<AdminRoute><AdminPackages /></AdminRoute>} />
        <Route path="/admin/team" element={<AdminRoute><AdminTeam /></AdminRoute>} />
        <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdmin && settingsReady && <Footer />}
    </div>
  );
}
