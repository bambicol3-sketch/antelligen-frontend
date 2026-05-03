import { httpClient } from "@/infrastructure/http/httpClient";
import type { StudyRoomDashboard } from "@/features/study-room/domain/model/studyRoom";

interface RawSection {
  kind?: string | null;
  extras?: { html?: string | null } | null;
}

interface RawStudyRoomDashboard {
  sections?: RawSection[] | null;
}

/** 주식 공부방 대시보드 조회 (GET /api/v1/study-room/dashboard) */
export async function fetchStudyRoomDashboard(): Promise<StudyRoomDashboard> {
  const data = await httpClient<RawStudyRoomDashboard>(
    "/api/v1/study-room/dashboard"
  );

  const fullDoc = (data.sections ?? []).find(
    (section) => section?.kind === "full_html_document"
  );
  const fullHtml = fullDoc?.extras?.html ?? null;

  return { fullHtml };
}
