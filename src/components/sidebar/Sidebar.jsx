import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  Wallet,
  FileText,
  BarChart3,
  Settings,
  UserCircle,
  LogOut,
  Receipt,
  X,
  ChevronLeft,
} from 'lucide-react';
import { classNames } from '../../utils/helpers.js';
import { useAuth } from '../../context/AuthContext.jsx';

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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-ink-950/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={classNames(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-72 shrink-0 bg-ink-900 text-paper-50 flex flex-col',
          'transition-transform duration-300 ease-out lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-18 shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400 shadow-lg">
              <Receipt className="h-5 w-5 text-ink-900" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">RentFlow</p>
              <p className="text-[10px] text-paper-50/50 uppercase tracking-[0.2em]">Property Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
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
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gold-400 text-ink-900 shadow-lg shadow-gold-400/20'
                    : 'text-paper-50/70 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10">
          {session && (
            <div className="mb-3 px-4 py-3 rounded-xl bg-white/5">
              <p className="text-sm font-medium text-white truncate">{session.name}</p>
              <p className="text-xs text-paper-50/50 truncate">{session.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[0.95rem] font-medium text-paper-50/70 hover:bg-clay-600/20 hover:text-clay-100 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
