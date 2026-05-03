import { httpClient } from "@/infrastructure/http/httpClient";
import type { MseSectorsDashboard } from "@/features/mse-sectors/domain/model/mseSectors";

interface RawSection {
  kind?: string | null;
  extras?: { html?: string | null } | null;
}

interface RawMseSectorsDashboard {
  sections?: RawSection[] | null;
}

/** 산업군 분석 대시보드 조회 (GET /api/v1/mse-sectors/sectors) */
export async function fetchMseSectorsDashboard(): Promise<MseSectorsDashboard> {
  const data = await httpClient<RawMseSectorsDashboard>(
    "/api/v1/mse-sectors/sectors"
  );

  const fullDoc = (data.sections ?? []).find(
    (section) => section?.kind === "full_html_document"
  );
  const fullHtml = fullDoc?.extras?.html ?? null;

  return { fullHtml };
}
