import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Card, { StatCard } from '../../components/cards/Card.jsx';
import Table from '../../components/tables/Table.jsx';
import SearchBox from '../../components/ui/SearchBox.jsx';
import Select from '../../components/forms/Select.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Pagination from '../../components/ui/Pagination.jsx';
import Button from '../../components/buttons/Button.jsx';
import { getPayments } from '../../services/paymentService.js';
import { usePagination } from '../../hooks/usePagination.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { formatUGX, formatCompactUGX, formatDate } from '../../utils/format.js';
import { Wallet, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function Payments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [method, setMethod] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getPayments();
      setPayments(data);
      setLoading(false);
    })();
  }, []);

  const stats = useMemo(() => {
    const successful = payments.filter((p) => p.status === 'Successful');
    const pending = payments.filter((p) => p.status === 'Pending');
    const failed = payments.filter((p) => p.status === 'Failed');
    return {
      total: successful.reduce((sum, p) => sum + p.amount, 0),
      successCount: successful.length,
      pendingCount: pending.length,
      failedCount: failed.length,
    };
  }, [payments]);

  const methods = useMemo(() => [...new Set(payments.map((p) => p.method))], [payments]);

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        !debouncedSearch ||
        p.tenantName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.reference.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = !status || p.status === status;
      const matchesMethod = !method || p.method === method;
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, debouncedSearch, status, method]);

  const { page, setPage, pages, pageItems } = usePagination(filtered, 10);

  const columns = [
    { key: 'reference', header: 'Reference', render: (row) => <span className="font-mono text-xs">{row.reference}</span> },
    { key: 'tenantName', header: 'Tenant', render: (row) => (
      <div>
        <p className="font-semibold text-ink-950">{row.tenantName}</p>
        <p className="text-xs text-ink-700">{row.propertyName} · {row.unitNumber}</p>
      </div>
    ) },
    { key: 'monthFor', header: 'For month' },
    { key: 'method', header: 'Method' },
    { key: 'date', header: 'Date', render: (row) => formatDate(row.date) },
    { key: 'amount', header: 'Amount', align: 'right', render: (row) => <span className="font-mono font-semibold">{formatUGX(row.amount)}</span> },
    { key: 'status', header: 'Status', render: (row) => <Badge status={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">RentFlow</p>
          <h1 className="font-display text-3xl font-semibold text-ink-950">Payments</h1>
        </div>
        <Button icon={Plus} onClick={() => navigate('/payments/add')}>
          Record payment
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total collected" value={formatCompactUGX(stats.total)} icon={Wallet} accent="primary" />
        <StatCard label="Successful" value={stats.successCount} icon={CheckCircle2} accent="primary" />
        <StatCard label="Pending" value={stats.pendingCount} icon={Clock} accent="gold" />
        <StatCard label="Failed" value={stats.failedCount} icon={XCircle} accent="clay" />
      </div>

      <Card noPadding>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-line-200">
          <SearchBox value={search} onChange={setSearch} placeholder="Search by tenant or reference…" className="flex-1" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} options={['Successful', 'Pending', 'Failed']} placeholder="All statuses" className="sm:w-44" />
          <Select value={method} onChange={(e) => setMethod(e.target.value)} options={methods} placeholder="All methods" className="sm:w-52" />
        </div>

        {loading ? <Loader label="Loading payments…" /> : <Table columns={columns} data={pageItems} emptyMessage="No payments match your filters." />}

        <Pagination page={page} pages={pages} onPageChange={setPage} totalItems={filtered.length} pageSize={10} />
      </Card>
    </div>
  );
}