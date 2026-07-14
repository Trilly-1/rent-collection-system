import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown, LogOut, UserCircle, Settings, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { initials } from '../../utils/format.js';
import { classNames } from '../../utils/helpers.js';

const notifications = [
  { id: 1, title: 'Rent overdue', body: 'David Ssebunya — Unit B3 is 12 days overdue', time: '2h ago', tone: 'clay' },
  { id: 2, title: 'Payment received', body: 'UGX 850,000 from Grace Nabirye via MTN MoMo', time: '5h ago', tone: 'primary' },
  { id: 3, title: 'Lease expiring', body: '3 leases expire within 30 days', time: '1d ago', tone: 'gold' },
];

const toneColors = {
  clay: 'bg-clay-500',
  primary: 'bg-ink-500',
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
    <header className="sticky top-0 z-20 h-18 shrink-0 bg-paper-0/90 backdrop-blur-xl border-b border-line-200 flex items-center gap-4 px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-ink-800 hover:text-ink-950 hover:bg-paper-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="relative hidden sm:block flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search tenants, properties, payments..."
          className="w-full rounded-xl border border-line-300 bg-paper-50 pl-12 pr-4 py-3 text-base placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-ink-100 focus:border-ink-400 focus:bg-white transition-all duration-200"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl text-ink-700 hover:bg-paper-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-clay-500 ring-2 ring-paper-0" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-line-200 shadow-xl overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-line-200">
                  <p className="font-display text-lg font-semibold text-ink-950">Notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto scroll-thin">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-5 py-4 border-b border-line-200 last:border-none hover:bg-paper-50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <span className={classNames('h-2 w-2 rounded-full mt-2 shrink-0', toneColors[n.tone])} />
                        <div>
                          <p className="text-sm font-semibold text-ink-950">{n.title}</p>
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
            className="flex items-center gap-3 rounded-xl pl-2 pr-3 py-1.5 hover:bg-paper-100 transition-colors"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-600 text-white text-sm font-bold shrink-0">
              {initials(user?.name)}
            </span>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-ink-950">{user?.name?.split(' ')[0]}</p>
              <p className="text-xs text-ink-600 capitalize">{user?.role || 'Landlord'}</p>
            </div>
            <ChevronDown className="hidden md:block h-4 w-4 text-ink-700" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-line-200 shadow-xl overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-line-200">
                  <p className="text-sm font-semibold text-ink-950">{user?.name}</p>
                  <p className="text-xs text-ink-600 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-ink-800 hover:bg-paper-50 transition-colors"
                >
                  <UserCircle className="h-4 w-4" /> My Profile
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-ink-800 hover:bg-paper-50 transition-colors"
                >
                  <Settings className="h-4 w-4" /> Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-clay-600 hover:bg-clay-50 border-t border-line-200 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
