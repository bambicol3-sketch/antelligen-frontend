"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { mseSectorsAtom } from "@/features/mse-sectors/application/atoms/mseSectorsAtom";
import { mseSectorsCommand } from "@/features/mse-sectors/application/commands/mseSectorsCommand";
import { authAtom } from "@/features/auth/application/atoms/authAtom";

export function useMseSectorsDashboard() {
  const [mseSectorsState, setMseSectorsState] = useAtom(mseSectorsAtom);
  const [authState] = useAtom(authAtom);

  useEffect(() => {
    if (authState.status === "LOADING") return;
    if (authState.status !== "AUTHENTICATED") {
      setMseSectorsState({ status: "UNAUTHENTICATED" });
      return;
    }

    let cancelled = false;
    setMseSectorsState({ status: "LOADING" });

    mseSectorsCommand
      .FETCH_MSE_SECTORS_DASHBOARD({ type: "FETCH_MSE_SECTORS_DASHBOARD" })
      .then((dashboard) => {
        if (cancelled) return;
        setMseSectorsState({ status: "SUCCESS", dashboard });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof Error && error.message.includes("401")
            ? "로그인이 필요합니다."
            : "산업군 분석 대시보드를 불러오는데 실패했습니다.";
        setMseSectorsState({ status: "ERROR", message });
      });

    return () => {
      cancelled = true;
    };
  }, [authState.status, setMseSectorsState]);

  return { mseSectorsState };
}
