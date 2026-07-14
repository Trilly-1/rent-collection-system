import { motion } from 'framer-motion';
import { Mail, Receipt } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Input from '../../components/forms/Input.jsx';
import Button from '../../components/buttons/Button.jsx';

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') === 'tenant' ? 'tenant' : 'landlord';
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Enter your email address.');
      return;
    }
    setLoading(true);
    try {
      await forgotPassword(role, email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Could not send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-[32px] border border-line-200 bg-white p-6 shadow-[0_25px_80px_-35px_rgba(12,32,24,0.35)] sm:p-8 lg:p-10">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-400">
          <Receipt className="h-5 w-5" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink-950">Reset your password</h1>
        <p className="mt-2 text-[0.95rem] text-ink-700">We'll send a secure reset link to your inbox.</p>
      </div>

      {sent ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          If an account exists for {email}, a reset link is on its way.
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          <Input label="Email address" type="email" icon={Mail} placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button fullWidth variant="gold" type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}

      <div className="mt-5 text-center text-sm">
        <Link to={role === 'tenant' ? '/tenant-login' : '/landlord-login'} className="font-semibold text-primary-600 hover:underline">
          Back to sign in
        </Link>
      </div>
    </motion.div>
  );
}