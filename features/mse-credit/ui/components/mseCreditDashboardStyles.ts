export const mseCreditDashboardStyles = {
  iframe: "block w-full h-full border-0",
  status: {
    wrap:
      "flex h-full flex-col items-center justify-center gap-3 px-6 text-center",
    loading: "text-sm text-zinc-500 dark:text-zinc-400",
    error: "text-sm text-red-500",
    empty: "text-sm text-zinc-500 dark:text-zinc-400",
    unauthenticated: "text-sm text-zinc-600 dark:text-zinc-300",
    loginLink:
      "inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors",
  },
} as const;
