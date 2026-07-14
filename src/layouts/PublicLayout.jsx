import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Receipt, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/buttons/Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

export default function PublicLayout({ children }) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper-0 text-ink-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line-200 bg-paper-0/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden shadow-lg">
              <img src="/images/img2.jpeg" alt="RentFlow Logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-display text-xl font-bold text-ink-950">RentFlow</p>
              <p className="text-xs text-ink-600">Smart Property Management</p>
            </div>
          </Link>

          <nav className="hidden gap-8 lg:flex">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors duration-200 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive
                      ? 'text-gold-600 after:w-full'
                      : 'text-ink-700 hover:text-ink-950'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/landlord-register">
                  <Button variant="gold" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <Button variant="gold" size="sm">
                  Dashboard
                </Button>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-ink-700 hover:bg-paper-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-line-200 bg-white"
            >
              <nav className="px-4 py-4 space-y-1">
                {links.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-gold-50 text-gold-700'
                          : 'text-ink-700 hover:bg-paper-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                {!user && (
                  <div className="pt-2 border-t border-line-200 mt-2 space-y-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button fullWidth variant="secondary" size="lg">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>
    </div>
  );
}
