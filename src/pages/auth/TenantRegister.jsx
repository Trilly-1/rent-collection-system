import { motion } from 'framer-motion';
import { Mail, Lock, Phone, Receipt, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Input from '../../components/forms/Input.jsx';
import Button from '../../components/buttons/Button.jsx';

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
      className="w-full max-w-xl"
    >
      <div className="rounded-3xl border border-line-200 bg-white p-8 shadow-2xl sm:p-10 lg:p-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-gold-400 shadow-lg">
            <Receipt className="h-7 w-7" />
          </div>
          <h1 className="font-display text-4xl font-bold text-ink-950">Create Tenant Account</h1>
          <p className="mt-3 text-lg text-ink-700">
            Access rent details, payments, and lease terms in one secure portal.
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

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            Account created successfully! Redirecting to sign in...
          </motion.div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
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
            placeholder="Create a password (min. 8 characters)"
            value={form.password}
            onChange={handleChange('password')}
            required
          />

          <Button fullWidth variant="gold" size="lg" type="submit" disabled={loading || success}>
            {loading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-ink-700">Already have an account? </span>
          <Link to="/tenant-login" className="font-semibold text-gold-600 hover:text-gold-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
