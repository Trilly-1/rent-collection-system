import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Calendar, Home, AlertCircle, FileText, Download, Receipt, Clock, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import Card from '../../components/cards/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Button from '../../components/buttons/Button.jsx';
import GlassCard from '../../components/ui/GlassCard.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getTenants } from '../../services/tenantService.js';
import { getPayments } from '../../services/paymentService.js';
import { getProperties } from '../../services/propertyService.js';
import { formatUGX, formatDate, initials } from '../../utils/format.js';

const TERMS_AND_CONDITIONS = [
  {
    title: 'Rent Payment Terms',
    content: 'Rent is due on the 1st of every month. Payment must be received by the 5th to avoid late fees. A grace period of 5 days is allowed after the due date.',
  },
  {
    title: 'Late Payment Policy',
    content: 'A late fee of UGX 50,000 will be charged for payments received after the 5th of the month. Continued late payments may result in lease termination.',
  },
  {
    title: 'Security Deposit',
    content: 'A security deposit equivalent to one month\'s rent is required before move-in. This deposit is refundable at the end of the lease term, subject to property inspection.',
  },
  {
    title: 'Lease Termination',
    content: 'Either party may terminate the lease with 30 days written notice. Early termination fees may apply as specified in the lease agreement.',
  },
  {
    title: 'Property Maintenance',
    content: 'Tenants are responsible for minor repairs and maintenance. Major structural repairs are the responsibility of the landlord. Report issues promptly.',
  },
  {
    title: 'Utilities & Services',
    content: 'Tenants are responsible for utility payments (water, electricity, internet) unless otherwise specified in the lease agreement.',
  },
];

