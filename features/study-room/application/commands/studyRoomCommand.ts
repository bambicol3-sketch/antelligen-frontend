import type { StudyRoomIntent } from "@/features/study-room/domain/intent/studyRoomIntent";
import { fetchStudyRoomDashboard } from "@/features/study-room/infrastructure/api/studyRoomApi";

export const studyRoomCommand = {
  FETCH_STUDY_ROOM_DASHBOARD: (
    _intent: Extract<StudyRoomIntent, { type: "FETCH_STUDY_ROOM_DASHBOARD" }>
  ) => fetchStudyRoomDashboard(),
} as const;
