export function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function totalPages(itemCount, pageSize) {
  return Math.max(1, Math.ceil(itemCount / pageSize));
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export function debounce(fn, delay = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}