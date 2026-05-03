"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { mseCreditAtom } from "@/features/mse-credit/application/atoms/mseCreditAtom";
import { mseCreditCommand } from "@/features/mse-credit/application/commands/mseCreditCommand";
import { authAtom } from "@/features/auth/application/atoms/authAtom";

export function useMseCreditDashboard() {
  const [mseCreditState, setMseCreditState] = useAtom(mseCreditAtom);
  const [authState] = useAtom(authAtom);

  useEffect(() => {
    if (authState.status === "LOADING") return;
    if (authState.status !== "AUTHENTICATED") {
      setMseCreditState({ status: "UNAUTHENTICATED" });
      return;
    }

    let cancelled = false;
    setMseCreditState({ status: "LOADING" });

    mseCreditCommand
      .FETCH_MSE_CREDIT_DASHBOARD({ type: "FETCH_MSE_CREDIT_DASHBOARD" })
      .then((dashboard) => {
        if (cancelled) return;
        setMseCreditState({ status: "SUCCESS", dashboard });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof Error && error.message.includes("401")
            ? "로그인이 필요합니다."
            : "신용 스프레드 분석 대시보드를 불러오는데 실패했습니다.";
        setMseCreditState({ status: "ERROR", message });
      });

    return () => {
      cancelled = true;
    };
  }, [authState.status, setMseCreditState]);

  return { mseCreditState };
}
