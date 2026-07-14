import { useEffect, useMemo, useState } from 'react';
import { Download, Printer, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/cards/Card.jsx';
import Table from '../../components/tables/Table.jsx';
import SearchBox from '../../components/ui/SearchBox.jsx';
import Select from '../../components/forms/Select.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Pagination from '../../components/ui/Pagination.jsx';
import Modal from '../../components/modal/Modal.jsx';
import Button from '../../components/buttons/Button.jsx';
import { getTenants } from '../../services/tenantService.js';
import { usePagination } from '../../hooks/usePagination.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { formatUGX, formatDate } from '../../utils/format.js';

function buildInvoices(tenants) {
  const months = ['May 2026', 'June 2026', 'July 2026'];
  const invoices = [];
  let counter = 1;
  tenants.forEach((t) => {
    months.forEach((month, idx) => {
      const isCurrentMonth = idx === months.length - 1;
      const status = t.status === 'Overdue' && isCurrentMonth ? 'Overdue' : isCurrentMonth ? 'Pending' : 'Paid';
      invoices.push({
        id: `INV-${String(counter).padStart(5, '0')}`,
        tenantId: t.id,
        tenantName: t.name,
        propertyName: t.propertyName,
        unitNumber: t.unitNumber,
        month,
        amount: t.rentAmount,
        issueDate: `2026-${String(months.indexOf(month) + 5).padStart(2, '0')}-01`,
        dueDate: `2026-${String(months.indexOf(month) + 5).padStart(2, '0')}-05`,
        status,
      });
      counter++;
    });
  });
  return invoices.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
}

export default function Invoices() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const tenants = await getTenants();
      setInvoices(buildInvoices(tenants));
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        !debouncedSearch ||
        inv.tenantName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        inv.id.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = !status || inv.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, debouncedSearch, status]);

  const { page, setPage, pages, pageItems } = usePagination(filtered, 10);

  const columns = [
    { key: 'id', header: 'Invoice', render: (row) => <span className="font-mono text-xs">{row.id}</span> },
    { key: 'tenantName', header: 'Tenant', render: (row) => (
      <div>
        <p className="font-semibold text-ink-950">{row.tenantName}</p>
        <p className="text-xs text-ink-700">{row.propertyName} · {row.unitNumber}</p>
      </div>
    ) },
    { key: 'month', header: 'Period' },
    { key: 'dueDate', header: 'Due date', render: (row) => formatDate(row.dueDate) },
    { key: 'amount', header: 'Amount', align: 'right', render: (row) => <span className="font-mono font-semibold">{formatUGX(row.amount)}</span> },
    { key: 'status', header: 'Status', render: (row) => <Badge status={row.status} /> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (row) => (
        <button onClick={() => setSelected(row)} className="text-primary-600 hover:text-primary-700 text-xs font-semibold">
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">Billing</p>
        <h1 className="font-display text-3xl font-semibold text-ink-950 flex items-center gap-2.5">
          <FileText className="h-7 w-7 text-primary-500" /> Invoices
        </h1>
      </div>

      <Card noPadding>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-line-200">
          <SearchBox value={search} onChange={setSearch} placeholder="Search by tenant or invoice number…" className="flex-1" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} options={['Paid', 'Pending', 'Overdue']} placeholder="All statuses" className="sm:w-48" />
        </div>

        {loading ? <Loader label="Loading invoices…" /> : <Table columns={columns} data={pageItems} emptyMessage="No invoices match your filters." />}

        <Pagination page={page} pages={pages} onPageChange={setPage} totalItems={filtered.length} pageSize={10} />
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id}
        subtitle="Rent invoice"
        footer={
          <>
            <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
              Print
            </Button>
            <Button icon={Download} onClick={() => toast.success('Invoice downloaded (mock)')}>
              Download PDF
            </Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-ink-950">RentFlow</p>
                <p className="text-xs text-ink-700">Kampala, Uganda</p>
              </div>
              <Badge status={selected.status} />
            </div>
            <div className="tear-divider" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-700 text-xs mb-1">Billed to</p>
                <p className="font-semibold text-ink-950">{selected.tenantName}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Property / Unit</p>
                <p className="text-ink-950">{selected.propertyName}, {selected.unitNumber}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Issue date</p>
                <p className="text-ink-950">{formatDate(selected.issueDate)}</p>
              </div>
              <div>
                <p className="text-ink-700 text-xs mb-1">Due date</p>
                <p className="text-ink-950">{formatDate(selected.dueDate)}</p>
              </div>
            </div>
            <div className="tear-divider" />
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink-700">Rent — {selected.month}</p>
              <p className="font-mono font-semibold text-ink-950">{formatUGX(selected.amount)}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-line-200">
              <p className="font-semibold text-ink-950">Total due</p>
              <p className="font-mono text-xl font-semibold text-ink-950">{formatUGX(selected.amount)}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}