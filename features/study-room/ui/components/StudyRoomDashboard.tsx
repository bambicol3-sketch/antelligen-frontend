"use client";

import Link from "next/link";
import { useStudyRoomDashboard } from "@/features/study-room/application/hooks/useStudyRoomDashboard";
import { studyRoomDashboardStyles as s } from "@/features/study-room/ui/components/studyRoomDashboardStyles";
import { wrapDashboardHtml } from "@/features/study-room/ui/components/dashboardEmbed";

export default function StudyRoomDashboard() {
  const { studyRoomState } = useStudyRoomDashboard();

  if (studyRoomState.status === "LOADING") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.loading}>주식 공부방 대시보드를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (studyRoomState.status === "UNAUTHENTICATED") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.unauthenticated}>
          나딱구 공부방은 로그인 후 이용할 수 있습니다.
        </p>
        <Link href="/login" className={s.status.loginLink}>
          로그인하러 가기
        </Link>
      </div>
    );
  }

  if (studyRoomState.status === "ERROR") {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.error}>{studyRoomState.message}</p>
      </div>
    );
  }

  const { fullHtml } = studyRoomState.dashboard;

  if (!fullHtml) {
    return (
      <div className={s.status.wrap}>
        <p className={s.status.empty}>표시할 대시보드가 없습니다.</p>
      </div>
    );
  }

  return (
    <iframe
      title="주식 공부방 대시보드"
      srcDoc={wrapDashboardHtml(fullHtml)}
      className={s.iframe}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
