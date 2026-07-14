import { ChevronLeft, ChevronRight } from 'lucide-react';
import { classNames } from '../../utils/helpers.js';

export default function Pagination({ page, pages, onPageChange, totalItems, pageSize }) {
  if (pages <= 1) return null;

  const pageNumbers = getPageNumbers(page, pages);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-line-200 bg-paper-50">
      <p className="text-sm text-ink-600">
        Showing <span className="font-semibold text-ink-950">{start}–{end}</span> of{' '}
        <span className="font-semibold text-ink-950">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-300 text-ink-700 hover:bg-white hover:border-ink-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {pageNumbers.map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-ink-500 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={classNames(
                'flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200',
                p === page
                  ? 'bg-ink-600 text-white shadow-md'
                  : 'text-ink-700 hover:bg-white hover:border hover:border-line-300'
              )}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page === pages}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-300 text-ink-700 hover:bg-white hover:border-ink-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function getPageNumbers(page, pages) {
  const items = [];
  const windowSize = 1;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - windowSize && i <= page + windowSize)) {
      items.push(i);
    } else if (items[items.length - 1] !== '...') {
      items.push('...');
    }
  }
  return items;
}
