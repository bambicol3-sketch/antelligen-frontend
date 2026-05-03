import { httpClient } from "@/infrastructure/http/httpClient";
import type { MseCreditDashboard } from "@/features/mse-credit/domain/model/mseCredit";

interface RawSection {
  kind?: string | null;
  extras?: { html?: string | null } | null;
}

interface RawMseCreditDashboard {
  sections?: RawSection[] | null;
}

/** 신용 스프레드 분석 대시보드 조회 (GET /api/v1/mse-credit/credit-spread) */
export async function fetchMseCreditDashboard(): Promise<MseCreditDashboard> {
  const data = await httpClient<RawMseCreditDashboard>(
    "/api/v1/mse-credit/credit-spread"
  );

  const fullDoc = (data.sections ?? []).find(
    (section) => section?.kind === "full_html_document"
  );
  const fullHtml = fullDoc?.extras?.html ?? null;

  return { fullHtml };
}
