import type { MseSectorsDashboard } from "@/features/mse-sectors/domain/model/mseSectors";

export type MseSectorsState =
  | { status: "LOADING" }
  | { status: "UNAUTHENTICATED" }
  | { status: "ERROR"; message: string }
  | { status: "SUCCESS"; dashboard: MseSectorsDashboard };
