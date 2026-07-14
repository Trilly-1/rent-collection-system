import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, MapPin, Building2, Trash2, Users, Camera, Home } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/buttons/Button.jsx';
import Card from '../../components/cards/Card.jsx';
import SearchBox from '../../components/ui/SearchBox.jsx';
import Select from '../../components/forms/Select.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Pagination from '../../components/ui/Pagination.jsx';
import { getProperties, deleteProperty } from '../../services/propertyService.js';
import { usePagination } from '../../hooks/usePagination.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { formatUGX } from '../../utils/format.js';

// Property type colors for visual variety
const typeColors = {
  'Apartment Block': 'from-ink-600 to-ink-800',
  'Residential Estate': 'from-ink-500 to-ink-700',
  'Commercial Plaza': 'from-gold-500 to-gold-700',
  'Bungalow Complex': 'from-ink-600 to-ink-800',
  'Mixed-Use Building': 'from-gold-600 to-gold-800',
  'Townhouses': 'from-ink-500 to-ink-700',
};

const typeIcons = {
  'Apartment Block': Building2,
  'Residential Estate': Home,
  'Commercial Plaza': Building2,
  'Bungalow Complex': Home,
  'Mixed-Use Building': Building2,
  'Townhouses': Home,
};

export default function Properties() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('');
  const debouncedSearch = useDebounce(search);

  const load = async () => {
    setLoading(true);
    const data = await getProperties();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const districts = useMemo(() => [...new Set(properties.map((p) => p.district))].sort(), [properties]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        !debouncedSearch ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.address.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesDistrict = !district || p.district === district;
      return matchesSearch && matchesDistrict;
    });
  }, [properties, debouncedSearch, district]);

  const { page, setPage, pages, pageItems } = usePagination(filtered, 9);

  const handleDelete = async (id, name) => {
    if (!confirm(`Remove ${name} from your portfolio?`)) return;
    await deleteProperty(id);
    toast.success('Property removed');
    load();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <p className="stamp text-xs uppercase tracking-wider text-gold-600 mb-1">Portfolio</p>
          <h1 className="font-display text-4xl font-bold text-ink-950">Properties</h1>
        </div>
        <Button size="lg" onClick={() => navigate('/properties/add')}>
          <Plus className="h-5 w-5 mr-2" />
          Add Property
        </Button>
      </motion.div>

      <Card noPadding delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 p-5 border-b border-line-200">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search by name or address..."
            className="flex-1"
          />
          <Select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            options={districts}
            placeholder="All districts"
            className="sm:w-48"
          />
        </div>

        {loading ? (
          <Loader label="Loading properties..." />
        ) : pageItems.length === 0 ? (
          <div className="py-16 text-center text-ink-700">
            <Building2 className="h-12 w-12 mx-auto text-ink-300 mb-4" />
            <p className="font-display text-xl font-semibold text-ink-900">No properties found</p>
            <p className="mt-2 text-ink-600">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {pageItems.map((p, idx) => {
              const gradient = typeColors[p.type] || 'from-ink-600 to-ink-800';
              const Icon = typeIcons[p.type] || Building2;
              const hasPhotos = p.photos && p.photos.length > 0;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate('/units', { state: { propertyId: p.id, propertyName: p.name } })}
                  className="group rounded-2xl border border-line-200 overflow-hidden hover:shadow-xl hover:border-gold-300 transition-all duration-300 cursor-pointer bg-white"
                >
                  {/* Property Header Image/Gradient */}
                  <div className={`h-28 flex items-center justify-center bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                    <Icon className="h-10 w-10 text-white/80" />
                    {hasPhotos && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-ink-700">
                        <Camera className="h-3.5 w-3.5" />
                        {p.photos.length}
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Property Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink-950 leading-snug group-hover:text-gold-700 transition-colors">
                        {p.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(p.id, p.name);
                        }}
                        className="text-ink-400 hover:text-clay-500 shrink-0 p-1 rounded-lg hover:bg-clay-50 transition-colors"
                        aria-label={`Remove ${p.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="flex items-center gap-2 text-sm text-ink-600">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {p.area}, {p.district}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <Badge tone={p.occupiedUnits === p.totalUnits ? 'success' : 'info'}>
                        {p.occupiedUnits}/{p.totalUnits} units
                      </Badge>
                      <p className="flex items-center gap-1.5 text-sm text-ink-600">
                        <Users className="h-4 w-4" />
                        {p.manager.split(' ')[0]}
                      </p>
                    </div>

                    <div className="tear-divider" />

                    <p className="font-mono text-sm text-ink-700 pt-1">
                      {formatUGX(p.monthlyRentRange[0])} – {formatUGX(p.monthlyRentRange[1])}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <Pagination page={page} pages={pages} onPageChange={setPage} totalItems={filtered.length} pageSize={9} />
      </Card>
    </div>
  );
}
