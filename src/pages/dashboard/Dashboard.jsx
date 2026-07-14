import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import { Wallet, Users, Building2, DoorOpen, ArrowUpRight, TrendingUp } from 'lucide-react';
import Card, { StatCard } from '../../components/cards/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Button from '../../components/buttons/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getProperties } from '../../services/propertyService.js';
import { getTenants } from '../../services/tenantService.js';
import { getPayments, getRecentPayments } from '../../services/paymentService.js';
import { formatUGX, formatCompactUGX, formatDate, initials } from '../../utils/format.js';

const MONTHLY_TARGET_LABELS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export default function Dashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [p, t, pay, recent] = await Promise.all([
        getProperties(),
        getTenants(),
        getPayments(),
        getRecentPayments(5),
      ]);
      if (!mounted) return;
      setProperties(p);
      setTenants(t);
      setPayments(pay);
      setRecentPayments(recent);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const stats = useMemo(() => {
    const totalUnits = properties.reduce((sum, p) => sum + p.totalUnits, 0);
    const occupiedUnits = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
    const collected = payments.filter((p) => p.status === 'Successful').reduce((sum, p) => sum + p.amount, 0);
    const overdueTenants = tenants.filter((t) => t.status === 'Overdue');
    const overdueAmount = overdueTenants.reduce((sum, t) => sum + t.balance, 0);
    return {
      totalUnits, occupiedUnits,
      occupancyRate: totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
      collected, overdueAmount,
      overdueCount: overdueTenants.length,
    };
  }, [properties, payments, tenants]);

  const revenueTrend = useMemo(() => {
    return MONTHLY_TARGET_LABELS.map((label, idx) => {
      const base = 38_000_000 + idx * 4_200_000;
      const variance = (idx % 2 === 0 ? 1 : -1) * 1_800_000;
      return { month: label, revenue: base + variance, target: 45_000_000 };
    });
  }, []);

  const occupancyData = useMemo(() => [
    { name: 'Occupied', value: stats.occupiedUnits, color: '#1a7a5c' },
    { name: 'Vacant', value: stats.totalUnits - stats.occupiedUnits, color: '#e2dcc9' },
  ], [stats]);

  const propertyPerformance = useMemo(() =>
    [...properties]
      .sort((a, b) => b.occupiedUnits / b.totalUnits - a.occupiedUnits / a.totalUnits)
      .slice(0, 6)
      .map((p) => ({
        name: p.name.length > 16 ? `${p.name.slice(0, 16)}...` : p.name,
        occupancy: Math.round((p.occupiedUnits / p.totalUnits) * 100),
      })),
    [properties]
  );

  const recentTenants = useMemo(() =>
    [...tenants].sort((a, b) => new Date(b.moveInDate) - new Date(a.moveInDate)).slice(0, 5),
    [tenants]
  );

  if (loading) return <Loader fullscreen label="Loading dashboard..." />;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="stamp mb-2 text-xs uppercase tracking-[0.28em] text-gold-600">Operations Overview</p>
            <h1 className="font-display text-4xl font-bold text-ink-950">
              Welcome, {session?.name?.split(' ')[0] || 'there'}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-ink-700">
              Track rent, occupancy, and resident activity from one place. Your property portfolio is ready for review.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate('/properties/add')}>
              <Building2 className="h-5 w-5 mr-2" />
              Add Property
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/tenants/add')}>
              <Users className="h-5 w-5 mr-2" />
              Add Tenant
            </Button>
            <Button size="lg" variant="gold" onClick={() => navigate('/payments/add')}>
              <Wallet className="h-5 w-5 mr-2" />
              Record Payment
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Rent Collected (YTD)"
          value={formatCompactUGX(stats.collected)}
          icon={Wallet}
          trend={8}
          trendLabel="vs last month"
          accent="primary"
          delay={0}
        />
        <StatCard
          label="Active Tenants"
          value={tenants.filter((t) => t.status !== 'Notice Period').length}
          icon={Users}
          trend={4}
          trendLabel="vs last month"
          accent="gold"
          delay={0.1}
        />
        <StatCard
          label="Properties"
          value={properties.length}
          icon={Building2}
          trend={0}
          trendLabel="no change"
          accent="ink"
          delay={0.2}
        />
        <StatCard
          label="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          icon={DoorOpen}
          trend={2}
          trendLabel="vs last month"
          accent="primary"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="Revenue Trend" eyebrow="Last 6 months" className="xl:col-span-2" delay={0.4}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueTrend} margin={{ left: -18, top: 4 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a7a5c" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1a7a5c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2dcc9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#235943' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#235943' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatCompactUGX(v)}
                width={64}
              />
              <Tooltip
                formatter={(value) => formatUGX(value)}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2dcc9', fontSize: 14, padding: '12px 16px' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#1a7a5c" strokeWidth={2.5} fill="url(#revenueFill)" name="Collected" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Occupancy Summary" eyebrow="Portfolio-wide" delay={0.5}>
          <div className="flex flex-col items-center">
            <div className="relative w-full">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={occupancyData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={3} strokeWidth={0}>
                    {occupancyData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} units`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-4xl font-bold text-ink-950">{stats.occupancyRate}%</p>
                <p className="text-sm text-ink-600">occupied</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm mt-4">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-ink-500" />
                {stats.occupiedUnits} occupied
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-line-300" />
                {stats.totalUnits - stats.occupiedUnits} vacant
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="Recent Payments" eyebrow="Latest activity" className="xl:col-span-2" noPadding delay={0.6}>
          <div className="divide-y divide-line-200">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-paper-50 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-700 text-sm font-bold shrink-0">
                    {initials(p.tenantName)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-950 truncate">{p.tenantName}</p>
                    <p className="text-sm text-ink-600 truncate">{p.propertyName} · {p.unitNumber}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-semibold text-ink-950">{formatUGX(p.amount)}</p>
                  <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Tenants" eyebrow="New move-ins" noPadding delay={0.7}>
          <div className="divide-y divide-line-200">
            {recentTenants.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-paper-50 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 text-sm font-bold shrink-0">
                    {initials(t.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-950 truncate">{t.name}</p>
                    <p className="text-sm text-ink-600 truncate">{t.propertyName}</p>
                  </div>
                </div>
                <p className="text-sm text-ink-600 shrink-0">{formatDate(t.moveInDate)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Property Performance */}
      <Card
        title="Top Occupancy by Property"
        eyebrow="Performance"
        action={
          <button
            onClick={() => navigate('/properties')}
            className="flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </button>
        }
        delay={0.8}
      >
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={propertyPerformance} margin={{ left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2dcc9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#235943' }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 12, fill: '#235943' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} width={40} />
            <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: 12, border: '1px solid #e2dcc9', fontSize: 14 }} />
            <Bar dataKey="occupancy" fill="#e6ad2e" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
