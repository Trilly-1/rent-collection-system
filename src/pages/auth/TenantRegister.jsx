import { motion } from 'framer-motion';
import { Mail, Lock, Phone, Receipt, User, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Input from '../../components/forms/Input.jsx';
import Button from '../../components/buttons/Button.jsx';

const benefits = [
  'View payment history',
  'Access lease documents',
  'Track rent balance',
  'Secure tenant portal',
];

export default function TenantRegister() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.phone || !form.password) {
      setError('Fill in your name, phone number, and password.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await register('tenant', form);
      setSuccess(true);
      setTimeout(() => navigate('/tenant-login'), 1500);
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
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700 mb-4">
            <Receipt className="h-4 w-4" />
            Tenant Portal
          </div>
          <h1 className="font-display text-3xl font-bold text-ink-950">Create Account</h1>
          <p className="mt-2 text-ink-700">Access your rent and payment details</p>
        </div>

        {/* Benefits */}
        <div className="mb-6 rounded-xl bg-primary-50 p-4">
          <div className="grid grid-cols-2 gap-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-ink-700">
                <CheckCircle className="h-4 w-4 text-primary-600 shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
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

        {/* Success */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            Account created! Redirecting to sign in...
          </motion.div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            icon={User}
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange('name')}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            icon={Phone}
            placeholder="07XX XXX XXX"
            value={form.phone}
            onChange={handleChange('phone')}
            required
          />

          <Input
            label="Email (Optional)"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange('email')}
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={handleChange('password')}
            required
          />

          <Button fullWidth variant="primary" size="lg" type="submit" disabled={loading || success}>
            {loading ? 'Creating...' : success ? 'Created!' : 'Create Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-line-200" />
          <span className="text-xs text-ink-500">or</span>
          <div className="flex-1 h-px bg-line-200" />
        </div>

        {/* Links */}
        <div className="mt-6 text-center">
          <span className="text-sm text-ink-700">Already have an account? </span>
          <Link to="/tenant-login" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
            Sign In
          </Link>
        </div>
        <div className="mt-3 text-center">
          <Link to="/login" className="text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors cursor-pointer">
            ← Choose a different portal
          </Link>
        </div>
      </div>

      {/* Trust */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-500">
        <ShieldCheck className="h-4 w-4" />
        <span>Your data is encrypted and secure</span>
      </div>
    </motion.div>
  );
}
