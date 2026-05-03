import type { MseSectorsIntent } from "@/features/mse-sectors/domain/intent/mseSectorsIntent";
import { fetchMseSectorsDashboard } from "@/features/mse-sectors/infrastructure/api/mseSectorsApi";

export const mseSectorsCommand = {
  FETCH_MSE_SECTORS_DASHBOARD: (
    _intent: Extract<MseSectorsIntent, { type: "FETCH_MSE_SECTORS_DASHBOARD" }>
  ) => fetchMseSectorsDashboard(),
} as const;
