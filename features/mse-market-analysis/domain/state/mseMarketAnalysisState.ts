import type { MseMarketAnalysisDashboard } from "@/features/mse-market-analysis/domain/model/mseMarketAnalysis";

export type MseMarketAnalysisState =
  | { status: "LOADING" }
  | { status: "UNAUTHENTICATED" }
  | { status: "ERROR"; message: string }
  | { status: "SUCCESS"; dashboard: MseMarketAnalysisDashboard };
