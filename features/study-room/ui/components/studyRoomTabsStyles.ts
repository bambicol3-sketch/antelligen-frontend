export const studyRoomTabsStyles = {
  wrap: "flex h-[calc(100vh-4rem)] flex-col",
  tabBar:
    "flex shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900",
  tab: {
    base: "relative px-4 py-3 text-sm font-medium transition-colors",
    active:
      "text-zinc-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-zinc-900 dark:text-zinc-50 dark:after:bg-zinc-50",
    default:
      "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
  },
  panel: "min-h-0 flex-1 overflow-hidden",
} as const;