export default function TenantDashboard() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [t, p, props] = await Promise.all([getTenants(), getPayments(), getProperties()]);
      if (!mounted) return;
      setTenants(t);
      setPayments(p);
      setProperties(props);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const myRecord = useMemo(() => {
    if (!session) return null;
    return tenants.find(
      (t) => (session.phone && t.phone === session.phone) || (session.email && t.email === session.email)
    );
  }, [tenants, session]);

  const myPayments = useMemo(() => {
    if (!myRecord) return [];
    return payments
      .filter((p) => p.tenantId === myRecord.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [payments, myRecord]);

  const myProperty = useMemo(() => {
    if (!myRecord) return null;
    return properties.find((p) => p.id === myRecord.propertyId);
  }, [properties, myRecord]);

  const totalPaid = useMemo(() => {
    return myPayments
      .filter((p) => p.status === 'Successful')
      .reduce((sum, p) => sum + p.amount, 0);
  }, [myPayments]);

  if (loading) return <Loader fullscreen label="Loading your account..." />;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="stamp mb-2 text-xs uppercase tracking-[0.28em] text-gold-600">Tenant Portal</p>
            <h1 className="font-display text-4xl font-bold text-ink-950">
              Welcome, {session?.name?.split(' ')[0] || 'there'}
            </h1>
            <p className="mt-2 text-lg text-ink-700">
              Access your lease details, payment history, and terms in one secure place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={activeTab === 'overview' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === 'payments' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('payments')}
            >
              Payment History
            </Button>
            <Button
              variant={activeTab === 'assets' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('assets')}
            >
              Property Details
            </Button>
            <Button
              variant={activeTab === 'terms' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('terms')}
            >
              Terms & Conditions
            </Button>
          </div>
        </div>
      </motion.div>

      {!myRecord ? (
        <GlassCard className="p-8 text-center">
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-paper-100 text-ink-400">
              <AlertCircle className="h-8 w-8" />
            </div>
            <p className="font-display text-2xl font-semibold text-ink-950">No Unit Linked Yet</p>
            <p className="max-w-md text-lg text-ink-700">
              Your landlord hasn't assigned you to a unit yet, or the phone/email on your account doesn't
              match their records. Contact your landlord to get connected.
            </p>
          </div>
        </GlassCard>
      ) : (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                  className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
                      <Home className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-ink-600">Your Property</p>
                      <p className="font-semibold text-ink-950 truncate max-w-[150px]">{myRecord.propertyName}</p>
                      <p className="text-sm text-ink-600">Unit {myRecord.unitNumber}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                      <Wallet className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-ink-600">Monthly Rent</p>
                      <p className="font-display text-xl font-bold text-ink-950">{formatUGX(myRecord.rentAmount)}</p>
                      <Badge status={myRecord.status} />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-100 text-clay-700">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-ink-600">Balance Due</p>
                      <p className={`font-display text-xl font-bold ${myRecord.balance > 0 ? 'text-clay-600' : 'text-ink-950'}`}>
                        {formatUGX(myRecord.balance)}
                      </p>
                      <p className="text-sm text-ink-600">Lease ends {formatDate(myRecord.leaseEndDate)}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-ink-600">Total Paid</p>
                      <p className="font-display text-xl font-bold text-ink-950">{formatUGX(totalPaid)}</p>
                      <p className="text-sm text-ink-600">{myPayments.length} payments</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Payments */}
              <Card title="Recent Payments" eyebrow="Latest Activity" noPadding delay={0.4}>
                {myPayments.length === 0 ? (
                  <div className="py-12 text-center text-ink-700">
                    <Receipt className="h-12 w-12 mx-auto text-ink-300 mb-4" />
                    <p className="font-display text-xl font-semibold text-ink-900">No payments yet</p>
                    <p className="mt-2 text-ink-600">Your payment history will appear here.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-line-200">
                    {myPayments.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-paper-50 transition-colors">
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-700 text-sm font-bold shrink-0">
                            {initials(p.tenantName)}
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-ink-950 truncate">{p.monthFor}</p>
                            <p className="text-sm text-ink-600 truncate">{p.method} · {p.reference}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono font-semibold text-ink-950">{formatUGX(p.amount)}</p>
                          <Badge status={p.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'payments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card title="Payment History" eyebrow="All Transactions" noPadding delay={0.1}>
                {myPayments.length === 0 ? (
                  <div className="py-12 text-center text-ink-700">
                    <Receipt className="h-12 w-12 mx-auto text-ink-300 mb-4" />
                    <p className="font-display text-xl font-semibold text-ink-900">No payments recorded</p>
                    <p className="mt-2 text-ink-600">Your payment history will appear here.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-line-200">
                    {myPayments.map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-paper-50 transition-colors">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            p.status === 'Successful' ? 'bg-green-100 text-green-700' : 'bg-clay-100 text-clay-700'
                          }`}>
                            {p.status === 'Successful' ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-ink-950 truncate">{p.monthFor}</p>
                            <p className="text-sm text-ink-600 truncate">{p.method} · {p.reference}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono font-semibold text-ink-950">{formatUGX(p.amount)}</p>
                          <p className="text-sm text-ink-600">{formatDate(p.date)}</p>
                          <Badge status={p.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {/* Assets / Property Details Tab */}
          {activeTab === 'assets' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card title="Property Details" eyebrow="Your Home" delay={0.1}>
                {myProperty ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <p className="text-sm text-ink-600">Property Name</p>
                        <p className="font-semibold text-ink-950">{myProperty.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-ink-600">Type</p>
                        <p className="font-semibold text-ink-950">{myProperty.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-ink-600">Location</p>
                        <p className="font-semibold text-ink-950">{myProperty.area}, {myProperty.district}</p>
                      </div>
                      <div>
                        <p className="text-sm text-ink-600">Address</p>
                        <p className="font-semibold text-ink-950">{myProperty.address}</p>
                      </div>
                    </div>

                    {myProperty.amenities && myProperty.amenities.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-ink-900 mb-3">Amenities</p>
                        <div className="flex flex-wrap gap-2">
                          {myProperty.amenities.map((amenity) => (
                            <span key={amenity} className="rounded-full border border-line-200 bg-paper-50 px-4 py-2 text-sm text-ink-700">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-ink-700">Property details not available.</p>
                )}
              </Card>

              <Card title="Your Unit Details" eyebrow="Unit Information" delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-sm text-ink-600">Unit Number</p>
                    <p className="font-semibold text-ink-950">{myRecord.unitNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-600">Unit Type</p>
                    <p className="font-semibold text-ink-950">{myRecord.unitType || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-600">Monthly Rent</p>
                    <p className="font-display text-xl font-bold text-ink-950">{formatUGX(myRecord.rentAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-600">Move-in Date</p>
                    <p className="font-semibold text-ink-950">{formatDate(myRecord.moveInDate)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Terms & Conditions Tab */}
          {activeTab === 'terms' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card title="Terms & Conditions" eyebrow="Lease Agreement" delay={0.1}>
                <div className="space-y-6">
                  <div className="rounded-xl border border-gold-200 bg-gold-50 p-5">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-gold-700" />
                      <div>
                        <p className="font-semibold text-ink-900">Rental Agreement Terms</p>
                        <p className="text-sm text-ink-600">Please read these terms carefully before signing your lease agreement.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {TERMS_AND_CONDITIONS.map((term, idx) => (
                      <motion.div
                        key={term.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="rounded-xl border border-line-200 bg-white p-5"
                      >
                        <h3 className="font-display text-lg font-semibold text-ink-950">{term.title}</h3>
                        <p className="mt-2 text-ink-700 leading-relaxed">{term.content}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-line-200 bg-paper-50 p-5 text-center">
                    <p className="text-sm text-ink-600">
                      By signing your lease agreement, you acknowledge that you have read, understood, and agree to these terms and conditions.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
