import { classNames } from '../../utils/helpers.js';
import { Inbox } from 'lucide-react';

export default function Table({ columns, data, keyField = 'id', onRowClick, emptyMessage = 'No records found' }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-ink-700">
        <Inbox className="h-8 w-8 text-ink-700/40" />
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={classNames(
                  'text-left font-semibold text-ink-700 px-5 py-3 whitespace-nowrap text-xs uppercase tracking-wide',
                  col.align === 'right' && 'text-right'
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[keyField]}
              onClick={() => onRowClick?.(row)}
              className={classNames(
                'border-b border-line-200 last:border-none transition-colors',
                onRowClick && 'cursor-pointer hover:bg-paper-50'
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={classNames('px-5 py-3.5 align-middle whitespace-nowrap', col.align === 'right' && 'text-right')}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}