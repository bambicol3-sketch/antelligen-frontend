import type { MseCreditIntent } from "@/features/mse-credit/domain/intent/mseCreditIntent";
import { fetchMseCreditDashboard } from "@/features/mse-credit/infrastructure/api/mseCreditApi";

export const mseCreditCommand = {
  FETCH_MSE_CREDIT_DASHBOARD: (
    _intent: Extract<MseCreditIntent, { type: "FETCH_MSE_CREDIT_DASHBOARD" }>
  ) => fetchMseCreditDashboard(),
} as const;
