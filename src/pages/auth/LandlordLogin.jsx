import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Receipt, ShieldCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Input from '../../components/forms/Input.jsx';
import Button from '../../components/buttons/Button.jsx';

export default function LandlordLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await login('landlord', form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="rounded-3xl border border-line-200 bg-white p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-ink-50 px-4 py-1.5 text-sm font-semibold text-ink-700 mb-4">
            <Receipt className="h-4 w-4" />
            Landlord Portal
          </div>
          <h1 className="font-display text-3xl font-bold text-ink-950">Sign In</h1>
          <p className="mt-2 text-ink-700">Access your properties and tenants</p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-clay-200 bg-clay-50 px-4 py-3 text-sm text-clay-700"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange('email')}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange('password')}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-[42px] text-ink-700/60 hover:text-ink-950 transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button fullWidth variant="primary" size="lg" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/forgot-password?role=landlord" className="font-semibold text-ink-600 hover:text-ink-900 transition-colors cursor-pointer">
            Forgot password?
          </Link>
          <Link to="/landlord-register" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer flex items-center gap-1">
            Create Account
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-line-200" />
          <span className="text-xs text-ink-500">or</span>
          <div className="flex-1 h-px bg-line-200" />
        </div>

        {/* Back to selection */}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors cursor-pointer">
            ← Choose a different portal
          </Link>
        </div>
      </div>

      {/* Trust */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-500">
        <ShieldCheck className="h-4 w-4" />
        <span>Protected by RentFlow security</span>
      </div>
    </motion.div>
  );
}
