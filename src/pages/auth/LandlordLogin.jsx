import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, Receipt } from 'lucide-react';
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
      className="w-full max-w-xl"
    >
      <div className="rounded-3xl border border-line-200 bg-white p-8 shadow-2xl sm:p-10 lg:p-12">
        <div className="mb-8 flex items-center justify-center gap-2.5 text-gold-600">
          <span className="rounded-full bg-gold-100 p-2">
            <Sparkles className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-wider">Secure Access</p>
        </div>

        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-gold-400 shadow-lg">
            <Receipt className="h-7 w-7" />
          </div>
          <h1 className="font-display text-4xl font-bold text-ink-950">Landlord Sign In</h1>
          <p className="mt-3 text-lg text-ink-700">
            Access your properties, tenants, and payments from one premium workspace.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-clay-200 bg-clay-50 px-4 py-3 text-sm text-clay-700"
          >
            {error}
          </motion.div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              className="absolute right-4 top-[42px] text-ink-700/60 hover:text-ink-950 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button fullWidth variant="gold" size="lg" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/forgot-password?role=landlord" className="font-semibold text-ink-600 hover:text-ink-900 transition-colors">
            Forgot password?
          </Link>
          <Link to="/landlord-register" className="font-semibold text-gold-600 hover:text-gold-700 transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
