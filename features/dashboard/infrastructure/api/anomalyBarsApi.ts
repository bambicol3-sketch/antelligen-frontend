import { httpClient } from "@/infrastructure/http/httpClient";
import type { ApiResponse } from "@/infrastructure/http/apiResponse";
import type { ChartInterval } from "@/features/dashboard/domain/model/chartInterval";

// OKR 다층 탐지 — 봉 마커 type. backend default "zscore" backward-compat.
export type AnomalyBarType = "zscore" | "cumulative_5d" | "cumulative_20d";

/**
 * 차트 이상치 봉 1건 (§13.4 C / §17 / OKR 다층 탐지).
 * - type: 탐지기 분류. zscore=★ / cumulative_5d=🔻 / cumulative_20d=📉
 * - return_pct: type 별 수익률(%). zscore=직전 봉 대비 / cumulative_*=N일 누적.
 * - z_score: (return_pct/100 - μ) / σ. 누적 탐지에선 0.0 (의미 없음).
 * - direction: "up" | "down" — 프론트 색 구분용 (한국식 up=빨강 / down=파랑).
 * - volume_ratio: σ window 평균 거래량 대비 배수. window 부족/평균 0 시 null.
 * - time_of_day: 일봉(1D) 한정 갭/장중 근사. "GAP" | "INTRADAY". 그 외 null.
 * - cumulative_return_1d/5d/20d: spike 봉 종가 기준 +N봉 후 raw 누적 수익률(%).
 *   benchmark 미차감. 미래 데이터 부족 시 null.
 */
export interface AnomalyBar {
  date: string; // ISO "yyyy-mm-dd"
  type?: AnomalyBarType; // backend default "zscore" — 옛 응답 호환
  return_pct: number;
  z_score: number;
  direction: "up" | "down";
  close: number;
  volume_ratio?: number | null;
  time_of_day?: "GAP" | "INTRADAY" | null;
  cumulative_return_1d?: number | null;
  cumulative_return_5d?: number | null;
  cumulative_return_20d?: number | null;
  causality: string | null;
}

export interface AnomalyBarsResponse {
  ticker: string;
  chart_interval: string;
  count: number;
  events: AnomalyBar[];
}

export async function fetchAnomalyBars(
  ticker: string,
  chartInterval: ChartInterval,
  signal?: AbortSignal,
): Promise<AnomalyBarsResponse> {
  // ADR-0001: chartInterval 사용. 1Y → 1Q 별칭 처리는 백엔드에서 수행.
  const res = await httpClient<ApiResponse<AnomalyBarsResponse>>(
    `/api/v1/history-agent/anomaly-bars?ticker=${encodeURIComponent(ticker)}&chartInterval=${chartInterval}`,
    { signal }
  );
  return res.data;
}
