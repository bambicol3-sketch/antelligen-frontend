import { httpClient } from "@/infrastructure/http/httpClient";
import type {
  MseMarketAnalysisDashboard,
  MseMarketAnalysisQuery,
} from "@/features/mse-market-analysis/domain/model/mseMarketAnalysis";

interface RawSection {
  kind?: string | null;
  extras?: { html?: string | null } | null;
}

interface RawMseMarketAnalysisDashboard {
  sections?: RawSection[] | null;
}

/** 시장 분석 대시보드 조회 (GET /api/v1/mse-market-analysis/market) */
export async function fetchMseMarketAnalysisDashboard(
  query?: MseMarketAnalysisQuery
): Promise<MseMarketAnalysisDashboard> {
  const params = new URLSearchParams();
  if (query?.indexCode) params.set("index_code", query.indexCode);
  if (query?.period !== undefined) params.set("period", String(query.period));
  const search = params.toString();
  const path = search
    ? `/api/v1/mse-market-analysis/market?${search}`
    : "/api/v1/mse-market-analysis/market";

  const data = await httpClient<RawMseMarketAnalysisDashboard>(path);

  const fullDoc = (data.sections ?? []).find(
    (section) => section?.kind === "full_html_document"
  );
  const fullHtml = fullDoc?.extras?.html ?? null;

  return { fullHtml };
}
