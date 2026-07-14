import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Features from "../pages/public/Features";
import Pricing from "../pages/public/Pricing";
import Contact from "../pages/public/Contact";

// Authentication
import Login from "../pages/auth/Login";
import LandlordLogin from "../pages/auth/LandlordLogin";
import TenantLogin from "../pages/auth/TenantLogin";
import LandlordRegister from "../pages/auth/LandlordRegister";
import TenantRegister from "../pages/auth/TenantRegister";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import TenantDashboard from "../pages/dashboard/TenantDashboard";
import Properties from "../pages/properties/Properties";
import AddProperty from "../pages/properties/AddProperty";
import Units from "../pages/units/Units";
import Tenants from "../pages/tenants/Tenants";
import AddTenant from "../pages/tenants/AddTenant";
import Payments from "../pages/payments/Payments";
import AddPayment from "../pages/payments/AddPayment";
import Invoices from "../pages/invoices/Invoices";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";
import Profile from "../pages/profile/Profile";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      <Route
        path="/features"
        element={
          <PublicLayout>
            <Features />
          </PublicLayout>
        }
      />

      <Route
        path="/pricing"
        element={
          <PublicLayout>
            <Pricing />
          </PublicLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />

      {/* ================= AUTH ================= */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/landlord-login" element={<LandlordLogin />} />
        <Route path="/tenant-login" element={<TenantLogin />} />
        <Route path="/landlord-register" element={<LandlordRegister />} />
        <Route path="/tenant-register" element={<TenantRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* ================= LANDLORD DASHBOARD ================= */}

      <Route
        element={
          <ProtectedRoute requiredRole="landlord">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/add" element={<AddProperty />} />

        <Route path="/units" element={<Units />} />

        <Route path="/tenants" element={<Tenants />} />
        <Route path="/tenants/add" element={<AddTenant />} />

        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/add" element={<AddPayment />} />

        <Route path="/invoices" element={<Invoices />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ================= TENANT DASHBOARD ================= */}

      <Route
        element={
          <ProtectedRoute requiredRole="tenant">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/tenant/payments" element={<TenantDashboard />} />
        <Route path="/tenant/property" element={<TenantDashboard />} />
        <Route path="/tenant/terms" element={<TenantDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
