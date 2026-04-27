"use client";

// KR6-B — MACRO 카테고리 선택 시 Type A(발표) / Type B(반응) 서브 필터.
// CategoryFilterChips 와 일관된 칩 패턴이지만 책임이 다르므로 별도 컴포넌트.

export type MacroTypeFilter = "ALL" | "TYPE_A" | "TYPE_B";

const FILTER_ORDER: MacroTypeFilter[] = ["ALL", "TYPE_A", "TYPE_B"];

const LABEL: Record<MacroTypeFilter, string> = {
  ALL: "전체",
  TYPE_A: "발표",
  TYPE_B: "반응",
};

const ACTIVE_STYLE: Record<MacroTypeFilter, string> = {
  ALL: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
  TYPE_A: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
  TYPE_B: "bg-pink-500/20 text-pink-600 dark:text-pink-400",
};

interface Props {
  selected: MacroTypeFilter;
  onChange: (value: MacroTypeFilter) => void;
  counts?: Partial<Record<MacroTypeFilter, number>>;
}

export default function MacroSubFilterChips({ selected, onChange, counts }: Props) {
  return (
    <div className="mb-3 flex flex-wrap gap-1.5 pl-3">
      {FILTER_ORDER.map((key) => {
        const isActive = selected === key;
        const count = counts?.[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors ${
              isActive
                ? ACTIVE_STYLE[key]
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {LABEL[key]}
            {count !== undefined && count > 0 && (
              <span className="ml-1 text-[10px] opacity-60">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
