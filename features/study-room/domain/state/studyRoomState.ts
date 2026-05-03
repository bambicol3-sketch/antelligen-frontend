import type { StudyRoomDashboard } from "@/features/study-room/domain/model/studyRoom";

export type StudyRoomState =
  | { status: "LOADING" }
  | { status: "UNAUTHENTICATED" }
  | { status: "ERROR"; message: string }
  | { status: "SUCCESS"; dashboard: StudyRoomDashboard };
