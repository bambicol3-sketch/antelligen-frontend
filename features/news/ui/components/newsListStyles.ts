export const newsListStyles = {
  page: "min-h-screen bg-zinc-50 dark:bg-zinc-950",
  container: "mx-auto max-w-4xl px-6 py-10",
  header: {
    wrap: "mb-8 flex items-center justify-between",
    title: "text-2xl font-bold text-zinc-900 dark:text-zinc-50",
  },
  card: "rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900",
  loading: "py-16 text-center text-sm text-zinc-500 dark:text-zinc-400",
  error: "py-16 text-center text-sm text-red-500",
  empty: "py-16 text-center text-sm text-zinc-500 dark:text-zinc-400",
  list: "divide-y divide-zinc-100 dark:divide-zinc-800",
  item: {
    wrap: "flex flex-col gap-1 py-5",
    title: "text-base font-semibold text-zinc-900 hover:text-blue-600 dark:text-zinc-50 dark:hover:text-blue-400",
    meta: "flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400",
    source: "font-medium",
    content: "mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300",
    saveButton: "shrink-0 rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
    savedBadge: "shrink-0 text-xs text-green-600 dark:text-green-400",
  },
  pagination: {
    wrap: "mt-8 flex items-center justify-center gap-2",
    button:
      "rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
    active:
      "rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white",
  },
};
