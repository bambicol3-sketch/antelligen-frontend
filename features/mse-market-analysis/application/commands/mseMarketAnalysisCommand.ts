import type { MseMarketAnalysisIntent } from "@/features/mse-market-analysis/domain/intent/mseMarketAnalysisIntent";
import { fetchMseMarketAnalysisDashboard } from "@/features/mse-market-analysis/infrastructure/api/mseMarketAnalysisApi";

export const mseMarketAnalysisCommand = {
  FETCH_MSE_MARKET_ANALYSIS_DASHBOARD: (
    intent: Extract<MseMarketAnalysisIntent, { type: "FETCH_MSE_MARKET_ANALYSIS_DASHBOARD" }>
  ) => fetchMseMarketAnalysisDashboard(intent.query),
} as const;
