"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { RevenueSegment } from "@/features/company-profile/domain/model/companyProfile";

interface Props {
  segments: RevenueSegment[];
  className?: string;
}

const COLORS = [
  "#3B82F6", // blue-500 — 가장 큰 부문
  "#F59E0B", // amber-500
  "#10B981", // emerald-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
  "#06B6D4", // cyan-500
  "#F97316", // orange-500
  "#84CC16", // lime-500
  "#A855F7", // purple-500
  "#EF4444", // red-500
];

// recharts 의 콜백 타입 시그니처가 매우 광범위해서 props 를 좁혀 받는다.
function renderSliceLabel(props: unknown): string {
  const p = props as { name?: string; value?: number };
  if (typeof p.value !== "number") return "";
  return `${p.name ?? ""} ${p.value.toFixed(1)}%`;
}

function tooltipFormatter(value: unknown): [string, string] {
  const num = typeof value === "number" ? value : Number(value);
  return [`${num.toFixed(2)}%`, "비중"];
}

function renderLegendItem(value: string, entry: unknown): React.ReactNode {
  const payload = (entry as { payload?: { value?: number } } | undefined)?.payload;
  const pct = typeof payload?.value === "number" ? payload.value : undefined;
  return (
    <span className="text-zinc-700 dark:text-zinc-300">
      {value}
      {pct !== undefined ? ` ${pct.toFixed(1)}%` : ""}
    </span>
  );
}

export function RevenueCompositionPieChart({ segments, className }: Props) {
  if (segments.length === 0) {
    return (
      <div
        className={`flex h-64 items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 ${className ?? ""}`}
      >
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          매출 구성 데이터가 없습니다
        </p>
      </div>
    );
  }

  const data = segments.map((s, i) => ({
    name: s.name,
    value: s.percent,
    fill: COLORS[i % COLORS.length],
  }));

  const total = segments.reduce((acc, s) => acc + s.percent, 0);

  return (
    <div className={className}>
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        매출 구성 (사업부문별 비중)
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="40%"
            cy="50%"
            outerRadius={110}
            innerRadius={0}
            paddingAngle={2}
            label={renderSliceLabel}
            labelLine
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={{
              backgroundColor: "rgba(24, 24, 27, 0.92)",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              color: "#fafafa",
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, paddingLeft: 16 }}
            formatter={renderLegendItem}
          />
        </PieChart>
      </ResponsiveContainer>
      {Math.abs(total - 100) > 1 && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          ※ 표시된 비중 합계: {total.toFixed(1)}% (사업보고서 기준 기타·조정 항목으로
          100% 미만일 수 있습니다)
        </p>
      )}
    </div>
  );
}
