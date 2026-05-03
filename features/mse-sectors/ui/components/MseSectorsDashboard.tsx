"use client";

import Link from "next/link";
import { useMseSectorsDashboard } from "@/features/mse-sectors/application/hooks/useMseSectorsDashboard";
import { mseSectorsDashboardStyles as s } from "@/features/mse-sectors/ui/components/mseSectorsDashboardStyles";
import { wrapDashboardHtml } from "@/features/study-room/ui/components/dashboardEmbed";

export default function MseSectorsDashboard() {
  const { mseSectorsState } = useMseSectorsDashboard();

  if (mseSectorsState.status === "LOADING") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.loading}>산업군 분석 대시보드를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (mseSectorsState.status === "UNAUTHENTICATED") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.unauthenticated}>
          산업군 분석 대시보드는 로그인 후 이용할 수 있습니다.
        </p>
        <Link href="/login" className={s.status.loginLink}>
          로그인하러 가기
        </Link>
      </div>
    );
  }

  if (mseSectorsState.status === "ERROR") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.error}>{mseSectorsState.message}</p>
      </div>
    );
  }

  const { fullHtml } = mseSectorsState.dashboard;

  if (!fullHtml) {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.empty}>표시할 대시보드가 없습니다.</p>
      </div>
    );
  }

  return (
    <iframe
      title="산업군 분석 대시보드"
      srcDoc={wrapDashboardHtml(fullHtml)}
      className={s.iframe}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
