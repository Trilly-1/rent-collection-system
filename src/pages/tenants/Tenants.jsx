import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/cards/Card.jsx';
import Table from '../../components/tables/Table.jsx';
import SearchBox from '../../components/ui/SearchBox.jsx';
import Select from '../../components/forms/Select.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Pagination from '../../components/ui/Pagination.jsx';
import Button from '../../components/buttons/Button.jsx';
import Modal from '../../components/modal/Modal.jsx';
import { getTenants, deleteTenant } from '../../services/tenantService.js';
import { usePagination } from '../../hooks/usePagination.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { formatUGX, formatDate, initials } from '../../utils/format.js';

export default function Tenants() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const debouncedSearch = useDebounce(search);

  const load = async () => {
    setLoading(true);
    const data = await getTenants();
    setTenants(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return tenants.filter((t) => {
      const matchesSearch =
        !debouncedSearch ||
        t.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.propertyName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.phone.includes(debouncedSearch);
      const matchesStatus = !status || t.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [tenants, debouncedSearch, status]);

  const { page, setPage, pages, pageItems } = usePagination(filtered, 10);

  const handleDelete = async (id, name) => {
    if (!confirm(`Remove ${name} as a tenant?`)) return;
    await deleteTenant(id);
    toast.success('Tenant removed');
    load();
  };

  const columns = [
    {
      key: 'name',
      header: 'Tenant',
      render: (row) => (
        <button onClick={() => setSelectedTenant(row)} className="flex items-center gap-3 text-left">
          <span className="h-10 w-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold shrink-0">
            {initials(row.name)}
          </span>
          <span>
            <span className="block font-semibold text-ink-950">{row.name}</span>
            <span className="block text-xs text-ink-700">{row.id}</span>
          </span>
        </button>
      ),
    },
    { key: 'propertyName', header: 'Property', render: (row) => (
      <div>
        <p>{row.propertyName}</p>
        <p className="text-xs text-ink-700">Unit {row.unitNumber}</p>
      </div>
    ) },
    { key: 'phone', header: 'Phone', render: (row) => <span className="font-mono text-xs">{row.phone}</span> },
    { key: 'rentAmount', header: 'Rent', align: 'right', render: (row) => <span className="font-mono">{formatUGX(row.rentAmount)}</span> },
    { key: 'status', header: 'Status', render: (row) => <Badge status={row.status} /> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (row) => (
        <button onClick={() => handleDelete(row.id, row.name)} className="text-ink-700/40 hover:text-clay-500">
          <Trash2 className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">People</p>
          <h1 className="font-display text-3xl font-semibold text-ink-950">Tenants</h1>
        </div>
        <Button icon={Plus} onClick={() => navigate('/tenants/add')}>
          Add tenant
        </Button>
      </div>

      <Card noPadding>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-line-200">
          <SearchBox value={search} onChange={setSearch} placeholder="Search by name, property, or phone…" className="flex-1" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} options={['Active', 'Overdue', 'Notice Period']} placeholder="All statuses" className="sm:w-48" />
        </div>

        {loading ? <Loader label="Loading tenants…" /> : <Table columns={columns} data={pageItems} emptyMessage="No tenants match your filters." />}

        <Pagination page={page} pages={pages} onPageChange={setPage} totalItems={filtered.length} pageSize={10} />
      </Card>

      <Modal open={!!selectedTenant} onClose={() => setSelectedTenant(null)} title={selectedTenant?.name} subtitle={selectedTenant?.id}>
        {selectedTenant && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-700 text-xs mb-1">Property</p>
                <p className="font-semibold text-ink-950">{selectedTenant.propertyName}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Unit</p>
                <p className="font-semibold text-ink-950">{selectedTenant.unitNumber}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Phone</p>
                <p className="font-mono text-ink-950 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {selectedTenant.phone}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Email</p>
                <p className="text-ink-950 truncate">{selectedTenant.email}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Move-in date</p>
                <p className="text-ink-950">{formatDate(selectedTenant.moveInDate)}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Lease ends</p>
                <p className="text-ink-950">{formatDate(selectedTenant.leaseEndDate)}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Monthly rent</p>
                <p className="font-mono text-ink-950">{formatUGX(selectedTenant.rentAmount)}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Status</p>
                <Badge status={selectedTenant.status} />
              </div>
            </div>
            {selectedTenant.balance > 0 && (
              <div className="rounded-lg bg-clay-100 border border-clay-400/30 px-4 py-3">
                <p className="text-sm text-clay-600">
                  Outstanding balance: <span className="font-mono font-semibold">{formatUGX(selectedTenant.balance)}</span>
                </p>
              </div>
            )}
            <div className="tear-divider" />
            <div>
              <p className="text-ink-700 text-xs mb-1">Emergency contact</p>
              <p className="text-ink-950">{selectedTenant.emergencyContact} · <span className="font-mono">{selectedTenant.emergencyPhone}</span></p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}