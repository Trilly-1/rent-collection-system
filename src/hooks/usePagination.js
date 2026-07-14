import { useMemo, useState } from 'react';
import { paginate, totalPages } from '../utils/helpers.js';

export function usePagination(items, pageSize = 10) {
  const [page, setPage] = useState(1);

  const pages = totalPages(items.length, pageSize);
  const safePage = Math.min(page, pages);

  const pageItems = useMemo(() => paginate(items, safePage, pageSize), [items, safePage, pageSize]);

  return {
    page: safePage,
    setPage,
    pages,
    pageItems,
    pageSize,
  };
}