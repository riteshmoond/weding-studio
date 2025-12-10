import React from 'react'
import Navbar from './components/Header.jsx'
import { Route, Routes } from "react-router-dom"

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Gallery from './pages/Gallery.jsx'
import Packages from './pages/Packages.jsx'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer.jsx'

////////////// Admin Imports ///////////////
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminBookings from './pages/AdminBookings.jsx'
import AdminMessages from './pages/AdminMessages.jsx'
import AdminSettings from './pages/AdminSettings.jsx'
import AdminGallery from './pages/AdminGallery.jsx'
import AdminPackages from './pages/AdminPackages.jsx'
import { Navigate } from 'react-router-dom'


const App = () => {

  const AdminRoute = ({ children }) => {
    if (localStorage.getItem("adminAuth") === "true") {
      return children;
    }
    return <Navigate to="/admin/login" />;
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />

        /////////////// Admin Routes ///////////////
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
       <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <AdminRoute>
              <AdminMessages />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <AdminRoute>
              <AdminGallery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/packages"
          element={
            <AdminRoute>
              <AdminPackages />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App
