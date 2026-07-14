import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown, LogOut, UserCircle, Settings, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { initials } from '../../utils/format.js';
import { classNames } from '../../utils/helpers.js';

/*
 * UX Pro Max Navbar Guidelines Applied:
 * - Floating navbar with spacing from edges
 * - Backdrop blur for glass effect
 * - Proper z-index layering
 * - Hover states on interactive elements
 * - Cursor pointer on clickable items
 */

const notifications = [
  { id: 1, title: 'Rent overdue', body: 'David Ssebunya - Unit B3 is 12 days overdue', time: '2h ago', tone: 'clay' },
  { id: 2, title: 'Payment received', body: 'UGX 850,000 from Grace Nabirye via MTN MoMo', time: '5h ago', tone: 'primary' },
  { id: 3, title: 'Lease expiring', body: '3 leases expire within 30 days', time: '1d ago', tone: 'gold' },
];

const toneColors = {
  clay: 'bg-clay-500',
  primary: 'bg-primary-500',
  gold: 'bg-gold-500',
};

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [search, setSearch] = useState('');
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-line-200 bg-paper-0/95 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-ink-700 hover:bg-paper-100 cursor-pointer transition-colors duration-150"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden sm:block flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search tenants, properties, payments..."
            className="w-full rounded-xl border border-line-300 bg-paper-50 pl-11 pr-4 py-2.5 text-sm placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 hover:border-line-400 transition-all duration-150 cursor-text"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 hover:bg-paper-100 cursor-pointer transition-colors duration-150"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-clay-500 ring-2 ring-white" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-line-200 shadow-xl overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-line-200">
                    <p className="text-lg font-bold text-ink-900">Notifications</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto scroll-thin">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-5 py-4 border-b border-line-200 last:border-none hover:bg-paper-50 cursor-pointer transition-colors duration-150">
                        <div className="flex items-start gap-3">
                          <span className={classNames('h-2 w-2 rounded-full mt-2 shrink-0', toneColors[n.tone])} />
                          <div>
                            <p className="text-sm font-semibold text-ink-900">{n.title}</p>
                            <p className="text-sm text-ink-600 mt-0.5">{n.body}</p>
                            <p className="text-xs text-ink-500 mt-1 stamp">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className="flex items-center gap-2 rounded-xl pl-2 pr-3 py-1.5 hover:bg-paper-100 cursor-pointer transition-colors duration-150"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white text-sm font-bold shrink-0">
                {initials(user?.name)}
              </span>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-ink-900">{user?.name?.split(' ')[0]}</p>
                <p className="text-xs text-ink-600 capitalize">{user?.role || 'Landlord'}</p>
              </div>
              <ChevronDown className="hidden md:block h-4 w-4 text-ink-600" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-line-200 shadow-xl overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-line-200">
                    <p className="text-sm font-semibold text-ink-900">{user?.name}</p>
                    <p className="text-xs text-ink-600 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-ink-700 hover:bg-paper-50 cursor-pointer transition-colors duration-150"
                  >
                    <UserCircle className="h-4 w-4" /> My Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-ink-700 hover:bg-paper-50 cursor-pointer transition-colors duration-150"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-clay-600 hover:bg-clay-50 border-t border-line-200 cursor-pointer transition-colors duration-150"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
