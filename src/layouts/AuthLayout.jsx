import { Outlet, Link, useLocation } from 'react-router-dom';
import { Receipt, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/login', label: 'Sign In' },
  { to: '/landlord-register', label: 'Get Started' },
];

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(230,173,46,0.1),_transparent_50%),linear-gradient(180deg,_#fdfcf8_0%,_#f7f5ef_100%)]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-line-200 bg-paper-0/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-lg">
              <img src="/images/img2.jpeg" alt="RentFlow Logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-ink-950">RentFlow</p>
              <p className="text-[10px] text-ink-600 uppercase tracking-wider">Property Management</p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${
                  location.pathname === to
                    ? 'text-gold-600 after:w-full'
                    : 'text-ink-700 hover:text-ink-950'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl border border-line-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition-all duration-200 hover:border-gold-300 hover:text-ink-900 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
