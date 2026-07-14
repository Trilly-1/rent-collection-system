import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, DoorOpen, Users, Wallet,
  FileText, BarChart3, Settings, UserCircle, LogOut, Receipt, X,
} from 'lucide-react';
import { classNames } from '../../utils/helpers.js';
import { useAuth } from '../../context/AuthContext.jsx';

/*
 * UX Pro Max Sidebar Guidelines Applied:
 * - Active state: clear visual indicator
 * - Hover states: background color change
 * - Cursor pointer on all navigation items
 * - Transitions: 150ms
 * - Proper z-index for mobile overlay
 */

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/properties', label: 'Properties', icon: Building2 },
  { to: '/units', label: 'Units', icon: DoorOpen },
  { to: '/tenants', label: 'Tenants', icon: Users },
  { to: '/payments', label: 'Payments', icon: Wallet },
  { to: '/invoices', label: 'Invoices', icon: FileText },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Sidebar({ open, onClose }) {
  const { logout, session } = useAuth();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-ink-950/50 backdrop-blur-sm z-30 lg:hidden cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={classNames(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-72 shrink-0',
          'bg-ink-900 text-white flex flex-col',
          'transition-transform duration-200 ease-out lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-lg">
              <img src="/images/img2.jpeg" alt="RentFlow Logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">RentFlow</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Property Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-150"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scroll-thin px-4 py-5 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                classNames(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                  'transition-all duration-150 ease-out',
                  'cursor-pointer',
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10">
          {session && (
            <div className="mb-3 px-4 py-3 rounded-xl bg-white/5">
              <p className="text-sm font-medium text-white truncate">{session.name}</p>
              <p className="text-xs text-white/50 truncate">{session.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-clay-600/20 hover:text-white cursor-pointer transition-colors duration-150"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
