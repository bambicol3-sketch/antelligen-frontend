"use client";

import Link from "next/link";
import { useMseCreditDashboard } from "@/features/mse-credit/application/hooks/useMseCreditDashboard";
import { mseCreditDashboardStyles as s } from "@/features/mse-credit/ui/components/mseCreditDashboardStyles";
import { wrapDashboardHtml } from "@/features/study-room/ui/components/dashboardEmbed";

export default function MseCreditDashboard() {
  const { mseCreditState } = useMseCreditDashboard();

  if (mseCreditState.status === "LOADING") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.loading}>신용 스프레드 분석 대시보드를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (mseCreditState.status === "UNAUTHENTICATED") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.unauthenticated}>
          신용 스프레드 분석 대시보드는 로그인 후 이용할 수 있습니다.
        </p>
        <Link href="/login" className={s.status.loginLink}>
          로그인하러 가기
        </Link>
      </div>
    );
  }

  if (mseCreditState.status === "ERROR") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.error}>{mseCreditState.message}</p>
      </div>
    );
  }

  const { fullHtml } = mseCreditState.dashboard;

  if (!fullHtml) {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.empty}>표시할 대시보드가 없습니다.</p>
      </div>
    );
  }

  return (
    <iframe
      title="신용 스프레드 분석 대시보드"
      srcDoc={wrapDashboardHtml(fullHtml)}
      className={s.iframe}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
