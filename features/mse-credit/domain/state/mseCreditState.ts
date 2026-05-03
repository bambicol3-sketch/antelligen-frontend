import type { MseCreditDashboard } from "@/features/mse-credit/domain/model/mseCredit";

export type MseCreditState =
  | { status: "LOADING" }
  | { status: "UNAUTHENTICATED" }
  | { status: "ERROR"; message: string }
  | { status: "SUCCESS"; dashboard: MseCreditDashboard };
