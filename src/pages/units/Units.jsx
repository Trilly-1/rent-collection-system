import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DoorOpen, X } from 'lucide-react';
import Card from '../../components/cards/Card.jsx';
import Table from '../../components/tables/Table.jsx';
import SearchBox from '../../components/ui/SearchBox.jsx';
import Select from '../../components/forms/Select.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Pagination from '../../components/ui/Pagination.jsx';
import { getAllUnits } from '../../services/propertyService.js';
import { usePagination } from '../../hooks/usePagination.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { formatUGX } from '../../utils/format.js';

export default function Units() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [propertyFilter, setPropertyFilter] = useState(location.state?.propertyId || '');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllUnits();
      setUnits(data);
      setLoading(false);
    })();
  }, []);

  const propertyOptions = useMemo(() => {
    const map = new Map();
    units.forEach((u) => map.set(u.propertyId, u.propertyName));
    return [...map.entries()].map(([value, label]) => ({ value, label }));
  }, [units]);

  const filtered = useMemo(() => {
    return units.filter((u) => {
      const matchesSearch =
        !debouncedSearch ||
        u.unitNumber.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        u.propertyName.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = !status || u.status === status;
      const matchesProperty = !propertyFilter || u.propertyId === propertyFilter;
      return matchesSearch && matchesStatus && matchesProperty;
    });
  }, [units, debouncedSearch, status, propertyFilter]);

  const { page, setPage, pages, pageItems } = usePagination(filtered, 10);

  const columns = [
    { key: 'id', header: 'Unit ID' },
    { key: 'unitNumber', header: 'Unit', render: (row) => <span className="font-mono font-semibold">{row.unitNumber}</span> },
    { key: 'propertyName', header: 'Property' },
    { key: 'unitType', header: 'Type' },
    { key: 'floor', header: 'Floor' },
    { key: 'rent', header: 'Monthly rent', align: 'right', render: (row) => <span className="font-mono">{formatUGX(row.rent)}</span> },
    { key: 'status', header: 'Status', render: (row) => <Badge status={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">Portfolio</p>
        <h1 className="font-display text-3xl font-semibold text-ink-950 flex items-center gap-2.5">
          <DoorOpen className="h-7 w-7 text-primary-500" /> Units
        </h1>
      </div>

      {propertyFilter && (
        <div className="flex items-center gap-2 text-sm text-ink-700 bg-primary-50 border border-primary-100 rounded-lg px-4 py-2.5 w-fit">
          Filtering by <span className="font-semibold text-ink-950">{location.state?.propertyName || 'selected property'}</span>
          <button onClick={() => setPropertyFilter('')} className="text-primary-600 hover:text-primary-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <Card noPadding>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-line-200">
          <SearchBox value={search} onChange={setSearch} placeholder="Search by unit or property…" className="flex-1" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} options={['Occupied', 'Vacant']} placeholder="All statuses" className="sm:w-44" />
          <Select value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)} options={propertyOptions} placeholder="All properties" className="sm:w-56" />
        </div>

        {loading ? <Loader label="Loading units…" /> : <Table columns={columns} data={pageItems} emptyMessage="No units match your filters." />}

        <Pagination page={page} pages={pages} onPageChange={setPage} totalItems={filtered.length} pageSize={10} />
      </Card>
    </div>
  );
}