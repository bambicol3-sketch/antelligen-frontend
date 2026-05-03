"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { studyRoomAtom } from "@/features/study-room/application/atoms/studyRoomAtom";
import { studyRoomCommand } from "@/features/study-room/application/commands/studyRoomCommand";
import { authAtom } from "@/features/auth/application/atoms/authAtom";

export function useStudyRoomDashboard() {
  const [studyRoomState, setStudyRoomState] = useAtom(studyRoomAtom);
  const [authState] = useAtom(authAtom);

  useEffect(() => {
    if (authState.status === "LOADING") return;
    if (authState.status !== "AUTHENTICATED") {
      setStudyRoomState({ status: "UNAUTHENTICATED" });
      return;
    }

    let cancelled = false;
    setStudyRoomState({ status: "LOADING" });

    studyRoomCommand
      .FETCH_STUDY_ROOM_DASHBOARD({ type: "FETCH_STUDY_ROOM_DASHBOARD" })
      .then((dashboard) => {
        if (cancelled) return;
        setStudyRoomState({ status: "SUCCESS", dashboard });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof Error && error.message.includes("401")
            ? "로그인이 필요합니다."
            : "주식 공부방 대시보드를 불러오는데 실패했습니다.";
        setStudyRoomState({ status: "ERROR", message });
      });

    return () => {
      cancelled = true;
    };
  }, [authState.status, setStudyRoomState]);

  return { studyRoomState };
}
