import type { MseMarketAnalysisQuery } from "@/features/mse-market-analysis/domain/model/mseMarketAnalysis";

export type MseMarketAnalysisIntent = {
  type: "FETCH_MSE_MARKET_ANALYSIS_DASHBOARD";
  query?: MseMarketAnalysisQuery;
};
