import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Download, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import Card, { StatCard } from '../../components/cards/Card.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Button from '../../components/buttons/Button.jsx';
import { getProperties } from '../../services/propertyService.js';
import { getTenants } from '../../services/tenantService.js';
import { getPayments } from '../../services/paymentService.js';
import { formatUGX, formatCompactUGX } from '../../utils/format.js';
import { Wallet, TrendingUp, AlertTriangle, Building2 } from 'lucide-react';

const palette = ['#1a7a5c', '#e6ad2e', '#ac4e2b', '#146349', '#cc9522', '#3f9271', '#8a3d21'];

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      const [p, t, pay] = await Promise.all([getProperties(), getTenants(), getPayments()]);
      setProperties(p);
      setTenants(t);
      setPayments(pay);
      setLoading(false);
    })();
  }, []);

  const monthlyRevenue = useMemo(() => {
    const map = new Map();
    payments
      .filter((p) => p.status === 'Successful')
      .forEach((p) => {
        map.set(p.monthFor, (map.get(p.monthFor) || 0) + p.amount);
      });
    return [...map.entries()]
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => new Date(`1 ${a.month}`) - new Date(`1 ${b.month}`))
      .slice(-8);
  }, [payments]);

  const districtBreakdown = useMemo(() => {
    const map = new Map();
    properties.forEach((p) => {
      map.set(p.district, (map.get(p.district) || 0) + p.occupiedUnits);
    });
    return [...map.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [properties]);

  const paymentMethodSplit = useMemo(() => {
    const map = new Map();
    payments.forEach((p) => {
      map.set(p.method, (map.get(p.method) || 0) + 1);
    });
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [payments]);

  const stats = useMemo(() => {
    const collected = payments.filter((p) => p.status === 'Successful').reduce((s, p) => s + p.amount, 0);
    const outstanding = tenants.filter((t) => t.status === 'Overdue').reduce((s, t) => s + t.balance, 0);
    const collectionRate = payments.length
      ? Math.round((payments.filter((p) => p.status === 'Successful').length / payments.length) * 100)
      : 0;
    return { collected, outstanding, collectionRate, properties: properties.length };
  }, [payments, tenants, properties]);

  if (loading) return <Loader fullscreen label="Building reports…" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">Insights</p>
          <h1 className="font-display text-3xl font-semibold text-ink-950 flex items-center gap-2.5">
            <BarChart3 className="h-7 w-7 text-primary-500" /> Reports
          </h1>
        </div>
        <Button variant="secondary" icon={Download} onClick={() => toast.success('Report exported (mock)')}>
          Export report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total collected" value={formatCompactUGX(stats.collected)} icon={Wallet} accent="primary" />
        <StatCard label="Collection rate" value={`${stats.collectionRate}%`} icon={TrendingUp} accent="gold" />
        <StatCard label="Outstanding balance" value={formatCompactUGX(stats.outstanding)} icon={AlertTriangle} accent="clay" />
        <StatCard label="Properties tracked" value={stats.properties} icon={Building2} accent="ink" />
      </div>

      <Card title="Monthly revenue" eyebrow="Successful payments only">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyRevenue} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line-200)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-ink-700)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-ink-700)' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCompactUGX(v)} width={64} />
            <Tooltip formatter={(v) => formatUGX(v)} contentStyle={{ borderRadius: 12, border: '1px solid var(--color-line-200)', fontSize: 13 }} />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-primary-500)" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card title="Occupied units by district" eyebrow="Geographic spread">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={districtBreakdown} layout="vertical" margin={{ left: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line-200)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-ink-700)' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--color-ink-700)' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-line-200)', fontSize: 13 }} />
              <Bar dataKey="value" fill="var(--color-primary-500)" radius={[0, 6, 6, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Payment method mix" eyebrow="All-time">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={paymentMethodSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2} strokeWidth={0}>
                {paymentMethodSplit.map((entry, idx) => (
                  <Cell key={entry.name} fill={palette[idx % palette.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={48} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-line-200)', fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}