"use client";

import Link from "next/link";
import { useMseMarketAnalysisDashboard } from "@/features/mse-market-analysis/application/hooks/useMseMarketAnalysisDashboard";
import { mseMarketAnalysisDashboardStyles as s } from "@/features/mse-market-analysis/ui/components/mseMarketAnalysisDashboardStyles";
import { wrapDashboardHtml } from "@/features/study-room/ui/components/dashboardEmbed";

export default function MseMarketAnalysisDashboard() {
  const { mseMarketAnalysisState } = useMseMarketAnalysisDashboard();

  if (mseMarketAnalysisState.status === "LOADING") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.loading}>시장 분석 대시보드를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (mseMarketAnalysisState.status === "UNAUTHENTICATED") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.unauthenticated}>
          시장 분석 대시보드는 로그인 후 이용할 수 있습니다.
        </p>
        <Link href="/login" className={s.status.loginLink}>
          로그인하러 가기
        </Link>
      </div>
    );
  }

  if (mseMarketAnalysisState.status === "ERROR") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.error}>{mseMarketAnalysisState.message}</p>
      </div>
    );
  }

  const { fullHtml } = mseMarketAnalysisState.dashboard;

  if (!fullHtml) {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.empty}>표시할 대시보드가 없습니다.</p>
      </div>
    );
  }

  return (
    <iframe
      title="시장 분석 대시보드"
      srcDoc={wrapDashboardHtml(fullHtml)}
      className={s.iframe}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
